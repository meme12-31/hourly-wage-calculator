import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import portalBanner from '@/public/portal-banner.png';
import { RELATED_TOOLS, MAIN_SITE_URL } from '@/lib/constants';
import {
  ExternalLink,
  ShieldCheck,
  HeartHandshake,
  Utensils,
  Calculator,
  CloudSun,
  ClipboardCheck,
} from 'lucide-react';

const getToolIcon = (url: string) => {
  if (url.includes('recipe')) return <Utensils className="w-5 h-5 text-emerald-400" />;
  if (url.includes('calcnote')) return <Calculator className="w-5 h-5 text-emerald-400" />;
  if (url.includes('fashion') || url.includes('weather')) return <CloudSun className="w-5 h-5 text-emerald-400" />;
  if (url.includes('checklist') || url.includes('travel')) return <ClipboardCheck className="w-5 h-5 text-emerald-400" />;
  return <ExternalLink className="w-5 h-5 text-emerald-400" />;
};

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-16 border-t border-slate-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 関連ツールセクション */}
        <div className="mb-12">
          <div className="flex items-center space-x-2 mb-4">
            <HeartHandshake className="w-5 h-5 text-emerald-400" />
            <h2 className="text-base font-bold text-white tracking-wide">
              おすすめ関連ツール（無料・登録不要）
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {RELATED_TOOLS.map((tool) => (
              <a
                key={tool.url}
                href={tool.url}
                className="flex items-start p-4 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 hover:border-emerald-500/50 transition group"
              >
                {/* アイコン枠 */}
                <div className="w-11 h-11 rounded-lg bg-slate-700/60 border border-slate-600/50 flex items-center justify-center flex-shrink-0 mr-3.5 group-hover:bg-slate-700 group-hover:border-emerald-500/40 transition">
                  {getToolIcon(tool.url)}
                </div>

                {/* テキスト群 */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between text-white font-medium text-sm mb-1 group-hover:text-emerald-400 transition">
                    <span className="truncate pr-1">{tool.title}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-400 transition flex-shrink-0" />
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {tool.description}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* サイトナビ & 免責事項 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8 border-t border-slate-800 text-xs sm:text-sm">
          <div>
            <h3 className="text-white font-semibold mb-2">時給計算・目標逆算ツールについて</h3>
            <p className="text-slate-400 leading-relaxed text-xs">
              当ツールは、アルバイト・パート・副業で働く方の給与シミュレーションおよび目標月収逆算を支援する完全無料Webアプリケーションです。すべての計算処理はブラウザ上で完結し、個人情報がサーバーに送信されることはありません。
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-2">サイト案内</h3>
            <ul className="space-y-2 text-xs">
              <li>
                <a href={MAIN_SITE_URL} className="text-slate-400 hover:text-white transition">
                  HITtools トップページ
                </a>
              </li>
              <li>
                <Link href="/" className="text-slate-400 hover:text-white transition">
                  時給計算・目標逆算ツール
                </Link>
              </li>
              <li>
                <Link href="/column" className="text-slate-400 hover:text-white transition">
                  給与・時給・扶養お役立ちコラム一覧
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <div className="flex items-center space-x-1.5 text-white font-semibold mb-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>免責事項</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs">
              当シミュレーションの計算結果は各種法令・標準計算式に基づく概算であり、実際の支給額・手取り額・税金等を保証するものではありません。雇用契約条件や会社規定、端数処理方式により異なる場合があります。
            </p>
          </div>
        </div>

        {/* 規約・運営情報リンク & コピーライト */}
        <div className="pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
          {/* ポータルバナー */}
          <div className="flex justify-center mb-6">
            <Link
              href="https://hit-tool.com"
              className="inline-flex items-center justify-center bg-white p-2.5 sm:p-3 rounded-xl shadow-sm hover:opacity-90 transition-opacity"
              title="HITtools トップページへ"
            >
              <Image
                src={portalBanner}
                alt="HITtools ポータルサイト"
                className="w-auto h-auto max-w-[200px] sm:max-w-[240px]"
              />
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mb-4">
            <a
              href="https://hit-tool.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-slate-200 transition"
            >
              プライバシーポリシー
            </a>
            <a
              href="https://hit-tool.com/about"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-slate-200 transition"
            >
              運営者情報
            </a>
            <a
              href="https://hit-tool.com/contact"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-slate-200 transition"
            >
              お問い合わせ
            </a>
          </div>
          <p>© {new Date().getFullYear()} HITtools (hit-tool.com) - All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};
