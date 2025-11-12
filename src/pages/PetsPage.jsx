import { useRef, useState } from 'react';
import { Mars, Plus, Venus, X } from 'lucide-react';
import { DOGS } from '../data/dogs';

// 폴라로이드 카드 컴포넌트
const PolaroidDogCard = ({ dog, index, onDetailView }) => {
  // 각 카드마다 고유한 랜덤 각도 (컴포넌트 생성 시 한 번만)
  const randomRotation = useRef(Math.random() * 6 - 3).current;
  const randomOffset = useRef(Math.random() * 20 - 10).current;

  return (
    <div
      className="relative mx-auto"
      style={{
        maxWidth: '240px',
        transform: `translateX(${randomOffset}px)`,
      }}
    >
      {/* 종이 테이프 효과 */}
      <div
        className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10"
        style={{
          width: '60px',
          height: '25px',
          background: 'rgba(255, 248, 220, 0.8)',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          backdropFilter: 'blur(2px)',
        }}
      >
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 2px,
              rgba(139, 69, 19, 0.1) 2px,
              rgba(139, 69, 19, 0.1) 4px
            )`,
          }}
        />
      </div>

      {/* 폴라로이드 카드 */}
      <div
        onClick={() => onDetailView(dog.id)}
        className="bg-white p-3 pb-4 rounded-sm cursor-pointer relative"
        style={{
          transform: `rotate(${randomRotation}deg)`,
          boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
        }}
      >
        {/* 사진 영역 */}
        <div className="relative w-full aspect-square bg-gray-100 mb-2 overflow-hidden">
          <img
            src={dog.imageUrl}
            alt={dog.name}
            className="w-full h-full object-cover"
            style={{
              filter: 'contrast(0.95) brightness(0.98) saturate(0.9)',
            }}
          />
          {/* 빈티지 색감 오버레이 */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(to bottom, rgba(255,243,224,0.1), rgba(139,69,19,0.05))',
            }}
          />
        </div>

        {/* 손글씨 느낌의 정보 영역 */}
        <div className="text-center space-y-1">
          <h2
            className="text-4xl font-bold text-gray-800 mb-2"
            style={{
              fontFamily: '"Nanum Pen Script", cursive',
              letterSpacing: '1px',
            }}
          >
            {dog.name}
          </h2>

          <div
            className="flex justify-center items-center gap-1 text-base text-gray-600"
            style={{
              fontFamily: '"Nanum Pen Script", cursive',
              fontSize: '1.2rem',
            }}
          >
            <span>{dog.breed}</span>
            {dog.gender === 'female' ? (
              <Venus className="w-4 h-4 text-pink-500" />
            ) : (
              <Mars className="w-4 h-4 text-blue-500" />
            )}
          </div>

          <p
            className="text-sm text-gray-500 mt-1"
            style={{
              fontFamily: '"Nanum Pen Script", cursive',
              fontSize: '1.05rem',
            }}
          >
            {dog.birthday}
          </p>
        </div>

        {/* 빈티지 모서리 효과 */}
        <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-gray-300 opacity-30" />
        <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-gray-300 opacity-30" />
        <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-gray-300 opacity-30" />
        <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-gray-300 opacity-30" />
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Nanum+Pen+Script&display=swap');
      `}</style>
    </div>
  );
};

export default function PetsPage() {
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const handleDetailView = (dogId) => {
    console.log(`강아지 상세보기: ${dogId}`);
  };

  return (
    <div
      className="min-h-screen pt-24 pb-32 relative"
      style={{
        background: 'linear-gradient(to bottom, #fef3c7, #fed7aa, #fef3c7)',
      }}
    >
      {/* 배경 패턴 (빈티지 느낌) */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 35px,
            rgba(139, 69, 19, 0.1) 35px,
            rgba(139, 69, 19, 0.1) 70px
          )`,
        }}
      />

      {/* 빈티지 스타일 추가 버튼 */}
      <button
        onClick={() => setShowRegisterModal(true)}
        className="fixed bottom-24 right-4 bg-white border border-amber-900 text-amber-900 rounded-3xl font-bold shadow-lg transform hover:scale-105 transition-all z-50 p-3"
        style={{
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
        }}
      >
        <span className="text-sm">등록하기</span>
      </button>

      {/* Dog List - 폴라로이드 스타일 */}
      <div className="max-w-4xl mx-auto px-4">
        <div className="space-y-12 py-8">
          {DOGS.map((dog, index) => (
            <PolaroidDogCard
              key={dog.id}
              dog={dog}
              index={index}
              onDetailView={handleDetailView}
            />
          ))}
        </div>

        {/* Empty State */}
        {DOGS.length === 0 && (
          <div
            className="bg-white rounded-sm shadow-lg p-8 text-center max-w-md mx-auto"
            style={{
              transform: 'rotate(-1deg)',
              border: '3px solid #d4a574',
            }}
          >
            <div className="text-5xl mb-3">🐕</div>
            <h3 className="text-2xl font-bold text-amber-950 mb-3">
              등록된 반려견이 없습니다
            </h3>
            <p className="text-amber-700 text-sm mb-6">
              우리 강아지를 등록하고 건강을 관리해보세요
            </p>
            <button
              onClick={() => setShowRegisterModal(true)}
              className="px-8 py-3 bg-white text-amber-900 rounded-sm font-bold shadow-md transform hover:scale-105 transition-all inline-flex items-center gap-2"
              style={{
                border: '3px solid #78350f',
              }}
            >
              <Plus className="w-5 h-5" />첫 번째 반려견 등록하기
            </button>
          </div>
        )}
      </div>

      {/* Register Modal - 빈티지 스타일 */}
      {showRegisterModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-md w-full relative p-8">
            {/* 닫기 버튼 */}
            <button
              onClick={() => setShowRegisterModal(false)}
              className="absolute top-3 right-3 text-amber-900 hover:bg-amber-100 rounded-full p-1 transition-all"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-2xl font-bold text-amber-950 mb-6 text-center">
              반려견 등록
            </h2>

            {/* 등록 폼 */}
            <div className="space-y-4">
              <div>
                <label className="block text-amber-900 mb-2 text-sm font-medium">
                  이름
                </label>
                <input
                  type="text"
                  placeholder="우리 강아지 이름"
                  className="w-full px-4 py-2 border-2 border-amber-800 rounded-2xl focus:outline-none focus:border-amber-900 text-sm text-black"
                />
              </div>

              <div>
                <label className="block text-amber-900 mb-2 text-sm font-medium">
                  품종
                </label>
                <input
                  type="text"
                  placeholder="예: 푸들, 말티즈"
                  className="w-full px-4 py-2 border-2 border-amber-800 rounded-2xl focus:outline-none focus:border-amber-900 text-sm text-black"
                />
              </div>

              <div>
                <label className="block text-amber-900 mb-2 text-sm font-medium">
                  생일
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-2 border-2 border-amber-800 rounded-2xl focus:outline-none focus:border-amber-900 text-sm text-black"
                />
              </div>

              <div>
                <label className="block text-amber-900 mb-2 text-sm font-medium">
                  성별
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="gender"
                      value="남"
                      className="w-4 h-4"
                    />
                    <span className="text-sm text-amber-900">남</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="gender"
                      value="여"
                      className="w-4 h-4 bg-white"
                    />
                    <span className="text-sm text-amber-900">여</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-amber-900 mb-2 text-sm font-medium">
                  사진
                </label>
                <input
                  type="file"
                  accept="image/*"
                  className="w-full px-4 py-2 border-2 border-amber-800 rounded-sm focus:outline-none focus:border-amber-900 text-sm"
                />
              </div>
            </div>

            {/* 버튼들 */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowRegisterModal(false)}
                className="flex-1 px-6 py-2 bg-gray-200 text-amber-900 border-2 border-gray-400 rounded-4xl font-semibold shadow-md transition-all hover:bg-gray-300 text-sm"
              >
                취소
              </button>
              <button
                onClick={() => {
                  // 등록 로직
                  setShowRegisterModal(false);
                }}
                className="flex-1 px-6 py-2 bg-amber-800 text-white border-2 border-amber-900 rounded-4xl font-semibold shadow-md transition-all hover:bg-amber-900 text-sm"
              >
                등록하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
