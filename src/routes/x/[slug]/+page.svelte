<script lang="ts">
    const { data } = $props();

    const creationDate = formatDate(data.createdAt ?? 0); // do ?? 0 because why the fuck could it be undefined so just fuck it and remove editor error

    const formatedText = convertUrlsToAnchors(data.content);

    function escapeHtml(text: string) {
        const map: { [key: string]: string } = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;",
        };
        return text.replace(/[&<>"']/g, (m) => map[m]);
    }

    function formatDate(d: number) {
        const date = new Date(d);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();

        return `${day}.${month}.${year}`;
    }

    function convertUrlsToAnchors(text: string) {
        const escapedText = escapeHtml(text);
        const urlRegex =
            /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
        return escapedText.replace(
            urlRegex,
            (url) =>
                `<a href="${url}" class="text-blue-300" target="_blank" rel="noopener noreferrer nofollow">${url}</a>`,
        );
    }
</script>

<svelte:head>
    <meta name="robots" content="noindex" />
</svelte:head>

{#if data.success}
    <div class=" pl-2 pt-2 text-blue-200">
        [views: {data.viewCount}] [created: {creationDate}]
    </div>

    <div class="p-2 whitespace-pre overflow-scroll">
        {@html formatedText}
    </div>
{:else}
    <div class=" flex w-screen items-center justify-center mt-20">
        <div class="flex flex-col">
            <span class="text-red-400 text-xl text-center">
                {data.content}
            </span>
            <a class=" text-blue-300 text-xl" href="/"
                >[create new post instead?]</a
            >
        </div>
    </div>
{/if}
