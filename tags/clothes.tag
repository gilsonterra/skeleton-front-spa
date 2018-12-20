<clothes>
    <div class="container">
        <h1>CLOTHES</h1>

        <header class="navbar">
            <section class="navbar-section">
                <a each="{ o in options }" class="btn btn-link { 'text-success': o.selected }" href="#clothes/{ o.href }">{
                    o.href }</a>
            </section>
        </header>

        <div class="columns">
            <div class="card column col-3 col-sm-6 col-md-4 col-xs-12" if="{ items.length > 0 }" each="{ i in items }">
                <div class="card-header">
                    <div class="card-title h5">{ i.title }</div>
                    <div class="card-subtitle text-gray">R$ { i.price }</div>
                </div>
                <div class="card-image">
                    <img src="{ i.image }" class="img-responsive" title="{ i.description }">
                </div>
            </div>
        </div>
    </div>
    <script>
        var tag = this;
        tag.items = opts.items || [];
        tag.options = [
            { href: 'ladies_outerwear', selected: false },
            { href: 'ladies_tshirts', selected: false },
            { href: 'mens_outerwear', selected: false },
            { href: 'mens_tshirts', selected: false },
        ];

        tag.on('mount', function () {
            var optionsSelected = tag.options.map(function (o) {
                if (opts.uri == o.href) {
                    o.selected = true;
                }

                return o;
            });

            tag.update({ 'options': optionsSelected });
        });
    </script>
</clothes>