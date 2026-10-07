import React from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';

export const FAQ_ITEMS = [
  {
    question: '時給から月収を計算する基本的な計算式はどうなっていますか？',
    answer: '基本給は「1日の実働時間（拘束時間 － 休憩時間） × 基本時給 × 当月の出勤日数」で計算されます。交通費が日額支給の場合は「出勤日数 × 日額交通費」が加算されます。当ツールでは選択した年月の実際の暦（日数・土日祝）に基づき自動集計します。',
  },
  {
    question: '実質時給とは何ですか？通常の時給と何が違うのですか？',
    answer: '実質時給とは、（基本給総額 ＋ 交通費手当等の総支給額）を総実労働時間で割った「1時間あたりの真の収益額」です。交通費が全額支給される職場や各種手当がつく職場では、表記上の基本時給よりも実質時給が高くなります。',
  },
  {
    question: '目標月収10万円を稼ぐには、時給1,100円で週何日・何時間働けばいいですか？',
    answer: '時給1,100円の場合、月間約91時間の労働が必要です。1日5時間勤務であれば月19日（週4〜5日）、1日8時間勤務（休憩1時間）であれば月12日（週3日）の出勤で達成できます。',
  },
  {
    question: '年収の壁（103万円・106万円・130万円・150万円）とは何ですか？',
    answer: '103万円は所得税発生および親や配偶者の扶養控除上限、106万円・130万円は社会保険（健康保険・厚生年金）の加入義務・扶養外れ、150万円は配偶者特別控除の満額上限です。当ツールでは見込み年収に対する残り枠を一目で確認できます。',
  },
  {
    question: '入力した時給やシフトデータは保存されますか？個人情報は安全ですか？',
    answer: '入力データはお使いのブラウザ内（LocalStorage）にのみ自動保存され、サーバーへ送信されることは一切ありません。完全無料・登録不要で安全にご利用いただけます。',
  },
];

export const SeoContentSection: React.FC = () => {
  return (
    <div className="mt-16 space-y-12">
      {/* 特徴 & 使い方ガイド */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-12">
        {/* ツール概要・特徴 */}
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 pb-3 border-b border-slate-100 flex items-center space-x-2">
            <span>時給計算・シフト＆目標逆算ツールの特徴と活用法</span>
          </h2>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-slate-600 text-sm leading-relaxed">
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200/70">
              <h3 className="font-bold text-slate-800 text-base mb-2">
                当月の実日数・カレンダー完全連動
              </h3>
              <p>
                「月28日固定（4週換算）」ではなく、選択した年月の実際の暦・土日祝の配置に基づいて出勤日数を自動集計。月ごとの正確な見込み給与を算出できます。
              </p>
            </div>

            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200/70">
              <h3 className="font-bold text-slate-800 text-base mb-2">
                目標月収からの必要時間・日数逆算
              </h3>
              <p>
                「今月は10万円稼ぎたい」といった目標額を設定するだけで、現在のシフトでの不足金額や、達成に必要な残り労働時間・出勤日数を瞬時に逆算します。
              </p>
            </div>

            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200/70">
              <h3 className="font-bold text-slate-800 text-base mb-2">
                年収の壁（扶養控除・社保）の可視化
              </h3>
              <p>
                見込み月収から年間換算額を算出し、103万・106万・130万・150万円の各扶養枠までの残額をプログレスバーで分かりやすく表示します。
              </p>
            </div>
          </div>
        </div>

        {/* 使い方ガイド */}
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 pb-3 border-b border-slate-100">
            使い方ステップガイド（簡単3ステップ）
          </h2>
          <div className="mt-6 space-y-4">
            <div className="flex items-start space-x-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center flex-shrink-0 text-sm">
                1
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-base">基本条件（時給・目標額・交通費）を入力</h3>
                <p className="text-sm text-slate-600 mt-1">
                  基本時給、希望する目標月収、交通費の支給方式（日額または月額）を設定します。計算対象の年月も自由に切り替え可能です。
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center flex-shrink-0 text-sm">
                2
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-base">基本シフト（曜日パターン）を設定</h3>
                <p className="text-sm text-slate-600 mt-1">
                  月曜日〜日曜日ごとの標準的な勤務時間と休憩時間をセットします。プリセットボタンを使えばワンタップで設定できます。
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center flex-shrink-0 text-sm">
                3
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-base">カレンダーで特定の日程を微調整</h3>
                <p className="text-sm text-slate-600 mt-1">
                  「この日は休み」「この日は残業で2時間追加」など、特定の日付をタップして微調整。リアルタイムで見込み月収と逆算結果が自動更新されます。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* よくある質問（FAQ）アコーディオンカード */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="flex items-center space-x-2 pb-4 mb-2 border-b border-slate-100">
          <HelpCircle className="w-5 h-5 text-emerald-600" />
          <h2 className="text-lg sm:text-xl font-bold text-slate-800">
            よくある質問（FAQ）
          </h2>
        </div>

        <div className="divide-y divide-slate-100">
          {FAQ_ITEMS.map((item, idx) => (
            <details
              key={idx}
              className="group py-4 first:pt-2 last:pb-2"
            >
              <summary className="flex items-center justify-between cursor-pointer list-none font-bold text-slate-800 hover:text-emerald-600 text-sm sm:text-base gap-3 select-none [&::-webkit-details-marker]:hidden">
                <div className="flex items-start space-x-2.5">
                  <span className="text-emerald-600 font-extrabold flex-shrink-0 text-base">Q.</span>
                  <span>{item.question}</span>
                </div>
                <ChevronDown className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform duration-200 flex-shrink-0" />
              </summary>
              <div className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed pl-6 pr-2">
                <p>{item.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
};
