import type { Strings } from "./strings";
import { en } from "./en";

export const ko: Strings = {
  ...en,
  title: "PragmaLogixAI", subtitle: "생활 결정 OS",
  uploadSignal: "생활 신호 업로드", uploadHelp: "음성 메모, 청구서 또는 일일 체크리스트 제출",
  ingestSignalHeader: "생활 신호 수집 및 처리", ingestionLogs: "수집 처리 로그",
  ingestSummary: "생활 신호 처리 완료", extractedNodes: "추출된 노드:", extractedEdges: "추출된 엣지:", extractedEvents: "추출된 이벤트:",
  tomorrowPlan: "일일 에너지 및 집중 여정", frictionBudget: "재정 및 주의력 예산 여정", logisticsRadar: "환경 및 루틴 레이더",
  generatePlan: "플랜 생성", activeSubscriptions: "활성 구독", hourlySchedule: "시간별 일정",
  frictionActions: "마찰 감소 조치", lifeDiffs: "생활 차이점", lintWarnings: "플랜 검사", profileLabel: "프로필 선택",
  profiles: { student: "어린이 / 학생", adult: "직장 전문가", senior: "노인 / 은퇴자" },
  nav: { dashboard: "대시보드", features: "기능", about: "아키텍처", faq: "FAQ", help: "사용자 가이드", settings: "설정" },
  workspace: "워크스페이스", activeProfile: "활성 프로필", decisionOS: "결정 OS:", meshState: "네트워크 상태:", online: "온라인",
  agentMeshPipeline: "에이전트 메시 파이프라인", systemDashboard: "시스템 대시보드", journeyPlanOutcome: "여정 플랜 및 결과",
  decisionTemplates: "결정 템플릿", templatesDesc: "에이전트 결과를 합성하기 위한 생활 결정 템플릿을 선택하세요.",
  generatedFor: "다음을 위해 생성됨", awaitingSignal: "생활 신호 대기 중", awaitingDesc: "프로필을 설정하고 생활 신호를 업로드한 후 플랜 생성을 클릭하세요.",
  runningPipeline: "에이전트 메시 처리 중...", generateFirst: "파이프라인을 시작하려면 플랜 생성으로 이동하세요.",
  notebookSummary: "NotebookLM 팟캐스트 대화", loadingDialogue: "대화 스크립트 생성 중...",
  dashboardTitle: "시스템 대시보드", cognitiveClarity: "인지 명확성 지수", dailyEnergy: "일일 에너지 점수",
  financialLeaks: "감사된 재무 유출", routineFriction: "루틴 물류 마찰",
  activeKnowledgeGraph: "활성 지식 그래프", tacticalNodes: "전술적 엔티티 (노드)", monitoredEdges: "모니터링 관계 (엣지)",
  graphRAGLatency: "GraphRAG 지연", recentDecisionLog: "최근 결정 로그",
  confusingYou: "지금 무엇이 혼란스럽습니까?", selectTemplate: "계획 시뮬레이션을 실행하기 위한 템플릿을 선택하세요:",
  tpl1: "오후에 업무 피로가 있습니다. 심층 작업을 최적화하세요.", tpl2: "월간 구독 마찰을 감사하고 화면 시간 누수를 확인하세요.", tpl3: "가정 물류를 확인하고 정기 필터 수리를 예약하세요.",
};
