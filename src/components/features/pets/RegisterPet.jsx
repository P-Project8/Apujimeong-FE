import { useState } from 'react';
import { Camera, ChevronLeft, Mars, Venus } from 'lucide-react';

export default function RegisterPet({ onBack, onRegister }) {
  const [formData, setFormData] = useState({
    name: '',
    breed: '',
    gender: '',
    birthday: '',
    notes: '',
    imageUrl: '',
  });
  const [previewImage, setPreviewImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setFormData({ ...formData, imageUrl: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    // 유효성 검사
    if (
      !formData.name ||
      !formData.breed ||
      !formData.gender ||
      !formData.birthday
    ) {
      alert('필수 항목을 모두 입력해주세요');
      return;
    }

    onRegister?.(formData);
  };

  return (
    <div
      className="min-h-screen pt-20 pb-32 px-2"
      style={{
        background: 'linear-gradient(to bottom, #fef3c7, #fed7aa)',
      }}
    >
      <button
        onClick={onBack}
        className="ml-4 mb-4 rounded-full bg-white flex items-center justify-center p-1"
      >
        <ChevronLeft className="w-6 h-6 text-amber-900" />
      </button>
      {/* 폼 컨텐츠 */}
      <div className="max-w-2xl mx-auto px-4 space-y-6">
        {/* 사진 업로드 영역 - 폴라로이드 스타일 */}
        <div className="bg-white p-6 rounded-sm shadow-lg">
          <label className="block">
            <div className="relative aspect-square bg-amber-50 border-2 border-amber-100 rounded-xl overflow-hidden cursor-pointer hover:border-amber-200 transition-colors">
              {previewImage ? (
                <img
                  src={previewImage}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  style={{
                    filter: 'contrast(0.95) brightness(0.98) saturate(0.9)',
                  }}
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-amber-700">
                  <Camera className="w-16 h-16 mb-3" strokeWidth={1.5} />
                  <p className="text-lg font-medium">사진 추가하기</p>
                  <p className="text-sm text-amber-600 mt-1">탭하여 선택</p>
                </div>
              )}
              {previewImage && (
                <div className="absolute inset-0 bg-linear-to-b from-transparent to-black/10 pointer-events-none" />
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
          <p
            className="text-center text-amber-800 mt-3 text-sm"
            style={{
              fontFamily: '"Nanum Pen Script", cursive',
              fontSize: '1.1rem',
            }}
          >
            우리 강아지의 멋진 사진을 올려주세요
          </p>
        </div>

        {/* 기본 정보 카드 */}
        <div className="bg-white p-6 rounded-2xl shadow-lg space-y-5">
          <h2 className="text-lg font-bold text-amber-950 flex items-center gap-2 border-b border-amber-900 pb-2">
            기본 정보
          </h2>

          {/* 이름 */}
          <div>
            <label className="block text-amber-900 mb-2 text-sm font-semibold">
              이름 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="강아지 이름"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-amber-900 text-sm text-gray-800 "
            />
          </div>

          {/* 품종 */}
          <div>
            <label className="block text-amber-900 mb-2 text-sm font-semibold">
              품종 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="예: 푸들, 말티즈, 믹스견"
              value={formData.breed}
              onChange={(e) =>
                setFormData({ ...formData, breed: e.target.value })
              }
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-amber-900 text-sm text-gray-800"
            />
          </div>

          {/* 성별 */}
          <div>
            <label className="block text-amber-900 mb-3 text-sm font-semibold">
              성별 <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, gender: 'male' })}
                className={`flex-1 py-2 px-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                  formData.gender === 'male'
                    ? 'bg-blue-500 text-white border-2 border-blue-600 shadow-md'
                    : 'bg-white text-gray-600 border-2 border-gray-300'
                }`}
              >
                <Mars className="w-5 h-5" />남
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, gender: 'female' })}
                className={`flex-1 py-2 px-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                  formData.gender === 'female'
                    ? 'bg-pink-500 text-white border-2 border-pink-600 shadow-md'
                    : 'bg-white text-gray-600 border-2 border-gray-300'
                }`}
              >
                <Venus className="w-5 h-5" />여
              </button>
            </div>
          </div>

          {/* 생년월일 */}
          <div>
            <label className="block text-amber-900 mb-2 text-sm font-semibold">
              생년월일 <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={formData.birthday}
              onChange={(e) =>
                setFormData({ ...formData, birthday: e.target.value })
              }
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-amber-900 text-sm text-gray-800"
            />
          </div>
        </div>

        {/* 특이사항 카드 */}
        <div className="bg-white p-6 rounded-2xl shadow-lg space-y-4">
          <h2 className="text-lg font-bold text-amber-950 flex items-center gap-2 border-b border-amber-900 pb-2">
            특이사항
          </h2>

          <div>
            <label className="block text-amber-900 mb-2 text-sm font-semibold">
              알레르기, 질병, 주의사항 등
            </label>
            <textarea
              placeholder="예: 닭고기 알레르기 있음&#10;슬개골 탈구 수술 이력&#10;천둥소리에 예민함"
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
              rows={5}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-amber-500 text-sm text-gray-800 resize-none"
            />
            <p className="text-xs text-amber-600 mt-2">
              * 건강 관리에 필요한 정보를 자유롭게 작성해주세요
            </p>
          </div>
        </div>

        {/* 버튼들 */}
        <div className="flex gap-3">
          <button
            onClick={onBack}
            className="flex-1 py-2 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-all active:scale-95"
          >
            취소
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 py-2 bg-amber-600 text-white rounded-xl font-bold hover:bg-amber-700 transition-all shadow-md active:scale-95"
          >
            등록하기
          </button>
        </div>
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Nanum+Pen+Script&display=swap');
      `}</style>
    </div>
  );
}
