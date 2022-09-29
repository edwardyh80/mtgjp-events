import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  ja: {
    translation: {
      Address: "住所",
      Aichi: "愛知県",
      Akita: "秋田県",
      Aomori: "青森県",
      Apply: "適用",
      "Booster Draft": "ブースタードラフト",
      Brawl: "ブロール(Brawl)",
      Cancel: "戻る",
      Chiba: "千葉県",
      Chubu: "中部",
      Chugoku: "中国",
      Commander: "統率者戦",
      Ehime: "愛媛県",
      "Event count": "イベント数",
      Filter: "絞り込み",
      Format: "フォーマット",
      Fukui: "福井県",
      Fukuoka: "福岡県",
      Fukushima: "福島県",
      "Game Day": "ゲームデー",
      Gifu: "岐阜県",
      Gunma: "群馬県",
      Hiroshima: "広島県",
      Hokkaido: "北海道",
      Hyogo: "兵庫県",
      Ibaraki: "茨城県",
      Ishikawa: "石川県",
      Iwate: "岩手県",
      Kagawa: "香川県",
      Kagoshima: "鹿児島県",
      Kanagawa: "神奈川県",
      Kansai: "近畿",
      Kanto: "関東",
      Kochi: "高知県",
      Kumamoto: "熊本県",
      Kyoto: "京都府",
      Kyushu: "九州",
      "Last updated": "最終更新日時",
      Legacy: "レガシー",
      "MTG-JP Event Calendar": "MTGイベントカレンダー",
      Mie: "三重県",
      Miyagi: "宮城県",
      Miyazaki: "宮崎県",
      Modern: "モダン",
      "More info": "詳細",
      Nagano: "長野県",
      Nagasaki: "長崎県",
      Nara: "奈良県",
      Niigata: "新潟県",
      Oita: "大分県",
      Okayama: "岡山県",
      Okinawa: "沖縄県",
      Osaka: "大阪府",
      PWCS: "PWCS",
      Phone: "電話番号",
      Pioneer: "パイオニア",
      Prefecture: "開催地",
      Saga: "佐賀県",
      Saitama: "埼玉県",
      Sealed: "シールド",
      Shiga: "滋賀県",
      Shikoku: "四国",
      Shimane: "島根県",
      Shizuoka: "静岡県",
      Standard: "スタンダード",
      "Store Championship": "ストアチャンピオンシップ",
      Time: "日程",
      Tochigi: "栃木県",
      Tohoku: "東北",
      Tokushima: "徳島県",
      Tokyo: "東京都",
      Tottori: "鳥取県",
      Toyama: "富山県",
      Vintage: "ヴィンテージ",
      Wakayama: "和歌山県",
      Yamagata: "山形県",
      Yamaguchi: "山口県",
      Yamanashi: "山梨県",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "ja",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;