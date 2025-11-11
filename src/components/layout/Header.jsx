import { Home, Stethoscope, Dog, BookOpen, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

  const isLandingPage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: '홈', path: '/home', icon: Home },
    { name: 'AI 진단', path: '/diagnosis', icon: Stethoscope },
    { name: '반려견', path: '/pets', icon: Dog },
    { name: '질환 정보', path: '/diseases', icon: BookOpen },
    { name: '커뮤니티', path: '/community', icon: Users },
  ];

  const LoginModal = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-150 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl relative">
        {/* X 버튼 */}
        <button
          onClick={() => setShowLoginModal(false)}
          className="absolute top-3 right-3 md:top-4 md:right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg
            className="w-5 h-5 md:w-6 md:h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <img
          src="/logo.png"
          alt="logo"
          className="m-auto w-32 md:w-40 h-auto mb-8 md:mb-12 mt-2 md:mt-4"
        />
        <p className="text-slate-400 text-xs md:text-sm mb-2 text-center">
          간편하게 SNS 로그인
        </p>

        <div className="flex flex-col items-center">
          {/* 카카오톡 로그인 */}
          <button
            onClick={() => {
              setIsLoggedIn(true);
              setShowLoginModal(false);
            }}
            className="relative w-full max-w-[300px] mb-3 md:mb-4 py-2.5 md:py-3 bg-[#FEE500] hover:bg-[#FDD835] text-[#000000] rounded-4xl font-bold text-xs md:text-sm transition-all flex items-center justify-center gap-2"
          >
            <img
              src="/icons/kakao.svg"
              alt="KAKAO"
              className="w-5 h-5 md:w-6 md:h-6 absolute left-4 md:left-6"
            />
            카카오톡으로 로그인
          </button>

          {/* 구글 로그인 */}
          <button
            onClick={() => {
              setIsLoggedIn(true);
              setShowLoginModal(false);
            }}
            className="relative w-full max-w-[300px] mb-3 md:mb-4 py-2.5 md:py-3 bg-white hover:bg-gray-50 text-black rounded-4xl font-bold text-xs md:text-sm transition-all border border-gray-300 flex items-center justify-center gap-2"
          >
            <img
              src="/icons/google.svg"
              alt="GOOGLE"
              className="w-5 h-5 md:w-6 md:h-6 absolute left-4 md:left-6"
            />
            구글로 로그인
          </button>

          {/* 구분선 */}
          <div className="relative py-3 md:py-4 w-full max-w-[300px]">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-amber-900"></div>
            </div>
            <div className="relative flex justify-center text-xs md:text-sm">
              <span className="px-3 md:px-4 bg-white text-amber-900">또는</span>
            </div>
          </div>

          {/* 이메일 로그인 */}
          <button
            onClick={() => {
              setIsLoggedIn(true);
              setShowLoginModal(false);
            }}
            className="w-full max-w-[300px] py-2.5 md:py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-4xl font-bold text-xs md:text-sm transition-all flex items-center justify-center gap-2"
          >
            이메일로 로그인
          </button>
        </div>

        <div className="mt-4 md:mt-6 text-center text-xs md:text-sm text-amber-900/70">
          아직 회원이 아니신가요?&nbsp;
          <span className="text-amber-700 font-bold cursor-pointer hover:text-amber-800">
            회원가입
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <header
        className={`fixed top-0 left-0 right-0 z-100 transition-all duration-100 ${
          isScrolled || !isLandingPage ? 'bg-white shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-3 md:px-4 py-1 md:py-2">
          <div className="flex items-center justify-between h-14 md:h-16">
            <div className="flex items-center gap-2 cursor-pointer group">
              <img
                src="/logo.png"
                alt="LOGO-text"
                className="w-16 md:w-24 h-auto transition-all duration-500 overflow-hidden"
              />
            </div>

            {/* 데스크톱 내비게이션 메뉴 - Dock 스타일 */}
            {!isLandingPage && (
              <nav className="hidden md:flex items-end gap-4 h-12">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  const isHovered = hoveredItem === item.path;

                  return (
                    <div
                      key={item.path}
                      className="flex flex-col items-center relative"
                      onMouseEnter={() => setHoveredItem(item.path)}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      <button
                        onClick={() => navigate(item.path)}
                        className={`
                          relative rounded-2xl p-3 transition-all duration-300 ease-out
                          ${
                            isActive
                              ? 'bg-amber-100 text-amber-600'
                              : 'bg-gray-50 text-gray-600 hover:bg-amber-50 hover:text-amber-600'
                          }
                          ${isHovered ? 'scale-125 translate-y-2' : 'scale-100'}
                        `}
                      >
                        <Icon
                          className={`transition-all duration-300 ${
                            isHovered ? 'w-7 h-7' : 'w-6 h-6'
                          }`}
                          strokeWidth={2.5}
                        />

                        {/* 활성 표시 점 */}
                        {isActive && (
                          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-amber-600 rounded-full" />
                        )}
                      </button>

                      {/* 호버 시 나타나는 라벨 */}
                      <div
                        className={`
                          absolute top-full mt-1 left-1/2 -translate-x-1/2 whitespace-nowrap
                          transition-all duration-300 ease-out z-50
                          ${
                            isHovered
                              ? 'opacity-100'
                              : 'opacity-0 -translate-y-2 pointer-events-none'
                          }
                        `}
                      >
                        <span className="text-xs font-semibold text-gray-700 bg-white px-3 py-1 rounded-full shadow-md border border-gray-200">
                          {item.name}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </nav>
            )}

            <div className="flex items-center gap-2 md:gap-3">
              {isLoggedIn ? (
                // 로그인 상태: 프로필 카드
                <div className="flex items-center gap-2 md:gap-3 md:bg-amber-50 hover:bg-amber-100 px-3 md:px-4 py-1.5 md:py-2 rounded-full transition-all cursor-pointer md:shadow-sm">
                  <img
                    src="/tear.png"
                    alt="프로필"
                    className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover"
                  />
                  <span className="font-semibold text-sm md:text-base text-gray-800 hidden sm:block">
                    칠가이
                  </span>
                </div>
              ) : (
                // 비로그인 상태: 로그인 버튼
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="px-4 md:px-6 py-2 md:py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-full font-bold text-xs md:text-base transition-all shadow-md"
                >
                  로그인
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* 모바일 하단 내비게이션 */}
      {!isLandingPage && (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-100 pb-safe">
          <div className="flex items-center justify-around px-1 py-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className="flex flex-col items-center gap-0.5 min-w-0 flex-1"
                >
                  <div
                    className={`
                      p-1.5 rounded-xl transition-all duration-200
                      ${
                        isActive
                          ? 'bg-amber-100 text-amber-600'
                          : 'text-gray-600'
                      }
                    `}
                  >
                    <Icon className="w-5 h-5" strokeWidth={2.5} />
                  </div>
                  <span
                    className={`
                      text-[10px] font-medium transition-colors
                      ${isActive ? 'text-amber-600' : 'text-gray-600'}
                    `}
                  >
                    {item.name}
                  </span>
                </button>
              );
            })}
          </div>
        </nav>
      )}

      {showLoginModal && <LoginModal />}
    </div>
  );
}
