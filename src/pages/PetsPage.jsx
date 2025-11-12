import { useRef, useState } from 'react';
import { Mars, Plus, Venus } from 'lucide-react';
import { DOGS } from '../data/dogs';
import RegisterPet from '../components/features/pets/RegisterPet';

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
  const [showRegisterPage, setShowRegisterPage] = useState(false);

  const handleDetailView = (dogId) => {
    console.log(`강아지 상세보기: ${dogId}`);
  };

  const handleRegister = (formData) => {
    console.log('등록할 데이터:', formData);
    // 여기에 실제 등록 로직 추가
    setShowRegisterPage(false);
  };

  // 등록 페이지가 열려있으면 등록 페이지만 표시
  if (showRegisterPage) {
    return (
      <RegisterPet
        onBack={() => setShowRegisterPage(false)}
        onRegister={handleRegister}
      />
    );
  }

  return (
    <div
      className="min-h-screen pt-24 pb-32 relative"
      style={{
        background: 'linear-gradient(to bottom, #fef3c7, #fed7aa, #fef3c7)',
      }}
    >
      {/* 추가 버튼 */}
      <button
        onClick={() => setShowRegisterPage(true)}
        className="fixed bottom-26 right-5 bg-amber-100 text-amber-900 rounded-3xl font-bold shadow-lg transform hover:scale-105 transition-all z-50 p-3"
        style={{
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
        }}
      >
        <Plus className="w-6 h-6" />
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
              onClick={() => setShowRegisterPage(true)}
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
    </div>
  );
}
