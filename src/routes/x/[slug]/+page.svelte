<script lang="ts">
    const { data } = $props();

    const formatedText = convertUrlsToAnchors(data.content);

    function escapeHtml(text: string) {
        const map: { [key: string]: string } = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, (m) => map[m]);
    }

    function convertUrlsToAnchors(text: string) {
        const escapedText = escapeHtml(text);
        const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
        return escapedText.replace(urlRegex, (url) => `<a href="${url}" class="text-blue-300" target="_blank" rel="noopener noreferrer">${url}</a>`);
    }
</script>

<div class="p-2 whitespace-pre">
  {@html formatedText}
</div>
