<?php

include __DIR__ . "/vendor/autoload.php";
use League\HTMLToMarkdown\HtmlConverter;
use League\HTMLToMarkdown\Converter\TableConverter;


$converter = new HtmlConverter();
$converter->getEnvironment()->addConverter(new TableConverter());

$json = json_decode(file_get_contents(__DIR__ . '/source.json'), true);

foreach($json as $dance => $pages) {
    foreach($pages as $page => $content){
        $path = str_replace("https://dance.djurredeboer.nl/workshop/", "", $page);
        var_dump($path);

        if(!is_dir(dirname($path))){
            mkdir(dirname($path),0777, true);
        }

        $path = str_replace('.html', '.md', $path);
        

        $markdown = $converter->convert($content);

        $markdown = str_replace('.html', '.md', $markdown);

        file_put_contents(__DIR__ . '/../'. $path, $markdown);

    }

}
