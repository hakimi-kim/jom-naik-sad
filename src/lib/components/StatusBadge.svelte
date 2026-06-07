<script lang="ts">
  import type { RideStatus } from '$lib/data/mockData';

  let { status }: { status: RideStatus } = $props();

  const styles: Record<RideStatus, string> = {
    OPEN:        'bg-primary-soft text-primary',
    MATCHED:     'bg-secondary-soft text-secondary',
    IN_PROGRESS: 'bg-warning-soft text-warning',
    COMPLETED:   'bg-success-soft text-success',
    PENDING:     'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    REJECTED:    'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  };

  const labels: Record<RideStatus, string> = {
    OPEN:        'Open',
    MATCHED:     'Matched',
    IN_PROGRESS: 'In Progress',
    COMPLETED:   'Completed',
    PENDING:     'Pending',
    REJECTED:    'Rejected',
  };
</script>

<span class="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold {styles[status]}">
  <span
    class="h-1.5 w-1.5 rounded-full bg-current"
    class:animate-pulse-soft={status === 'IN_PROGRESS' || status === 'PENDING'}
  ></span>
  {labels[status]}
</span>