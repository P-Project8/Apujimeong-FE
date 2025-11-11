import { useState, useRef } from 'react';
import {
  Upload,
  Image as ImageIcon,
  CheckCircle,
  Sparkles,
  ChevronRight,
  X,
  Loader2,
  FileText,
  AlertTriangle,
  Info,
  Calendar,
} from 'lucide-react';

export default function DiagnosisPage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [selectedDog, setSelectedDog] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const fileInputRef = useRef(null);

  // 반려견 목록 (메인 페이지와 동일)
  const dogs = [
    { id: 1, name: '뭉치', breed: '골든 리트리버', image: '🐕' },
    { id: 2, name: '꼬미', breed: '포메라니안', image: '🐶' },
    { id: 3, name: '코코', breed: '말티즈', image: '🦮' },
  ];

  // 분석 카테고리
  const categories = [
    { id: 'ear', name: '귀' },
    { id: 'eye', name: '눈' },
    { id: 'skin', name: '피부' },
    { id: 'fur', name: '털' },
    { id: 'paw', name: '발' },
    { id: 'joint', name: '슬개골' },
    { id: 'respiratory', name: '호흡기' },
    { id: 'nose', name: '코' },
  ];

  // 파일 선택 핸들러
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // 분석 시작
  const handleAnalyze = () => {
    if (!selectedDog) {
      alert('반려견을 선택해주세요!');
      return;
    }
    if (!selectedCategory) {
      alert('분석 카테고리를 선택해주세요!');
      return;
    }
    if (!selectedImage) {
      alert('사진을 업로드해주세요!');
      return;
    }

    setIsAnalyzing(true);

    const categoryName = categories.find((c) => c.id === selectedCategory).name;

    // 시뮬레이션: 3초 후 결과 표시
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisResult({
        dogName: dogs.find((d) => d.id === selectedDog).name,
        category: categoryName,
        analysisDate: new Date().toLocaleDateString('ko-KR'),
        overallHealth: 85,
        detectedIssues: [
          {
            name: `${categoryName} 관련 이상 징후`,
            severity: 'medium',
            confidence: 78,
            description: `${categoryName} 부위에 약간의 이상이 관찰됩니다.`,
            recommendation: '수의사 상담을 권장합니다.',
          },
          {
            name: `전반적인 ${categoryName} 상태`,
            severity: 'low',
            confidence: 92,
            description: `${categoryName}의 전반적인 상태는 양호합니다.`,
            recommendation: '현재 케어를 유지해주세요.',
          },
        ],
        recommendations: [
          '2-3일 내 수의사 방문을 권장합니다.',
          '해당 부위를 긁지 못하도록 주의해주세요.',
          '알레르기 유발 가능성이 있는 음식을 피해주세요.',
        ],
        nextSteps: [
          '수의사 예약하기',
          '증상 사진 추가 촬영',
          '1주일 후 재분석',
        ],
      });
    }, 3000);
  };

  // 초기화
  const handleReset = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setAnalysisResult(null);
    setSelectedDog(null);
    setSelectedCategory(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // 심각도에 따른 색상
  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 text-red-700 border-red-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'low':
        return 'bg-green-100 text-green-700 border-green-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 pt-20 md:pt-32 pb-24 md:pb-32 px-3 md:px-4">
      <div className="max-w-7xl mx-auto">
        {/* 헤더 */}
        <div className="text-center mb-6 md:mb-8">
          <div className="inline-flex items-center gap-2 bg-blue-100 px-3 md:px-4 py-1.5 md:py-2 rounded-full mb-3 md:mb-4">
            <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
            <span className="text-xs md:text-sm text-blue-600 font-semibold">
              AI 기반 건강 분석
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 md:mb-3">
            반려견 AI 진단
          </h1>
          <p className="text-sm md:text-base lg:text-lg text-gray-600">
            사진 한 장으로 반려견의 건강 상태를 빠르게 확인해보세요
          </p>
        </div>

        {/* 분석 결과가 없을 때 */}
        {!analysisResult && (
          <div className="grid md:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
            {/* 왼쪽: 업로드 영역 */}
            <div className="bg-white rounded-2xl md:rounded-3xl p-5 md:p-8 shadow-lg border border-gray-200 h-full">
              <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900 mb-4 md:mb-6">
                1. 사진 업로드
              </h2>
              {/* 이미지 프리뷰 영역 */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className={`relative border-2 md:border-3 border-dashed rounded-xl md:rounded-2xl overflow-hidden mb-4 md:mb-6 transition-all cursor-pointer ${
                  imagePreview
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 bg-gray-50 hover:border-blue-400 hover:bg-blue-50'
                }`}
                style={{ height: '250px', maxHeight: '380px' }}
              >
                {imagePreview ? (
                  <div className="relative w-full h-full">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedImage(null);
                        setImagePreview(null);
                      }}
                      className="absolute top-2 right-2 md:top-4 md:right-4 bg-white rounded-full p-1.5 md:p-2 shadow-lg hover:bg-gray-100 transition-colors"
                    >
                      <X className="w-4 h-4 md:w-5 md:h-5 text-gray-700" />
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full">
                    <div className="w-16 h-16 md:w-24 md:h-24 bg-blue-100 rounded-full flex items-center justify-center mb-3 md:mb-4">
                      <ImageIcon className="w-8 h-8 md:w-12 md:h-12 text-blue-600" />
                    </div>
                    <p className="text-sm md:text-base lg:text-lg text-gray-600 font-medium mb-1 md:mb-2">
                      사진을 업로드하세요
                    </p>
                    <p className="text-xs md:text-sm text-gray-500">
                      JPG, PNG 파일 지원
                    </p>
                  </div>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
              {/* 분석 부위 선택 */}
              <div className="mb-4 md:mb-6">
                <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2 md:mb-3">
                  분석 부위 선택
                </h3>
                <div className="grid grid-cols-4 gap-1.5 md:gap-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`py-2 md:py-3 px-1 md:px-2 rounded-lg border-2 transition-all font-medium text-xs md:text-sm ${
                        selectedCategory === category.id
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 bg-white text-gray-700 hover:border-blue-300 hover:bg-blue-50'
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
              {/* 가이드 */}
              <div className="p-3 md:p-4 bg-blue-50 rounded-lg md:rounded-xl border border-blue-200">
                <div className="flex gap-2 md:gap-3">
                  <Info className="w-4 h-4 md:w-5 md:h-5 text-blue-600 shrink-0 mt-0.5" />
                  <div className="text-xs md:text-sm text-blue-800">
                    <p className="font-semibold mb-1">촬영 팁</p>
                    <ul className="space-y-0.5 md:space-y-1 text-blue-700">
                      <li>• 충분한 조명에서 촬영하세요</li>
                      <li>• 관심 부위를 명확하게 촬영하세요</li>
                      <li>• 여러 각도의 사진을 준비하세요</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* 오른쪽: 반려견 선택 & 최근 기록 */}
            <div className="space-y-4 md:space-y-6">
              {/* 반려견 선택 */}
              <div className="bg-white rounded-2xl md:rounded-3xl p-5 md:p-8 shadow-lg border border-gray-200">
                <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900 mb-4 md:mb-6">
                  2. 반려견 선택
                </h2>
                <div className="space-y-2 md:space-y-3">
                  {dogs.map((dog) => (
                    <button
                      key={dog.id}
                      onClick={() => setSelectedDog(dog.id)}
                      className={`w-full p-4 md:p-5 rounded-lg md:rounded-xl border-2 transition-all ${
                        selectedDog === dog.id
                          ? 'border-blue-500 bg-blue-50 shadow-md'
                          : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50'
                      }`}
                    >
                      <div className="flex items-center gap-3 md:gap-4">
                        <div className="text-3xl md:text-4xl lg:text-5xl">
                          {dog.image}
                        </div>
                        <div className="flex-1 text-left">
                          <div className="font-bold text-gray-900 text-base md:text-lg">
                            {dog.name}
                          </div>
                          <div className="text-sm md:text-base text-gray-600">
                            {dog.breed}
                          </div>
                        </div>
                        {selectedDog === dog.id && (
                          <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 분석 시작 버튼 */}
              <div className="bg-white rounded-2xl md:rounded-3xl p-5 md:p-8 shadow-lg border border-gray-200">
                <button
                  onClick={handleAnalyze}
                  disabled={
                    !selectedDog ||
                    !selectedCategory ||
                    !selectedImage ||
                    isAnalyzing
                  }
                  className="w-full py-4 md:py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg md:rounded-xl font-bold text-base md:text-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="w-5 h-5 md:w-6 md:h-6 animate-spin" />
                      분석 중...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 md:w-6 md:h-6" />
                      AI 분석 시작하기
                    </>
                  )}
                </button>

                {/* 선택 상태 요약 */}
                <div className="mt-3 md:mt-4 p-3 md:p-4 bg-gray-50 rounded-lg md:rounded-xl">
                  <div className="text-xs md:text-sm text-gray-600 space-y-1.5 md:space-y-2">
                    <div className="flex items-center justify-between">
                      <span>반려견:</span>
                      <span className="font-semibold text-gray-900">
                        {selectedDog
                          ? dogs.find((d) => d.id === selectedDog)?.name
                          : '미선택'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>분석 부위:</span>
                      <span className="font-semibold text-gray-900">
                        {selectedCategory
                          ? categories.find((c) => c.id === selectedCategory)
                              ?.name
                          : '미선택'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>사진:</span>
                      <span className="font-semibold text-gray-900">
                        {selectedImage ? '업로드 완료' : '미업로드'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 분석 결과 */}
        {analysisResult && (
          <div className="bg-linear-to-r from-blue-600 to-indigo-600 rounded-2xl md:rounded-3xl p-5 md:p-8 text-white shadow-xl space-y-4 md:space-y-6">
            {/* 결과 헤더 */}
            <div className="flex flex-col md:flex-row items-start justify-between mb-3 md:mb-4 gap-3 md:gap-0">
              <div className="flex items-start gap-3 md:gap-4">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                  <CheckCircle className="w-6 h-6 md:w-8 md:h-8" />
                </div>
                <div>
                  <div className="text-xs md:text-sm opacity-90 mb-1">
                    분석 완료
                  </div>
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-1 md:mb-2">
                    {analysisResult.dogName}의 {analysisResult.category} 분석
                    결과
                  </h2>
                  <div className="flex items-center gap-2 text-white/90 text-xs md:text-sm">
                    <Calendar className="w-3 h-3 md:w-4 md:h-4" />
                    <span>{analysisResult.analysisDate}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={handleReset}
                className="w-full md:w-auto px-5 md:px-6 py-2.5 md:py-3 bg-white/20 hover:bg-white/30 rounded-lg md:rounded-xl text-sm md:text-base font-semibold transition-all whitespace-nowrap"
              >
                새로 분석하기
              </button>
            </div>

            {/* 발견된 이슈 */}
            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
              {analysisResult.detectedIssues.map((issue, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-lg border border-gray-200"
                >
                  <div className="flex items-start justify-between mb-3 md:mb-4">
                    <div className="flex items-center gap-2 md:gap-3">
                      <div
                        className={`w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl flex items-center justify-center ${getSeverityColor(
                          issue.severity
                        )}`}
                      >
                        {issue.severity === 'low' ? (
                          <CheckCircle className="w-5 h-5 md:w-6 md:h-6" />
                        ) : (
                          <AlertTriangle className="w-5 h-5 md:w-6 md:h-6" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 text-base md:text-lg">
                          {issue.name}
                        </h4>
                        <div className="text-xs md:text-sm text-gray-500">
                          신뢰도: {issue.confidence}%
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm md:text-base text-gray-700 mb-3">
                    {issue.description}
                  </p>
                  <div className="p-2.5 md:p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-xs md:text-sm text-blue-800 font-medium">
                      💡 {issue.recommendation}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* 권장사항 */}
            <div className="bg-white rounded-2xl md:rounded-3xl p-5 md:p-8 shadow-lg border border-gray-200">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">
                권장 사항
              </h3>
              <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2 text-sm md:text-base">
                    <FileText className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
                    조치 사항
                  </h4>
                  <ul className="space-y-2 md:space-y-3">
                    {analysisResult.recommendations.map((rec, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 md:gap-3 text-sm md:text-base text-gray-700"
                      >
                        <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-blue-600 shrink-0 mt-0.5" />
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 로딩 오버레이 */}
        {isAnalyzing && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl md:rounded-3xl p-8 md:p-12 max-w-md w-full text-center">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                <Loader2 className="w-8 h-8 md:w-10 md:h-10 text-blue-600 animate-spin" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 md:mb-3">
                AI가 분석 중입니다
              </h3>
              <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6">
                사진을 분석하고 있습니다. 잠시만 기다려주세요...
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-xs md:text-sm text-gray-700">
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                  <span>이미지 처리 중</span>
                </div>
                <div className="flex items-center gap-3 text-xs md:text-sm text-gray-700">
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse delay-100"></div>
                  <span>건강 상태 분석 중</span>
                </div>
                <div className="flex items-center gap-3 text-xs md:text-sm text-gray-700">
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse delay-200"></div>
                  <span>결과 생성 중</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
