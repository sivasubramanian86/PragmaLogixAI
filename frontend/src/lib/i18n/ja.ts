import type { Strings } from "./strings";
import { en } from "./en";

export const ja: Strings = {
  ...en,
  title: "PragmaLogixAI", subtitle: "人生決断OS",
  uploadSignal: "ライフシグナルをアップロード", uploadHelp: "音声メモ、請求書、またはチェックリストを送信",
  ingestSignalHeader: "ライフシグナルを取り込んで処理", ingestionLogs: "取り込みログ",
  ingestSummary: "ライフシグナル処理完了", extractedNodes: "抽出ノード:", extractedEdges: "抽出エッジ:", extractedEvents: "抽出イベント:",
  tomorrowPlan: "日々のエネルギーとフォーカスジャーニー", frictionBudget: "財務と注意力予算ジャーニー", logisticsRadar: "環境とルーティンレーダー",
  generatePlan: "プランを生成", activeSubscriptions: "アクティブサブスク", hourlySchedule: "時間割",
  frictionActions: "摩擦低減アクション", lifeDiffs: "ライフ差分", lintWarnings: "プランチェック", profileLabel: "プロフィールを選択",
  profiles: { student: "子供 / 学生", adult: "働くプロフェッショナル", senior: "シニア / 退職者" },
  nav: { dashboard: "ダッシュボード", features: "機能", about: "アーキテクチャ", faq: "よくある質問", help: "ユーザーガイド", settings: "設定" },
  workspace: "ワークスペース", activeProfile: "アクティブプロファイル", decisionOS: "決断OS:", meshState: "ネットワーク状態:", online: "オンライン",
  agentMeshPipeline: "エージェントメッシュパイプライン", systemDashboard: "システムダッシュボード", journeyPlanOutcome: "ジャーニープランと結果",
  decisionTemplates: "決断テンプレート", templatesDesc: "エージェントの結果を合成するためのライフ決断テンプレートを選択してください。",
  generatedFor: "生成対象", awaitingSignal: "ライフシグナル待機中", awaitingDesc: "プロフィールを設定し、ライフシグナルをアップロードして、プランを生成をクリックしてください。",
  runningPipeline: "エージェントメッシュ処理中...", generateFirst: "パイプラインを開始するにはプランを生成に移動してください。",
  notebookSummary: "NotebookLMポッドキャストダイアログ", loadingDialogue: "ダイアログスクリプトを生成中...",
  dashboardTitle: "システムダッシュボード", cognitiveClarity: "認知明晰度指数", dailyEnergy: "日々のエネルギースコア",
  financialLeaks: "監査済み財務漏れ", routineFriction: "ルーティンロジスティクス摩擦",
  activeKnowledgeGraph: "アクティブ知識グラフ", tacticalNodes: "戦術的エンティティ（ノード）", monitoredEdges: "監視関係（エッジ）",
  graphRAGLatency: "GraphRAGレイテンシ", recentDecisionLog: "最近の決断ログ",
  confusingYou: "今、何があなたを混乱させていますか？", selectTemplate: "プランニングシミュレーションを実行するためのテンプレートを選択してください：",
  tpl1: "午後に仕事の疲労があります。深い仕事を最適化してください。", tpl2: "月次サブスクリプションの摩擦を監査し、スクリーンタイムの漏れを確認する。", tpl3: "ホームロジスティクスを確認し、定期的なフィルター修理をスケジュールする。",
};
