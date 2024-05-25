import React, { useState } from 'react';
import img1 from './assets/goni.png';
import img2 from './assets/hanggi.png';
import img3 from './assets/onsaemiro.png';
import img4 from './assets/marummo.png';
import img5 from './assets/sagoonja.png';

const SideMenu = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // 예시 데이터
  const examplePlaces = [
    { id: 1, name: '고니 식탁', address: '대구 북구 산격로6길 29', imageUrl: img1 },
    { id: 2, name: '한끼갈비', address: '대구 북구 대학로17길 7-1', imageUrl: img2 },
    { id: 3, name: '온새미로', address: '대구 북구 대동로6길 39 2층', imageUrl: img3 },
    { id: 4, name: '마름모식당', address: '대구 북구 대동로6길 40 2층', imageUrl: img4},
    { id: 5, name: '사군자 민속촌', address: '대구 북구 대학로13길 3-35', imageUrl: img5 },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    //검색어 비어있을 때 모든 결과 표시
    if (searchQuery.trim() === '') {
      setSearchResults(examplePlaces);
    } else {
      // 검색어에 따라 필터링된 결과를 설정 
      const results = examplePlaces.filter(place =>
        place.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(results);
    }
  };

  return (
    <div style={styles.sideMenu}>
      <form onSubmit={handleSearch} style={styles.searchForm}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="검색 결과를 입력하세요"
          style={styles.searchInput}
        />
        <button type="submit" style={styles.searchButton}>Search</button>
      </form>
      <div style={styles.resultsContainer}>
        {searchResults.length > 0 ? (
          searchResults.map(place => (
            <div key={place.id} style={styles.resultItem}>
              <img src={place.imageUrl} alt={place.name} style={styles.resultImage} />
              <div style={styles.resultText}>
              <h3>{place.name}</h3>
              <p>{place.address}</p>
              </div>
            </div>
          ))
        ) : (
          <p>검색 결과를 찾을 수 없습니다.</p>
        )}
      </div>
    </div>
  );
};

const styles = {
  sideMenu: {
    width: '350px',
    backgroundColor: '#f8f8f8',
    padding: '20px',
    borderRight: '1px solid #ddd',
  },
  searchForm: {
    marginBottom: '20px',
  },
  searchInput: {
    width: '100%',
    padding: '8px',
    marginBottom: '10px',
    border: '1px solid #ccc',
    borderRadius: '15px',
  },
  searchButton: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#102766',
    color: '#fff',
    border: 'none',
    borderRadius: '15px',
    cursor: 'pointer',
  },
  resultsContainer: {
    marginTop: '20px',
  },
  resultItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
    borderBottom: '1px solid #ddd',
  },
  resultImage: {
    width: '50px',
    height: '50px',
    marginRight: '10px',
    borderRadius: '6px',
  },
  resultText: {
    display: 'flex',
    flexDirection: 'column',
  },
};

export default SideMenu;
