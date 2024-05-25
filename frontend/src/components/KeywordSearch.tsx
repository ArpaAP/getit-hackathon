import { useState } from 'react'
import { LocalKeywordResponse } from '../types/kakaoapi'
import { TbChevronLeft } from 'react-icons/tb'
import classNames from 'classnames'

interface KeywordSearchProps {
  places: Omit<LocalKeywordResponse['documents'], 'distance'>
  docs: LocalKeywordResponse['documents']
  onSelectedItem: (doc: LocalKeywordResponse['documents'][0]) => void
}

export default function KeywordSearch({
  places,
  docs,
  onSelectedItem,
}: KeywordSearchProps) {
  const [showKeywords, setShowKeywords] = useState(true)
  const [keywords, setKeywords] = useState<string[]>([])
  const [showSort, setShowSort] = useState(true)
  const [sortMode, setSortMode] = useState<
    'accuracy' | 'distance' | 'congestion'
  >('accuracy')
  const [search, setSearch] = useState('')

  let filtered = search
    ? places.filter((place) => place.place_name.includes(search))
    : docs

  if (keywords.length > 0) {
    filtered = filtered.filter((place) =>
      keywords.includes(place.category_name.split(' > ')[1]),
    )
  }

  return (
    <div className="p-3 flex flex-col w-full">
      <input
        type="text"
        className="rounded-lg border border-gray-200 px-3 py-2 w-full"
        placeholder="이름 또는 키워드 검색"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <hr className="my-2 w-full" />

      <button
        type="button"
        onClick={() => setShowKeywords(!showKeywords)}
        className="flex w-full items-center justify-between rounded-lg px-1 py-1 mb-2 hover:bg-gray-100 transition-all duration-200 outline-none"
      >
        <div className="font-semibold">키워드</div>
        <div className="flex items-center justify-center">
          <TbChevronLeft
            className={classNames(
              'text-xl transition-all duration-200',
              showKeywords && '-rotate-90',
            )}
          />
        </div>
      </button>

      {showKeywords && (
        <>
          <div className="flex gap-1.5 flex-wrap px-1">
            {[
              '한식',
              '양식',
              '일식',
              '중식',
              '분식',
              '술집',
              '패스트푸드',
              '아시아음식',
              '도시락',
              '치킨',
              '카페',
              '베이커리',
            ].map((category) => {
              return (
                <button
                  key={category}
                  type="button"
                  className={classNames(
                    'text-sm bg-gray-100 rounded-lg px-2 py-0.5 transition-all duration-200',
                    keywords.includes(category) ? 'bg-indigo-100' : '',
                  )}
                  onClick={() => {
                    if (keywords.includes(category)) {
                      setKeywords(
                        keywords.filter((keyword) => keyword !== category),
                      )
                    } else {
                      setKeywords([...keywords, category])
                    }
                  }}
                >
                  {category}
                </button>
              )
            })}
          </div>

          <hr className="my-2" />

          <div className="flex gap-1.5 flex-wrap px-1">
            {['#웨이팅 없는'].map((category) => {
              return (
                <button
                  key={category}
                  type="button"
                  className="text-sm bg-gray-100 rounded-lg px-2 py-0.5"
                >
                  {category}
                </button>
              )
            })}
          </div>

          <hr className="my-2" />
        </>
      )}

      <button
        type="button"
        onClick={() => setShowSort(!showSort)}
        className="flex w-full items-center justify-between rounded-lg px-1 py-1 mb-2 hover:bg-gray-100 transition-all duration-200 outline-none"
      >
        <div className="font-semibold">정렬</div>
        <div className="flex items-center justify-center">
          <TbChevronLeft
            className={classNames(
              'text-xl transition-all duration-200',
              showSort && '-rotate-90',
            )}
          />
        </div>
      </button>

      {showSort && (
        <>
          <div className="flex gap-1.5 flex-wrap px-1">
            {[
              ['accuracy', '정확도순'],
              ['distance', '거리순'],
              ['congestion', '혼잡도순'],
            ].map(([category, categoryName]) => {
              return (
                <button
                  key={category}
                  type="button"
                  className={classNames(
                    'text-sm bg-gray-100 rounded-lg px-2 py-0.5 transition-all duration-200',
                    sortMode === category && 'bg-indigo-100',
                  )}
                  onClick={() => setSortMode(category as any)}
                >
                  {categoryName}
                </button>
              )
            })}
          </div>

          <hr className="my-2" />
        </>
      )}

      <div className="flex flex-col gap-2 h-full overflow-y-scroll">
        {filtered.map((doc) => {
          return (
            <button
              type="button"
              key={doc.id}
              className="text-left bg-white border border-gray-200 rounded-lg px-4 py-3"
              onClick={() => {
                window.map.setCenter(new window.kakao.maps.LatLng(doc.y, doc.x))
                onSelectedItem(doc)
              }}
            >
              <div className="text-lg font-semibold">{doc.place_name}</div>
              <div className="text-sm font-light">
                {doc.category_name.split(' > ')[1]} | {doc.road_address_name}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
