let dances = ['https://dance.djurredeboer.nl/workshop/latin/cha_cha.html', 'https://dance.djurredeboer.nl/workshop/latin/samba.html', 'https://dance.djurredeboer.nl/workshop/latin/rumba.html', 'https://dance.djurredeboer.nl/workshop/latin/paso.html', 'https://dance.djurredeboer.nl/workshop/latin/jive.html', 'https://dance.djurredeboer.nl/workshop/latin/technique.html', 'https://dance.djurredeboer.nl/workshop/standard/waltz.html', 'https://dance.djurredeboer.nl/workshop/standard/tango.html', 'https://dance.djurredeboer.nl/workshop/standard/viennese.html', 'https://dance.djurredeboer.nl/workshop/standard/foxtrot.html', 'https://dance.djurredeboer.nl/workshop/standard/quickstep.html', ]

let danceResults = {}
for (let dance of dances) {
    console.info(dance)
    $.ajax({
        url: dance,
        success: function(danceData) {
            let $danceContent = $(danceData)
            let list = $danceContent.find('.is-post a:not(.auto-style4)');
            let result = {}
            list.each((i,e)=>{
                let $e = $(e)
                
                let base = dance.split("/")
                base.pop()
                let url = base.join("/") + "/" + $e.attr('href')
                console.log(url)
                $.ajax({
                    url: url,
                    success: function(data) {
                        let $content = $(data)
                        result[url] = $content.find('.is-post').html()
                    },
                    async: false
                });

            }
            )
            danceResults[dance] = result
        },
        async: false
    });

}

copy(danceResults)
console.log("done")
