<?php

error_reporting(E_ALL);
ini_set('display_errors', true);
ini_set('memory_limit', '-1');
header("Content-Type: text/html; charset=utf-8");

require "../../vendor/autoload.php";

use Facebook\InstantArticles\Elements\InstantArticle;
use Facebook\InstantArticles\Transformer\Transformer;
use Facebook\InstantArticles\Client\Client;

// Instantiate an emptyInstant Article
$instant_article = InstantArticle::create();

// Load the rules content file
$rules = file_get_contents("transformer-rules.json", true);

// Create the transformer and loads the rules
$transformer = new Transformer();
$transformer->loadRules($rules);

// Load a full post in HTML form
$post_html = file_get_contents("full_post.html", true);

// Parse HTML into a DOM structure (ignore errors during parsing)
libxml_use_internal_errors(true);
$document = new \DOMDocument();
$document->loadHTML($post_html);
libxml_use_internal_errors(false);

// Invoke transformer on the DOM structure
$transformer->transform($instant_article, $document);

// Get errors from transformer
$warnings = $transformer->getWarnings();

// Instantiate an API client


// Push the article
try {

  $client = Client::create(
    'APP_ID',
    'APP_SECRET',
    'ACCESS_TOKEN',
    'PAGE_ID'
  );

  $client->importArticle($instant_article, false);
} catch (Exception $e) {
  echo 'Could not import the article: '.$e->getMessage();
}

