<home>
    <h1>Multiple Attributes</h1>
    <label for="teste"></label>
    <input ref="teste" id="teste">

    <script>
        var tag = this;
        tag.on('mount', function () {
            for (var key in tag.opts.attrs) {
                tag.refs.teste.setAttribute(key, tag.opts.attrs[key]);
            }            
        });
    </script>
</home>