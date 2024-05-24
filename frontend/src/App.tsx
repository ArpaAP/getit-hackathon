import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import axios from 'axios'
import urlJoin from 'url-join'
import { renderToStaticMarkup } from 'react-dom/server'
import { LocalKeywordResponse } from './types/kakaoapi'

declare global {
  interface Window {
    kakao: any
  }
}

function App() {
  const [docs, setDocs] = useState<LocalKeywordResponse['documents']>([])
  const [sort, setSort] = useState<'accuracy' | 'distance'>('accuracy')

  useEffect(() => {
    const { kakao } = window
    kakao.maps.load(async () => {
      /*
       * 맵 생성
       */
      let container = document.getElementById('map')

      const [lat, lng] = [35.89281942062694, 128.60887323950442]

      let options = {
        center: new kakao.maps.LatLng(lat, lng),
        level: 13,
      }

      let map = new kakao.maps.Map(container, options)

      let zoomControl = new kakao.maps.ZoomControl()

      // 지도 오른쪽에 줌 컨트롤이 표시되도록 지도에 컨트롤을 추가한다.
      map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT)

      let infowindow = new kakao.maps.InfoWindow({ zIndex: 1 })

      /*
       * 로컬 검색 가져오기
       */

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

      var bounds = new kakao.maps.LatLngBounds()

      documents = documents.filter((one) =>
        one.category_name.includes('음식점'),
      )
      setDocs(documents)

      documents.forEach((doc) => {
        let { place_name, x, y } = doc
        let marker = new kakao.maps.Marker({
          map: map,
          position: new kakao.maps.LatLng(y, x),
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

        bounds.extend(new kakao.maps.LatLng(y, x))
      })

      map.setBounds(bounds)

      console.log(docs)
    })
  }, [])

  return (
    <>
      <Navbar />

      <div
        className="grid grid-cols-12 grow"
        style={{ height: 'calc(100vh - 57px)' }}
      >
        <div className="col-span-3 flex">
          <div className="flex flex-col w-18 text-sm tracking-tighter">
            <button type="button" className="bg-indigo-100 aspect-square">
              키워드 검색
            </button>
            <button type="button">장소 검색</button>
            <button type="button">길찾기</button>
          </div>

          <div></div>
        </div>
        <div className="col-span-9 h-full">
          <div id="map" className="w-full h-full" />
        </div>
      </div>
    </>
  )
}

export default App
