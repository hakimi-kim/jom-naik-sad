<script lang="ts">
  import { Switch as SwitchPrimitive } from "bits-ui";
  import { cn, type WithoutChildrenOrChild } from "$lib/utils.js";

  let {
    ref = $bindable(null),
    class: className,
    checked = $bindable(false),
    size = "default",
    ...restProps
  }: WithoutChildrenOrChild<SwitchPrimitive.RootProps> & {
    size?: "sm" | "default";
  } = $props();
</script>

<SwitchPrimitive.Root
  bind:ref
  bind:checked
  data-slot="switch"
  data-size={size}
  class={cn(
    "data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
    "focus-visible:border-ring focus-visible:ring-ring/50",
    "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
    "aria-invalid:border-destructive dark:aria-invalid:border-destructive/50",
    "dark:data-[state=unchecked]:bg-input/80",
    "shrink-0 rounded-full border border-transparent shadow-xs",
    "focus-visible:ring-3 aria-invalid:ring-3",
    "data-[size=default]:h-[22px] data-[size=default]:w-[40px]",
    "data-[size=sm]:h-[16px] data-[size=sm]:w-[28px]",
    "peer group/switch relative inline-flex items-center transition-all outline-none",
    "after:absolute after:-inset-x-3 after:-inset-y-2",
    "data-disabled:cursor-not-allowed data-disabled:opacity-50",
    className
  )}
  {...restProps}
>
  <SwitchPrimitive.Thumb
    data-slot="switch-thumb"
    class={cn(
      "bg-background pointer-events-none block rounded-full ring-0 transition-transform",
      "dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground",
      "group-data-[size=default]/switch:size-[18px]",
      "group-data-[size=sm]/switch:size-[12px]",
      "data-[state=checked]:translate-x-[calc(100%-1px)]",
      "data-[state=unchecked]:translate-x-[1px]",
      "rtl:data-[state=checked]:translate-x-[calc(-100%+1px)]"
    )}
  />
</SwitchPrimitive.Root>