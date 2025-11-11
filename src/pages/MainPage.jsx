import React, { useState, useEffect } from 'react';
import {
  Heart,
  Camera,
  Activity,
  Calendar,
  MessageCircle,
  ChevronRight,
  Plus,
  TrendingUp,
  Sparkles,
  User,
  Lightbulb,
  X,
} from 'lucide-react';

export default function MainPage() {
  // 여러 마리의 반려견 데이터
  const [dogs] = useState([
    {
      id: 1,
      name: '뭉치',
      breed: '골든 리트리버',
      age: '3살',
      weight: '28kg',
      image: '🐕',
      healthScore: 95,
      recentAnalyses: [
        {
          date: '2025.11.05',
          issue: '피부 발진',
          status: '관찰 중',
          severity: 'low',
        },
        {
          date: '2025.10.28',
          issue: '귀 염증 의심',
          status: '병원 방문 완료',
          severity: 'medium',
        },
        {
          date: '2025.10.15',
          issue: '정기 검진',
          status: '완료',
          severity: 'low',
        },
      ],
      weightHistory: [
        { month: '8월', weight: 26 },
        { month: '9월', weight: 27 },
        { month: '10월', weight: 27.5 },
        { month: '11월', weight: 28 },
      ],
    },
    {
      id: 2,
      name: '꼬미',
      breed: '포메라니안',
      age: '2살',
      weight: '3.5kg',
      image: '🐶',
      healthScore: 88,
      recentAnalyses: [
        {
          date: '2025.11.03',
          issue: '치석 제거 필요',
          status: '예약 완료',
          severity: 'medium',
        },
        {
          date: '2025.10.20',
          issue: '예방 접종',
          status: '완료',
          severity: 'low',
        },
        {
          date: '2025.10.10',
          issue: '피부 검사',
          status: '정상',
          severity: 'low',
        },
      ],
      weightHistory: [
        { month: '8월', weight: 3.2 },
        { month: '9월', weight: 3.3 },
        { month: '10월', weight: 3.4 },
        { month: '11월', weight: 3.5 },
      ],
    },
    {
      id: 3,
      name: '코코',
      breed: '말티즈',
      age: '4살',
      weight: '4.2kg',
      image: '🦮',
      healthScore: 92,
      recentAnalyses: [
        {
          date: '2025.11.01',
          issue: '정기 검진',
          status: '완료',
          severity: 'low',
        },
        {
          date: '2025.10.15',
          issue: '슬개골 검사',
          status: '정상',
          severity: 'low',
        },
      ],
      weightHistory: [
        { month: '8월', weight: 4.0 },
        { month: '9월', weight: 4.1 },
        { month: '10월', weight: 4.2 },
        { month: '11월', weight: 4.2 },
      ],
    },
  ]);

  const [selectedDogId, setSelectedDogId] = useState(null);
  const [positions, setPositions] = useState({});

  // 초기 무작위 위치 계산 (반응형)
  useEffect(() => {
    const updatePositions = () => {
      const isMobile = window.innerWidth < 768;
      const X_RANGE = isMobile ? 200 : 400;
      const Y_RANGE = isMobile ? 150 : 250;
      const MIN_DISTANCE = isMobile ? 80 : 120;
      const ROTATE_RANGE = 8;
      const placed = [];

      dogs.forEach(() => {
        let newPos;
        let tries = 0;
        do {
          newPos = {
            x: Math.random() * X_RANGE - X_RANGE / 2,
            y: Math.random() * Y_RANGE - Y_RANGE / 2,
            r: Math.random() * ROTATE_RANGE * 2 - ROTATE_RANGE,
          };
          tries++;
        } while (
          placed.some(
            (p) => Math.hypot(p.x - newPos.x, p.y - newPos.y) < MIN_DISTANCE
          ) &&
          tries < 100
        );
        placed.push(newPos);
      });

      const mapped = dogs.reduce((acc, dog, i) => {
        acc[dog.id] = placed[i];
        return acc;
      }, {});
      setPositions(mapped);
    };

    updatePositions();
    window.addEventListener('resize', updatePositions);
    return () => window.removeEventListener('resize', updatePositions);
  }, [dogs]);

  const selectedDog = dogs.find((d) => d.id === selectedDogId);

  // 작은 카드 렌더링
  const renderMiniCard = (dog, position) => (
    <div
      key={dog.id}
      onClick={() => setSelectedDogId(dog.id)}
      className="absolute cursor-pointer transition-all duration-700 hover:scale-110"
      style={{
        transform: `translate(-50%, -50%) translate(${position.x}px, ${position.y}px) rotate(${position.r}deg)`,
        left: '50%',
        top: '50%',
      }}
    >
      <div className="bg-white rounded-xl md:rounded-2xl shadow-lg hover:shadow-xl p-3 md:p-4 w-[80px] md:w-[100px] h-[95px] md:h-[120px] flex flex-col items-center justify-center transition-all">
        <div className="text-3xl md:text-4xl mb-1">{dog.image}</div>
        <div className="text-xs md:text-sm font-semibold text-gray-800">
          {dog.name}
        </div>
      </div>
    </div>
  );

  // 큰 카드 렌더링
  const renderDogCard = (dog) => {
    const position = positions[dog.id] || { x: 0, y: 0, r: 0 };

    return (
      <div
        key={dog.id}
        className="absolute cursor-auto"
        style={{
          transform: `translate(-50%, -50%) translate(${position.x}px, ${position.y}px)`,
          left: '50%',
          top: '50%',
          animation: 'expandCard 0.5s ease-out forwards',
        }}
      >
        <style>
          {`
            @keyframes expandCard {
              from {
                transform: translate(-50%, -50%) translate(${position.x}px, ${position.y}px) rotate(${position.r}deg) scale(0.2);
                opacity: 0.8;
              }
              to {
                transform: translate(-50%, -50%) translate(0px, 0px) rotate(0deg) scale(1);
                opacity: 1;
              }
            }
          `}
        </style>
        <div className="relative bg-white rounded-2xl md:rounded-3xl shadow-2xl p-4 md:p-6 w-[340px] md:w-[420px]">
          <button
            onClick={() => setSelectedDogId(null)}
            className="absolute top-3 right-3 md:top-4 md:right-4 p-1.5 bg-gray-100 rounded-full hover:bg-gray-200 z-10"
          >
            <X className="w-4 h-4 md:w-5 md:h-5 text-gray-700" />
          </button>

          {/* 헤더 - 강아지 정보 */}
          <div className="text-center mb-4">
            <div className="text-5xl md:text-6xl mb-2">{dog.image}</div>
            <h2 className="text-xl md:text-2xl font-bold text-black">
              {dog.name}
            </h2>
            <p className="text-sm md:text-base text-gray-500">{dog.breed}</p>
          </div>

          {/* 기본 정보 */}
          <div className="grid grid-cols-3 gap-2 mb-4 bg-amber-50 rounded-xl p-3">
            <div className="text-center">
              <div className="text-xs text-gray-500 mb-1">나이</div>
              <div className="text-sm md:text-base font-bold text-gray-800">
                {dog.age}
              </div>
            </div>
            <div className="text-center border-x border-amber-200">
              <div className="text-xs text-gray-500 mb-1">체중</div>
              <div className="text-sm md:text-base font-bold text-amber-600">
                {dog.weight}
              </div>
            </div>
            <div className="text-center">
              <div className="text-xs text-gray-500 mb-1">건강점수</div>
              <div className="text-sm md:text-base font-bold text-gray-800">
                {dog.healthScore}
              </div>
            </div>
          </div>

          {/* 최근 분석 기록 */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm md:text-base font-bold text-gray-900 flex items-center gap-1">
                <Activity className="w-4 h-4 text-blue-600" />
                최근 분석
              </h3>
              <button className="text-[10px] md:text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition-colors flex items-center gap-1">
                <Plus className="w-3 h-3" />
                추가
              </button>
            </div>
            <div className="space-y-2">
              {dog.recentAnalyses.slice(0, 3).map((analysis, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <div
                      className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                        analysis.severity === 'low'
                          ? 'bg-green-500'
                          : 'bg-yellow-500'
                      }`}
                    ></div>
                    <div className="min-w-0 flex-1">
                      <div className="font-medium text-xs md:text-sm text-gray-900 truncate">
                        {analysis.issue}
                      </div>
                      <div className="text-[10px] md:text-xs text-gray-500">
                        {analysis.date}
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-3 h-3 md:w-4 md:h-4 text-gray-400 group-hover:text-blue-600 shrink-0" />
                </div>
              ))}
            </div>
          </div>

          {/* 체중 변화 */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm md:text-base font-bold text-gray-900 flex items-center gap-1">
                <TrendingUp className="w-4 h-4 text-amber-600" />
                체중 변화
              </h3>
              <button className="text-[10px] md:text-xs px-2 py-1 bg-amber-50 text-amber-600 rounded-full hover:bg-amber-100 transition-colors flex items-center gap-1">
                <Plus className="w-3 h-3" />
                기록
              </button>
            </div>
            <div className="space-y-2">
              {dog.weightHistory.slice(-4).map((record, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-600">
                      {record.month}
                    </span>
                    <span className="font-semibold text-xs md:text-sm text-gray-900">
                      {record.weight}kg
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div
                      className="bg-amber-600 h-1.5 rounded-full transition-all"
                      style={{
                        width: `${
                          (record.weight / (dog.id === 1 ? 30 : 5)) * 100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-amber-50 via-orange-50 to-amber-50 pt-16 md:pt-20 pb-20 md:pb-24 px-3 md:px-4">
      <div className="max-w-7xl mx-auto px-2 md:px-4 py-4 md:py-8">
        {/* 건강 팁 */}
        <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 mb-6 md:mb-8 shadow-sm border border-gray-200 mt-2 md:mt-4">
          <div className="flex items-start gap-3 md:gap-4">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-amber-600 rounded-full flex items-center justify-center shrink-0">
              <Lightbulb className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <div>
              <h3 className="text-base md:text-lg font-bold text-gray-900 mb-1 md:mb-2">
                오늘의 건강 팁
              </h3>
              <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                겨울철 건조한 날씨로 인해 반려견의 피부가 건조해질 수 있어요.
                충분한 수분 섭취와 함께 보습 관리에 신경 써주세요.
              </p>
            </div>
          </div>
        </div>

        {/* 강아지 카드 (작은 카드 or 선택된 큰 카드) */}
        <div
          className={`relative mb-6 md:mb-8 flex items-center justify-center ${
            selectedDogId ? 'min-h-[600px]' : 'h-[360px] md:h-[480px]'
          }`}
        >
          {!selectedDogId
            ? dogs.map((dog) =>
                renderMiniCard(dog, positions[dog.id] || { x: 0, y: 0, r: 0 })
              )
            : renderDogCard(selectedDog)}
        </div>
      </div>
    </div>
  );
}
