<script>
  import Icon from "./Icon.svelte";
  import {
    getCodeIssuesDescriptions,
    getCodeSummary,
    getHtmlIssuesDescriptions
  } from "../utils/utils.js";
  export let value = {};

  $: codeSummary = getCodeSummary(value);
</script>

<div class="grid grid-cols-4">
  {#if codeSummary.cloc}
    <div class="text-center whitespace-no-wrap mx-auto">
      <Icon classnames="block mx-auto">
        <path
          d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414
          4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0
          002 2h8a2 2 0 002-2v-2" />
      </Icon>
      <span class="font-bold block text-sm" title="Number of files">
        {codeSummary.totalFiles}
      </span>
    </div>
    <div class="text-center whitespace-no-wrap mx-auto">
      <Icon classnames="block mx-auto">
        <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </Icon>
      <span class="font-bold block text-sm" title="Number of lines of codes">
        {codeSummary.totalLines}
      </span>
    </div>
  {/if}

  {#if codeSummary.html || codeSummary.code}
    <div class="text-center whitespace-no-wrap mx-auto">
      <Icon cssClass="text-red-500 block mx-auto">
        <path d="M6 18L18 6M6 6l12 12" />
      </Icon>
      <span
        class="font-bold block mx-auto text-sm"
        title={(codeSummary.codeIssueList || '') + '\n\n\n' + (codeSummary.htmlIssueList || '')}>
        {(codeSummary.htmlErrors || 0) + (codeSummary.codeErrors || 0)}
      </span>
    </div>
    <div class="text-center whitespace-no-wrap mx-auto">
      <Icon cssClass="text-orange-500 block mx-auto">
        <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </Icon>
      <span
        class="font-bold block mx-auto text-sm"
        title={(codeSummary.codeIssueList || '') + '\n\n\n' + (codeSummary.htmlIssueList || '')}>
        {(codeSummary.htmlWarnings || 0) + (codeSummary.codeWarnings || 0)}
      </span>
    </div>
  {/if}

</div>
