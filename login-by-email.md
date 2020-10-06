---
layout: empty
---


<script>
const SERVER_ORIGIN = `http://localhost:4999`

fetch(`${SERVER_ORIGIN}/login-by-email?email=dav@bru.com`, {method: 'POST'})
.then(res => res.text())
.then(res => console.log('fetch email', res))
.catch(res => console.error('error fetch email', res))

</script>