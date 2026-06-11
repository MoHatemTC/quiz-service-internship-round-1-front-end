export type IntegritySeverity = 'info' | 'warning' | 'danger';

export type IntegrityRule = {
  id: string;
  icon: string;
  text: string;
  severity: IntegritySeverity;
};

export type IntegrityEventType =
  | 'tab_hidden'
  | 'tab_visible'
  | 'fullscreen_exit'
  | 'copy_attempt'
  | 'paste_attempt'
  | 'context_menu'
  | 'page_unload'
  | 'rapid_answer';

export type IntegrityEvent = {
  type: IntegrityEventType;
  attemptId: string;
  occurredAt: string;
  metadata?: Record<string, unknown>;
};

export const INTEGRITY_RULES: IntegrityRule[] = [
  {
    id: 'no-refresh',
    icon: '🔄',
    text: 'Do not refresh or close this page. Your progress is saved automatically.',
    severity: 'warning',
  },
  {
    id: 'no-tab-switch',
    icon: '🪟',
    text: 'Do not switch tabs or windows. Tab switching is recorded against your attempt.',
    severity: 'warning',
  },
  {
    id: 'no-external-help',
    icon: '👤',
    text: 'No external help. This is an individual assessment.',
    severity: 'warning',
  },
  {
    id: 'timer-starts',
    icon: '⏱',
    text: 'The timer starts as soon as you click Start and cannot be paused.',
    severity: 'info',
  },
  {
    id: 'no-retake',
    icon: '🔒',
    text: 'You cannot retake the quiz once submitted.',
    severity: 'info',
  },
];

export function logIntegrityEvent(event: IntegrityEvent): void {
  if (typeof window === 'undefined') return;
  console.info('[integrity]', event.type, event);
}
