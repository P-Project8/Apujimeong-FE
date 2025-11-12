import { useState } from 'react';
import {
  Camera,
  BookOpen,
  ChevronRight,
  Stethoscope,
  TrendingUp,
  MessageCircle,
  Shield,
  Check,
} from 'lucide-react';
import { useNavigate } from 'react-router';

export default function LandingPage() {
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const features = [
    {
      icon: Camera,
      title: 'AI 질환 감지',
      description:
        '사진 한 장으로 반려견의 상태를 빠르게 분석하고 조치 사항을 안내받으세요.',
    },
    {
      icon: TrendingUp,
      title: '체중 관리',
      description:
        '반려견의 체중을 기록하고 그래프로 확인하며 건강한 성장을 관리하세요.',
    },
    {
      icon: BookOpen,
      title: '질환 정보 라이브러리',
      description:
        '부위별로 정리된 질환 정보와 증상, 대처법을 쉽게 찾아보세요.',
    },
    {
      icon: MessageCircle,
      title: '보호자 커뮤니티',
      description: '다른 반려견 보호자들과 경험을 나누고 정보를 공유하세요.',
    },
  ];

  const categories = [
    { name: '귀', imageUrl: '/src/assets/images/dog-ear.jpg' },
    { name: '눈', imageUrl: '/src/assets/images/dog-eye.jpg' },
    { name: '피부', imageUrl: '/src/assets/images/dog-skin.jpg' },
    { name: '털', imageUrl: '/src/assets/images/dog-hair.jpg' },
    { name: '발', imageUrl: '/src/assets/images/dog-foot.jpg' },
    { name: '슬개골', imageUrl: '/src/assets/images/dog-kneecap.jpg' },
    { name: '호흡기', imageUrl: '/src/assets/images/dog-breath.jpg' },
    { name: '코', imageUrl: '/src/assets/images/dog-nose.jpg' },
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-amber-50 via-orange-50 to-amber-50">
      {/* Hero Section */}
      <section className="pt-20 md:pt-32 pb-12 md:pb-20 px-4 relative">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-block mb-4 md:mb-6 px-4 md:px-6 py-2 md:py-3 bg-amber-100 rounded-full shadow-md">
            <span className="text-sm md:text-base text-amber-900 font-bold">
              반려견 건강 관리의 새로운 기준
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-amber-950 mb-4 md:mb-6 leading-tight px-2">
            우리 강아지,
            <br />
            <span className="text-amber-700">아프지 않게</span> 지켜주세요
          </h1>

          <p className="text-xs md:text-xl lg:text-2xl text-amber-900/80 mb-8 md:mb-10 max-w-3xl mx-auto leading-relaxed px-4">
            AI 기반 질환 분석부터 체중 관리, 질환 정보, 보호자 커뮤니티까지
            <br />
            반려견의 건강을 위한 모든 것을 한 곳에서
          </p>

          <div className="flex justify-center px-4">
            <button
              onClick={() => navigate('/')}
              className="group px-12 md:px-10 py-4 md:py-5 bg-amber-600 hover:bg-amber-700 text-white rounded-full font-bold text-base md:text-lg shadow-xl transform hover:scale-105 transition-all flex items-center justify-center gap-2 z-10"
            >
              시작하기
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-amber-950 mb-3 md:mb-4">
              아프지멍이 특별한 이유
            </h2>
            <p className="text-base md:text-xl text-amber-900/70">
              반려견 보호자들이 필요로 하는 모든 기능을 하나로
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 md:gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-linear-to-br from-amber-50 to-orange-50 p-6 md:p-8 rounded-2xl md:rounded-3xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 duration-500"
              >
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-amber-600 text-white flex items-center justify-center mb-4 md:mb-6">
                  <feature.icon className="w-6 h-6 md:w-8 md:h-8" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-amber-950 mb-2 md:mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm md:text-base text-amber-900/70 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Highlight Section */}
      <section className="py-12 md:py-20 px-4 bg-linear-to-br from-amber-600 to-orange-600 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <div className="inline-block mb-4 md:mb-6 px-4 md:px-5 py-2 bg-white/20 backdrop-blur-sm rounded-full font-semibold text-sm md:text-base">
                <Stethoscope className="w-4 h-4 md:w-5 md:h-5 inline mr-2" />
                AI 기술 기반
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 leading-tight">
                사진 한 장으로
                <br />
                빠른 질환 체크
              </h2>
              <p className="text-base md:text-xl mb-6 md:mb-8 text-amber-50">
                의심되는 증상을 촬영하면 AI가 분석하여 가능한 질환과 대처법을
                안내해드립니다
              </p>
              <div className="space-y-3 md:space-y-4">
                {[
                  '병변 유형 자동 분류',
                  '홈 케어 가이드 제공',
                  '병원 방문 필요 여부 안내',
                ].map((text, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg md:rounded-xl p-3 md:p-4"
                  >
                    <Check className="w-5 h-5 md:w-6 md:h-6 shrink-0" />
                    <span className="text-sm md:text-base lg:text-lg font-medium">
                      {text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-2xl text-amber-900">
              <Camera className="w-12 h-12 md:w-16 md:h-16 text-amber-600 mb-4 md:mb-6" />
              <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">
                간편한 분석 과정
              </h3>
              <div className="space-y-4 md:space-y-5">
                {[
                  { num: '1', text: '증상 부위 사진 촬영' },
                  { num: '2', text: 'AI 자동 분석 진행' },
                  { num: '3', text: '결과 및 가이드 확인' },
                ].map((step, i) => (
                  <div key={i} className="flex items-center gap-3 md:gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-amber-600 text-white rounded-full flex items-center justify-center font-bold text-lg md:text-xl">
                      {step.num}
                    </div>
                    <span className="text-base md:text-lg font-semibold">
                      {step.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 md:py-20 px-4 bg-amber-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-amber-950 mb-3 md:mb-4">
              부위별 질환 정보
            </h2>
            <p className="text-base md:text-xl text-amber-900/70">
              8개 부위로 분류된 체계적인 질환 정보
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            {categories.map((category, index) => (
              <div
                key={index}
                className="relative group overflow-hidden rounded-xl md:rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 cursor-pointer h-36 md:h-48"
              >
                {/* 배경 이미지 */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{
                    backgroundImage: `url(${category.imageUrl})`,
                  }}
                />

                {/* 살짝만 어두운 오버레이 */}
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/10 transition-all duration-300" />

                {/* 유리 효과 (Glassmorphism) - 투명도 낮춤 */}
                <div className="absolute inset-0 backdrop-blur-[2px] bg-white/5 border border-white/10" />

                {/* 번쩍이는 효과 (Shine Effect) */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div
                    className="absolute inset-0 bg-linear-to-r from-transparent via-white/40 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                    style={{
                      transform: 'skewX(-20deg)',
                    }}
                  />
                </div>

                {/* 콘텐츠 - 오른쪽 하단 */}
                <div className="relative z-10 h-full flex items-end justify-end p-4 md:p-6">
                  <div className="text-right">
                    <div className="font-bold text-xl md:text-2xl text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                      {category.name}
                    </div>
                    <div className="text-3xl md:text-4xl mt-1 md:mt-2 drop-shadow-lg filter transition-transform duration-300 group-hover:scale-110">
                      {category.icon}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-8 md:py-12 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-start gap-3 md:gap-4 bg-white p-4 md:p-6 border-2 border-amber-400 rounded-xl md:rounded-2xl shadow-lg">
            <Shield className="w-8 h-8 md:w-10 md:h-10 text-yellow-600 shrink-0 mt-1" />
            <div>
              <h3 className="text-base md:text-xl font-bold text-amber-950 mb-2">
                중요한 안내사항
              </h3>
              <p className="text-xs md:text-base text-amber-900/80 leading-relaxed">
                본 서비스는 <strong>의료행위가 아닌 정보 제공 목적</strong>
                입니다. AI 분석 결과는 참고용이며, 반려견에게 응급 증상이
                발견되거나 건강 이상이 의심될 경우
                <strong className="text-red-600"> 즉시 동물병원을 방문</strong>
                하시기 바랍니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-amber-950 text-amber-100 py-8 md:py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
            <div></div>
            <div className="text-center md:text-right">
              <p className="text-xs md:text-sm">
                © 2025 아프지멍. All rights reserved.
              </p>
              <p className="text-xs md:text-sm mt-1">
                반려견의 건강한 삶을 응원합니다
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
