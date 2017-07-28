<?php

// Generate HTML snippets that list topics from various external sites.

// We want to advertise external resources and give an overview of recent topics.
// We don't want users to use these snippets as main entry point to external sites
// or provide deep links (that would be quite a link list, plus we do not want to
// link to "Re: Re: Re: a question" mailinglist postings).
// So this really just lists topics, not links.

function getHtml($url) {
  $ch = curl_init();
  curl_setopt($ch, CURLOPT_URL, $url);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
  curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
  curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
  curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
  $result = curl_exec($ch);
  $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
  curl_close($ch);
  if($code!=200) {
    echo("failed to fetch $url (HTTP error $code)");
    exit(1);
  }
  return $result;
}

if(in_array("fflist", $argv)) {
  // FF Berlin mailinglist

  $listArchiveUrl = "https://lists.berlin.freifunk.net/pipermail/berlin/";
  // Find newest archive page
  $listHtml = getHtml($listArchiveUrl);
  preg_match("/Herunterladbare Version.*?<A href=\"(.*?)\"/s", $listHtml, $matches);
  $listNewestUrl = $listArchiveUrl.str_replace("thread", "date", $matches[1]);
  //echo $listNewestUrl;

  // Find postings
  $listHtml = getHtml($listNewestUrl);
  preg_match_all("/<A HREF=\"(\d\d\d\d\d\d.html)\">\[Berlin-wireless\] (.*?)<\/A>/s", $listHtml, $matches);
  //print_r($matches[2]);

  // Create topic list
  $topicList = "";
  foreach(array_reverse($matches[2]) as $match) {
    if(strpos($match, "Berlin Nachrichtensammlung")===0) continue;
    $match = trim($match);
    if(strpos($topicList, substr($match, 0, 10))===FALSE) {
      if(strlen($topicList)>300) break;
      if(strlen($topicList)>0) $topicList .= "&nbsp;• ";
      $topicList .= str_replace("<", "&lt;", $match);
    }
  }
  echo $topicList;
}

if(in_array("ffwiki", $argv)) {
  // wiki.freifunk.net

  $wikiRecentUrl = "https://wiki.freifunk.net/index.php?title=Spezial:Letzte_%C3%84nderungen&days=30&from=&limit=500";
  // Find recent changes of "Berlin:" pages
  $wikiHtml = getHtml($wikiRecentUrl);
  //<a href="/Berlin:Firmware" title="Berlin:Firmware" class="mw-changeslist-title">Berlin:Firmware</a>
  preg_match_all("/<a href=\"(\/Berlin:.*?)\".*?>(.*?)<\/a>/", $wikiHtml, $matches);
  //print_r($matches[2]);

  // Create wiki topic list
  $topicList = "";
  foreach($matches[2] as $match) {
    if(strlen($match)<5) continue;
    $match = trim($match);
    if(strpos($topicList, $match)===FALSE) {
      if(strlen($topicList)>300) break;
      if(strlen($topicList)>0) $topicList .= "&nbsp;• ";
      $topicList .= str_replace("<", "&lt;", $match);
    }
  }
  echo $topicList;
}

?>
