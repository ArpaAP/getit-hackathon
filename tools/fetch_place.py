import requests
import numpy as np
from tqdm import tqdm
import json

# 북문
# lat, lng = 35.89272786773966, 128.60864435780732

# 쪽문
# lat, lng = 35.885409654045255, 128.61174085941136

# 다이마루 근처
# lat, lng = 35.8848801813241, 128.6098974666387

# 북문에서 좀더 서쪽
lat, lng = 35.892643331673945, 128.60688179034688

KAKAO_REST_API_KEY = '2ac47cf061415027efdb36cc69754065'

docs = []

km_lat = 1 / 110
km_lng = 1 / 88.74

lat_arr = np.arange(lat - km_lat / 2, lat + km_lat / 2, km_lat / 50)
print(lat_arr)
lng_arr = np.arange(lng - km_lng / 2, lng + km_lng / 2, km_lng / 50)
print(lng_arr)

count = 0

with tqdm(total=len(lat_arr) * len(lng_arr), desc='식당 데이터 수집') as pbar:
    for lat in lat_arr:
        for dlng in lng_arr:
            page = 1

            while True:
                params = {
                    'category_group_code': 'FD6',
                    'size': 15,
                    'page': page,
                    'x': lng,
                    'y': lat,
                    'radius': 20000,
                    'sort': 'distance',
                }


                headers = {
                    'Authorization': f'KakaoAK {KAKAO_REST_API_KEY}'
                }

                res = requests.get('https://dapi.kakao.com/v2/local/search/category.json', params=params, headers=headers)
                r = res.json()

                if r['meta']['is_end']:
                    break

                page += 1

                ids = [doc['id'] for doc in docs]

                for doc in r['documents']:
                    if doc['id'] not in ids:
                        docs.append(doc)
                        count += 1
                        print(count, doc['place_name'])


            pbar.update(1)

print('final count:', len(docs))


with open('buk-seo.json', 'w') as f:
    json.dump(docs, f, ensure_ascii=False, indent=4)