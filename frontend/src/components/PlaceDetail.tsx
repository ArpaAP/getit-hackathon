import { useState } from 'react'
import { LocalKeywordResponse } from '../types/kakaoapi'
import image from '../assets/hanggi.png'
import menu1 from '../assets/hanggi_1.jpeg'
import menu2 from '../assets/hanggi_2.jpeg'
import {
  TbBuildingStore,
  TbChevronLeft,
  TbClock,
  TbMapPin,
  TbPhone,
  TbSocial,
} from 'react-icons/tb'

interface PlaceDetailProps {
  place: Omit<LocalKeywordResponse['documents'][0], 'distance'>
  onClose: () => void
}

export default function PlaceDetail({ place, onClose }: PlaceDetailProps) {
  return (
    <div className="absolute rounded-r-2xl border-gray-200 border-r z-[99999] left-0 inset-y-0 w-1/4 bg-white/50 backdrop-blur-lg">
      <div className="overflow-y-auto h-full">
        <img src={image} className="w-full h-40 object-cover rounded-tr-2xl" />
        <div className="px-3 py-4 relative">
          <div className="text-2xl text-center font-semibold">
            {place.place_name}
          </div>
          <div className="text-sm text-center font-light">
            {place.category_name.split(' > ')[1]}
          </div>
          <hr className="my-4" />

          <div className="rounded-xl flex flex-col bg-white/80 border gap-4 border-gray-200 px-4 py-3 mb-3">
            <div className="flex gap-2 text-sm items-center">
              <TbMapPin className="text-lg" />
              <span>{place.road_address_name}</span>
            </div>
            {place.phone && (
              <div className="flex gap-2 text-sm items-center">
                <TbPhone className="text-lg" />
                <span>{place.phone}</span>
              </div>
            )}
            <div className="flex gap-2 text-sm items-center">
              <TbClock className="text-lg" />
              <span>영업 중 | 매일 11:00~21:00</span>
            </div>
            <div className="flex gap-2 text-sm items-center">
              <TbBuildingStore className="text-lg" />
              <span>Wi-Fi, 포장, 배달</span>
            </div>
          </div>

          <div className="rounded-xl flex flex-col bg-white/80 border gap-4 border-gray-200 px-4 py-3 mb-3">
            <div className="flex gap-2 text-sm items-center">
              <TbClock className="text-lg" />
              <span>혼잡, 웨이팅 있음</span>
              <div className="text-xs text-gray-500">11:48 기준</div>
            </div>
          </div>

          <div className="font-semibold px-1 pt-1 pb-1">메뉴</div>

          <div className="grid grid-cols-2 gap-2 px-2 pb-2">
            <div className="col-span-1">
              <img src={menu1} className="rounded-xl pb-1" />
              <div className="text-sm">치즈갈비찜</div>
            </div>
            <div className="col-span-1">
              <img src={menu2} className="rounded-xl pb-1" />
              <div className="text-sm">묵은지갈비찜</div>
            </div>
          </div>

          <button
            type="button"
            className="px-3 py-1 text-sm border border-gray-200 bg-white/50 hover:bg-white transition-all duration-200 rounded-xl w-full"
          >
            더보기
          </button>

          <div className="font-semibold px-1 pt-3 pb-1">리뷰</div>

          <div className="rounded-xl flex flex-col bg-white/80 border gap-0.5 border-gray-200 px-4 py-3 mb-3">
            <div className="flex justify-between items-end">
              <div className="text-sm font-semibold">테스트 리뷰</div>
              <div className="text-xs font-light text-gray-500">
                지나가던경대생 | 3일 전
              </div>
            </div>
            <hr className="my-1.5" />
            <div className="text-sm">테스트 리뷰입니다.</div>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={onClose}
        className="absolute z-[99999] left-full top-1/2 py-4 px-0.5 flex items-center bg-white/75 backdrop-blur-lg border-r border-y border-gray-300 rounded-r-lg"
      >
        <TbChevronLeft className="text-xl" />
      </button>
    </div>
  )
}
