import { useEffect, useRef, useState } from 'react'
import Navbar from './components/Navbar'
import axios from 'axios'
import urlJoin from 'url-join'
import { renderToStaticMarkup } from 'react-dom/server'
import { LocalKeywordResponse } from './types/kakaoapi'
import {
  TbCategory,
  TbNavigation,
  TbSearch,
  TbTrendingUp,
} from 'react-icons/tb'
import KeywordSearch from './components/KeywordSearch'
import PlaceDetail from './components/PlaceDetail'

declare global {
  interface Window {
    kakao: any
    map: any
  }
}

function App() {
  const [docs, setDocs] = useState<LocalKeywordResponse['documents']>([])
  const [sort, setSort] = useState<'accuracy' | 'distance'>('accuracy')
  const [coords, setCoords] = useState<{ latitude: number; longitude: number }>(
    {
      latitude: 35.89285530802014,
      longitude: 128.6089284746753,
    },
  )
  const markers = useRef<any[]>([])
  const [places, setPlaces] = useState<
    Omit<LocalKeywordResponse['documents'], 'distance'>
  >([])
  const [selectedPlace, setSelectedPlace] = useState<
    LocalKeywordResponse['documents'] | null
  >(null)

  useEffect(() => {
    const { kakao } = window

    kakao.maps.load(async () => {
      let places = []

      try {
        let r = await axios.get(
          urlJoin(import.meta.env.VITE_BACKEND_URL, '/places'),
        )
        setPlaces(r.data)
        places = r.data
      } catch (e) {
        console.error(e)
      }

      /*
       * 맵 생성
       */
      let container = document.getElementById('map')

      const { latitude: lat, longitude: lng } = coords

      let options = {
        center: new kakao.maps.LatLng(lat, lng),
        level: 14,
      }

      let map = new kakao.maps.Map(container, options)
      window.map = map

      let zoomControl = new kakao.maps.ZoomControl()

      // 지도 오른쪽에 줌 컨트롤이 표시되도록 지도에 컨트롤을 추가한다.
      map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT)

      let infowindow = new kakao.maps.InfoWindow({ zIndex: 1 })

      /*
       * 로컬 검색 가져오기
       */

      const fetchLocal = async (lat: number, lng: number) => {
        let documents: LocalKeywordResponse['documents'] = []
        let page = 1

        while (true) {
          const params = {
            category_group_code: 'FD6',
            size: 15,
            page,
            x: lng,
            y: lat,
            radius: 2000,
            sort: 'distance',
          }

          const r = await axios.get(
            urlJoin(import.meta.env.VITE_BACKEND_URL, '/kakao/categorySearch'),
            { params: params },
          )

          let { documents: doc, meta } = r.data

          console.log(r.data)

          documents.push(...doc)

          if (meta.is_end) break

          page++
        }

        console.log(documents)

        documents = documents.filter((one) =>
          one.category_name.includes('음식점'),
        )

        return documents
      }

      const displayMarker = (places: LocalKeywordResponse['documents']) => {
        // clear markers
        markers.current.forEach((marker) => marker.setMap(null))

        // var bounds = new kakao.maps.LatLngBounds()

        places.forEach((doc) => {
          let { place_name, x, y } = doc
          let marker = new kakao.maps.Marker({
            map: map,
            position: new kakao.maps.LatLng(y, x),
            opacity: 0.8,
          })

          let radius = Math.max(0, Math.round(Math.random() * 15) - 5)
          let color

          if (radius < 5) color = '#00FF00'
          else if (radius < 10) color = '#FFA500'
          else color = '#FF0000'

          var circle = new kakao.maps.Circle({
            map: map,
            center: new kakao.maps.LatLng(y, x),
            radius: radius,
            strokeWeight: 2,
            strokeColor: color,
            strokeOpacity: 0.8,
            strokeStyle: 'dashed',
            fillColor: color,
            fillOpacity: 0.3,
          })

          kakao.maps.event.addListener(marker, 'mouseover', () => {
            infowindow.setContent(
              renderToStaticMarkup(
                <div className="p-2 text-base">{place_name}</div>,
              ),
            )
            infowindow.open(map, marker)
          })

          kakao.maps.event.addListener(marker, 'mouseout', () => {
            infowindow.close()
          })

          kakao.maps.event.addListener(marker, 'click', () => {
            setSelectedPlace(doc as any)
          })

          markers.current.push(marker)
          markers.current.push(circle)

          // bounds.extend(new kakao.maps.LatLng(y, x))
        })

        map.setLevel(2)

        // map.setBounds(bounds)
      }

      kakao.maps.event.addListener(map, 'dragend', async () => {
        const lat = map.getCenter().getLat()
        const lng = map.getCenter().getLng()
        let docs = await fetchLocal(lat, lng)
        setDocs(docs)
        setCoords({
          latitude: lat,
          longitude: lng,
        })
        console.log(`lat: ${lat}, lng: ${lng}`)
      })

      fetchLocal(lat, lng).then(console.log)
      displayMarker(places)
    })
  }, [])

  return (
    <>
      <Navbar />

      <div
        className="grid grid-cols-12 grow"
        style={{ height: 'calc(100vh - 57px)' }}
      >
        <div
          className="col-span-3 flex border-r bg-gray-100/50 border-gray-200"
          style={{ height: 'calc(100vh - 57px)' }}
        >
          <div className="shrink-0 flex flex-col w-14 text-sm tracking-tighter border-r border-gray-200">
            <button
              type="button"
              className="bg-indigo-100 aspect-square border-b border-gray-200 flex flex-col items-center justify-center p-1"
            >
              <TbSearch className="text-xl" />
              검색
            </button>
            <button
              type="button"
              className="aspect-square border-b border-gray-200 flex flex-col items-center justify-center p-1"
            >
              <TbTrendingUp className="text-xl" />
              트렌딩
            </button>
            <button
              type="button"
              className="aspect-square border-b border-gray-200 flex flex-col items-center justify-center p-1"
            >
              <TbNavigation className="text-xl" />
              길찾기
            </button>
          </div>

          <div className="flex w-full h-full">
            <KeywordSearch
              places={places}
              docs={docs}
              onSelectedItem={(doc) => {
                setSelectedPlace(doc as any)

                console.log(selectedPlace)
              }}
            />
          </div>
        </div>
        <div className="col-span-9 h-full relative">
          <div id="map" className="w-full h-full" />

          {selectedPlace && (
            <PlaceDetail
              place={selectedPlace}
              onClose={() => {
                setSelectedPlace(null)
              }}
            />
          )}
        </div>
      </div>
    </>
  )
}

export default App
