<script lang="ts">
    import { auth } from "@/stores"

    const { user } = auth
</script>

<h1>Profile page</h1>
<pre>{JSON.stringify($user, null, 4)}</pre>
<div>{$user ? "Authorized" : "Unauthorized"}</div>
