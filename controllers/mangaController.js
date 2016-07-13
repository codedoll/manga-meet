var express = require('express');
var router = express.Router(),
	session = require('express-session'),
	shuffle = require('shuffle-array');

var Manga = require('../models/manga_model.js');
var UserManga = require('../models/userManga_model.js')

// MANGA GET ROUTE to INDEX.HTML
// Depends on what users own
router.get('/forrent', function(req, res) {
    {
        price: {
            UserManga.find({
                "username": { '$ne': req.session.username },
                 "userRenting": { '$ne': req.session.username }
            }, function(err, manga) {
                // shuffle(manga)
                res.send(manga);
            });
        }
    }
})


// end manga route


var mangaInfo = [
{"id":1,"title_romaji":"Monster","type":"Manga","adult":false,"popularity":1265,"title_japanese":"モンスター","title_english":"Monster","synonyms":[],"image_url_lge":"http://anilist.co/img/dir/manga/reg/1.jpg","image_url_med":"http://anilist.co/img/dir/manga/med/1.jpg","publishing_status":"finished","average_score":"84.8","total_chapters":162,"total_volumes":18,"relation_type":null,"role":null},
{"id":2,"title_romaji":"Berserk","type":"Manga","adult":false,"popularity":2691,"title_japanese":"ベルセルク","title_english":"Berserk","synonyms":[],"image_url_lge":"http://anilist.co/img/dir/manga/reg/2-EpAB47R1L1Hh.jpg","image_url_med":"http://anilist.co/img/dir/manga/med/2-EpAB47R1L1Hh.jpg","publishing_status":"publishing","average_score":"88.7","total_chapters":0,"total_volumes":0,"relation_type":null,"role":null},
{"id":3,"title_romaji":"20th Century Boys","type":"Manga","adult":false,"popularity":1606,"title_japanese":"20世紀少年","title_english":"20th Century Boys","synonyms":["20 Seiki Shounen","Nijuu Seiki Shounen","Nijuusseiki Shounen","20thCB"],"image_url_lge":"http://anilist.co/img/dir/manga/reg/3-gmYZVYVvAzKI.jpg","image_url_med":"http://anilist.co/img/dir/manga/med/3-gmYZVYVvAzKI.jpg","publishing_status":"finished","average_score":"85.5","total_chapters":249,"total_volumes":22,"relation_type":null,"role":null},
{"id":4,"title_romaji":"Yokohama Kaidashi Kikou","type":"Manga","adult":false,"popularity":887,"title_japanese":"ヨコハマ買い出し紀","title_english":"Yokohama Kaidashi Kikou","synonyms":["Yokohama Shopping Log","Yokohama Shopping Trip","Touge","Quiet Country Cafe"],"image_url_lge":"http://anilist.co/img/dir/manga/reg/4.jpg","image_url_med":"http://anilist.co/img/dir/manga/med/4.jpg","publishing_status":"finished","average_score":"78.4","total_chapters":142,"total_volumes":14,"relation_type":null,"role":null},
{"id":7,"title_romaji":"Hajime no Ippo","type":"Manga","adult":false,"popularity":654,"title_japanese":"はじめの一歩","title_english":"Hajime no Ippo","synonyms":["The Fighting!","Fighting Spirit","The Fighting! Ippo","Hajime no Ippo Gaiden: Naniwa Tiger"],"image_url_lge":"http://anilist.co/img/dir/manga/reg/7.jpg","image_url_med":"http://anilist.co/img/dir/manga/med/7.jpg","publishing_status":"publishing","average_score":"77.1","total_chapters":0,"total_volumes":0,"relation_type":null,"role":null},
{"id":8,"title_romaji":"Full Moon wo Sagashite","type":"Manga","adult":false,"popularity":500,"title_japanese":"満月をさがして","title_english":"Full Moon wo Sagashite","synonyms":["Full Moon o Sagashite","Searching for the Full Moon","Ginyuu Meika"],"image_url_lge":"http://anilist.co/img/dir/manga/reg/8-3Z2gmgoKhN6L.png","image_url_med":"http://anilist.co/img/dir/manga/med/8-3Z2gmgoKhN6L.png","publishing_status":"finished","average_score":"71.9","total_chapters":30,"total_volumes":7,"relation_type":null,"role":null},
{"id":9,"title_romaji":"Tsubasa: RESERVoir CHRoNiCLE","type":"Manga","adult":false,"popularity":1225,"title_japanese":"ツバサ -RESERVoir CHRoNiCLE-","title_english":"Tsubasa RESERVoir CHRoNiCLE","synonyms":["TRC"],"image_url_lge":"http://anilist.co/img/dir/manga/reg/9-IayNt8GY5lSF.jpg","image_url_med":"http://anilist.co/img/dir/manga/med/9-IayNt8GY5lSF.jpg","publishing_status":"finished","average_score":"78.1","total_chapters":233,"total_volumes":28,"relation_type":null,"role":null},
{"id":10,"title_romaji":"xxxHOLiC","type":"Manga","adult":false,"popularity":1048,"title_japanese":"xxxHolic•籠","title_english":"xxxHOLiC","synonyms":["xxxHolic Rou","xxxHolic Cage","xxxHolic•Rou","Holic"],"image_url_lge":"http://anilist.co/img/dir/manga/reg/10-ndBdEltnz5AX.jpg","image_url_med":"http://anilist.co/img/dir/manga/med/10-ndBdEltnz5AX.jpg","publishing_status":"finished","average_score":"77.2","total_chapters":213,"total_volumes":19,"relation_type":null,"role":null},
{"id":11,"title_romaji":"Naruto","type":"Manga","adult":false,"popularity":4328,"title_japanese":"ナルト","title_english":"Naruto","synonyms":[],"image_url_lge":"http://anilist.co/img/dir/manga/reg/11-6kvwj5mEjiNx.png","image_url_med":"http://anilist.co/img/dir/manga/med/11-6kvwj5mEjiNx.png","publishing_status":"finished","average_score":"75.6","total_chapters":700,"total_volumes":72,"relation_type":null,"role":null},
{"id":12,"title_romaji":"Bleach","type":"Manga","adult":false,"popularity":3491,"title_japanese":"ブリーチ","title_english":"Bleach","synonyms":[],"image_url_lge":"http://anilist.co/img/dir/manga/reg/12-UvTZ3kLjNVAV.png","image_url_med":"http://anilist.co/img/dir/manga/med/12-UvTZ3kLjNVAV.png","publishing_status":"publishing","average_score":"73","total_chapters":0,"total_volumes":0,"relation_type":null,"role":null},
{"id":13,"title_romaji":"One Piece","type":"Manga","adult":false,"popularity":3469,"title_japanese":"ワンピース","title_english":"One Piece","synonyms":[],"image_url_lge":"http://anilist.co/img/dir/manga/reg/13-YtNS1NYENcca.png","image_url_med":"http://anilist.co/img/dir/manga/med/13-YtNS1NYENcca.png","publishing_status":"publishing","average_score":"87.4","total_chapters":0,"total_volumes":0,"relation_type":null,"role":null},
{"id":14,"title_romaji":"Groove Adventure Rave","type":"Manga","adult":false,"popularity":763,"title_japanese":"レイヴ","title_english":"Rave Master","synonyms":[],"image_url_lge":"http://anilist.co/img/dir/manga/reg/14.jpg","image_url_med":"http://anilist.co/img/dir/manga/med/14.jpg","publishing_status":"finished","average_score":"72.8","total_chapters":298,"total_volumes":35,"relation_type":null,"role":null},
{"id":15,"title_romaji":"Mahou Sensei Negima!","type":"Manga","adult":false,"popularity":1208,"title_japanese":"魔法先生ネギま!","title_english":"Negima! Magister Negi Magi","synonyms":["Magical Teacher Negima!"],"image_url_lge":"http://anilist.co/img/dir/manga/reg/15.jpg","image_url_med":"http://anilist.co/img/dir/manga/med/15.jpg","publishing_status":"finished","average_score":"75.3","total_chapters":355,"total_volumes":38,"relation_type":null,"role":null},
{"id":16,"title_romaji":"Love Hina","type":"Manga","adult":false,"popularity":932,"title_japanese":"ラブ ひな","title_english":"Love Hina","synonyms":[],"image_url_lge":"http://anilist.co/img/dir/manga/reg/16.jpg","image_url_med":"http://anilist.co/img/dir/manga/med/16.jpg","publishing_status":"finished","average_score":"73.5","total_chapters":123,"total_volumes":14,"relation_type":null,"role":null},
{"id":17,"title_romaji":"Kareshi Kanojo no Jijou","type":"Manga","adult":false,"popularity":481,"title_japanese":"彼氏彼女の事情","title_english":"Kare Kano - His and Her Circumstances","synonyms":["His and Hers","The Tiger and the Chameleon: A Promise for One Week","Ashita Mata Mori de Aou ne","Meet Me Again Tomorrow in the Forest"],"image_url_lge":"http://anilist.co/img/dir/manga/reg/17-5SR15Mv4U1RL.png","image_url_med":"http://anilist.co/img/dir/manga/med/17-5SR15Mv4U1RL.png","publishing_status":"finished","average_score":"68.7","total_chapters":103,"total_volumes":21,"relation_type":null,"role":null},
{"id":18,"title_romaji":"Kodomo no Omocha","type":"Manga","adult":false,"popularity":278,"title_japanese":"こどものおもちゃ","title_english":"Kodocha: Sana's Stage","synonyms":["Kodocha","Child's Toy"],"image_url_lge":"http://anilist.co/img/dir/manga/reg/18-7w7hpdKrJoHB.png","image_url_med":"http://anilist.co/img/dir/manga/med/18-7w7hpdKrJoHB.png","publishing_status":"finished","average_score":"67.7","total_chapters":54,"total_volumes":10,"relation_type":null,"role":null},
{"id":19,"title_romaji":"GetBackers","type":"Manga","adult":false,"popularity":222,"title_japanese":"ゲットバッカーズ -奪還屋-","title_english":"Get Backers: Dakkanya","synonyms":[],"image_url_lge":"http://anilist.co/img/dir/manga/reg/19.jpg","image_url_med":"http://anilist.co/img/dir/manga/med/19.jpg","publishing_status":"finished","average_score":"55.8","total_chapters":344,"total_volumes":39,"relation_type":null,"role":null},
{"id":20,"title_romaji":"Hikaru no Go","type":"Manga","adult":false,"popularity":643,"title_japanese":"ヒカルの碁","title_english":"Hikaru no Go","synonyms":["Hikaru's Go","Hikago"],"image_url_lge":"http://anilist.co/img/dir/manga/reg/20-szT7LihbjXmZ.jpg","image_url_med":"http://anilist.co/img/dir/manga/med/20-szT7LihbjXmZ.jpg","publishing_status":"finished","average_score":"73.6","total_chapters":197,"total_volumes":23,"relation_type":null,"role":null},
{"id":21,"title_romaji":"Death Note","type":"Manga","adult":false,"popularity":2824,"title_japanese":"デスノート","title_english":"Death Note","synonyms":[],"image_url_lge":"http://anilist.co/img/dir/manga/reg/21.jpg","image_url_med":"http://anilist.co/img/dir/manga/med/21.jpg","publishing_status":"finished","average_score":"83.5","total_chapters":108,"total_volumes":12,"relation_type":null,"role":null},
{"id":22,"title_romaji":"Rurouni Kenshin","type":"Manga","adult":false,"popularity":1105,"title_japanese":"るろうに剣心 明治剣客浪漫譚; 戦国の三日月","title_english":"Rurouni Kenshin: Meiji Swordsman Romantic Story","synonyms":["Rurouni Kenshin Meiji Kenkaku Romantan","Samurai X","Sengoku no Mikazuki","Crescent Moon in the Warring States"],"image_url_lge":"http://anilist.co/img/dir/manga/reg/22-Gb67gI53eafv.jpg","image_url_med":"http://anilist.co/img/dir/manga/med/22-Gb67gI53eafv.jpg","publishing_status":"finished","average_score":"81.1","total_chapters":259,"total_volumes":28,"relation_type":null,"role":null},
{"id":23,"title_romaji":"Ranma ½","type":"Manga","adult":false,"popularity":519,"title_japanese":"らんま½","title_english":"Ranma ½","synonyms":["Ranma 1/2"],"image_url_lge":"http://anilist.co/img/dir/manga/reg/23.jpg","image_url_med":"http://anilist.co/img/dir/manga/med/23.jpg","publishing_status":"finished","average_score":"68.9","total_chapters":407,"total_volumes":38,"relation_type":null,"role":null},
{"id":24,"title_romaji":"D.Gray-man","type":"Manga","adult":false,"popularity":1867,"title_japanese":"ディー・グレイマン","title_english":"D.Gray-man","synonyms":["D. Gray man","D. Grayman","D. Gray-man"],"image_url_lge":"http://anilist.co/img/dir/manga/reg/24-OVWqdebrh1ib.jpg","image_url_med":"http://anilist.co/img/dir/manga/med/24-OVWqdebrh1ib.jpg","publishing_status":"publishing","average_score":"77.9","total_chapters":0,"total_volumes":0,"relation_type":null,"role":null},
{"id":25,"title_romaji":"Fullmetal Alchemist","type":"Manga","adult":false,"popularity":2467,"title_japanese":"鋼の錬金術師","title_english":"Fullmetal Alchemist","synonyms":["Full Metal Alchemist","Hagane no Renkinjutsushi","FMA","Fullmetal Alchemist Gaiden"],"image_url_lge":"http://anilist.co/img/dir/manga/reg/25-imy9GeynfS89.jpg","image_url_med":"http://anilist.co/img/dir/manga/med/25-imy9GeynfS89.jpg","publishing_status":"finished","average_score":"88.8","total_chapters":116,"total_volumes":27,"relation_type":null,"role":null},
{"id":26,"title_romaji":"Hunter x Hunter","type":"Manga","adult":false,"popularity":1785,"title_japanese":"ハンター×ハンタ","title_english":"Hunter x Hunter","synonyms":["HxH"],"image_url_lge":"http://anilist.co/img/dir/manga/reg/26-uu3Dr5EzH7Ze.jpg","image_url_med":"http://anilist.co/img/dir/manga/med/26-uu3Dr5EzH7Ze.jpg","publishing_status":"publishing","average_score":"83.5","total_chapters":0,"total_volumes":0,"relation_type":null,"role":null},
{"id":27,"title_romaji":"X","type":"Manga","adult":false,"popularity":376,"title_japanese":"エックス","title_english":"X","synonyms":["X/1999"],"image_url_lge":"http://anilist.co/img/dir/manga/reg/27-6yZ2tFMiHOf1.png","image_url_med":"http://anilist.co/img/dir/manga/med/27-6yZ2tFMiHOf1.png","publishing_status":"finished","average_score":"64.6","total_chapters":158,"total_volumes":18,"relation_type":null,"role":null},
{"id":28,"title_romaji":"Nana","type":"Manga","adult":false,"popularity":767,"title_japanese":"ナナ","title_english":"Nana","synonyms":[],"image_url_lge":"http://anilist.co/img/dir/manga/reg/28-qYSIfvsWMKb2.png","image_url_med":"http://anilist.co/img/dir/manga/med/28-qYSIfvsWMKb2.png","publishing_status":"publishing","average_score":"75.7","total_chapters":0,"total_volumes":0,"relation_type":null,"role":null},
{"id":29,"title_romaji":"Paradise Kiss","type":"Manga","adult":false,"popularity":437,"title_japanese":"パラダイス・キス","title_english":"Paradise Kiss","synonyms":["ParaKiss"],"image_url_lge":"http://anilist.co/img/dir/manga/reg/29.jpg","image_url_med":"http://anilist.co/img/dir/manga/med/29.jpg","publishing_status":"finished","average_score":"70.8","total_chapters":48,"total_volumes":5,"relation_type":null,"role":null},
{"id":30,"title_romaji":"Ouran Koukou Host Club","type":"Manga","adult":false,"popularity":1245,"title_japanese":"桜蘭高校ホスト部","title_english":"Ouran High School Host Club","synonyms":["OHSHC","Romantic Egoist"],"image_url_lge":"http://anilist.co/img/dir/manga/reg/30-sh7U2vsSJ3gk.png","image_url_med":"http://anilist.co/img/dir/manga/med/30-sh7U2vsSJ3gk.png","publishing_status":"finished","average_score":"79.6","total_chapters":87,"total_volumes":18,"relation_type":null,"role":null},
{"id":31,"title_romaji":"Lovely★Complex","type":"Manga","adult":false,"popularity":693,"title_japanese":"ラブ★コン","title_english":"Love★Com","synonyms":["Love Com","Lovely Complex Plus","Love★Com Plus"],"image_url_lge":"http://anilist.co/img/dir/manga/reg/31-XqinMK3Qwhh3.png","image_url_med":"http://anilist.co/img/dir/manga/med/31-XqinMK3Qwhh3.png","publishing_status":"finished","average_score":"76","total_chapters":68,"total_volumes":17,"relation_type":null,"role":null},
{"id":32,"title_romaji":"666 Satan","type":"Manga","adult":false,"popularity":514,"title_japanese":"666〜サタン〜","title_english":"O-Parts Hunter","synonyms":["Trigger"],"image_url_lge":"http://anilist.co/img/dir/manga/reg/32.jpg","image_url_med":"http://anilist.co/img/dir/manga/med/32.jpg","publishing_status":"finished","average_score":"66.5","total_chapters":76,"total_volumes":19,"relation_type":null,"role":null},
{"id":33,"title_romaji":"Pita-Ten","type":"Manga","adult":false,"popularity":149,"title_japanese":"ぴたテン","title_english":"Pita-Ten","synonyms":["Clinging Angel"],"image_url_lge":"http://anilist.co/img/dir/manga/reg/33.jpg","image_url_med":"http://anilist.co/img/dir/manga/med/33.jpg","publishing_status":"finished","average_score":"55.3","total_chapters":47,"total_volumes":8,"relation_type":null,"role":null},
{"id":34,"title_romaji":"Di Gi Charat - Koushiki Comic Anthology","type":"Manga","adult":false,"popularity":21,"title_japanese":"デ・ジ・キャラット 公式コミックアンソロジー","title_english":"Di Gi Charat","synonyms":[],"image_url_lge":"http://anilist.co/img/dir/manga/reg/34-nXRwmeO6lOhR.jpg","image_url_med":"http://anilist.co/img/dir/manga/med/34-nXRwmeO6lOhR.jpg","publishing_status":"finished","average_score":"0","total_chapters":0,"total_volumes":4,"relation_type":null,"role":null},
{"id":35,"title_romaji":"Kamichama Karin","type":"Manga","adult":false,"popularity":208,"title_japanese":"かみちゃまかりん","title_english":"Kamichama Karin","synonyms":["Little Goddess Karin"],"image_url_lge":"http://anilist.co/img/dir/manga/reg/35-7h2fnXPUhsEH.jpg","image_url_med":"http://anilist.co/img/dir/manga/med/35-7h2fnXPUhsEH.jpg","publishing_status":"finished","average_score":"57.9","total_chapters":32,"total_volumes":7,"relation_type":null,"role":null},
{"id":36,"title_romaji":"Kamikaze Kaitou Jeanne","type":"Manga","adult":false,"popularity":302,"title_japanese":"神風怪盗ジャンヌ","title_english":"Kamikaze Kaito Jeanne","synonyms":["Divine Wind Phantom Thief Jeanne"],"image_url_lge":"http://anilist.co/img/dir/manga/reg/36-GQWOlQyTovfX.jpg","image_url_med":"http://anilist.co/img/dir/manga/med/36-GQWOlQyTovfX.jpg","publishing_status":"finished","average_score":"63.5","total_chapters":33,"total_volumes":7,"relation_type":null,"role":null},
{"id":37,"title_romaji":"Shinshi Doumei Cross","type":"Manga","adult":false,"popularity":427,"title_japanese":"紳士同盟†","title_english":"The Gentleman's Alliance Cross","synonyms":["The Gentlemen's Alliance Cross","Shinshi Doumei +","Umi no Sakyuugi Nocturne","The Globe of the Sea - Nocturne"],"image_url_lge":"http://anilist.co/img/dir/manga/reg/37-4uqGadeBTfqb.png","image_url_med":"http://anilist.co/img/dir/manga/med/37-4uqGadeBTfqb.png","publishing_status":"finished","average_score":"65.6","total_chapters":59,"total_volumes":11,"relation_type":null,"role":null},
{"id":38,"title_romaji":"+Anima","type":"Manga","adult":false,"popularity":345,"title_japanese":"プラス・アニマ","title_english":"+Anima","synonyms":["Plus Anima","Parallel +Anima"],"image_url_lge":"http://anilist.co/img/dir/manga/reg/38.jpg","image_url_med":"http://anilist.co/img/dir/manga/med/38.jpg","publishing_status":"finished","average_score":"62.2","total_chapters":59,"total_volumes":10,"relation_type":null,"role":null},
{"id":39,"title_romaji":"Zombie Powder","type":"Manga","adult":false,"popularity":235,"title_japanese":"ゾンビパウダー","title_english":"Zombie Powder","synonyms":["Ultra Unholy Hearted Machine","Rune Master Urara","Bad Shield United"],"image_url_lge":"http://anilist.co/img/dir/manga/reg/39-X3a8q3HxkMgu.jpg","image_url_med":"http://anilist.co/img/dir/manga/med/39-X3a8q3HxkMgu.jpg","publishing_status":"finished","average_score":"58.5","total_chapters":30,"total_volumes":4,"relation_type":null,"role":null},
{"id":40,"title_romaji":"Black Cat","type":"Manga","adult":false,"popularity":633,"title_japanese":"ブラックキャット","title_english":"Black Cat","synonyms":["Stray Cat"],"image_url_lge":"http://anilist.co/img/dir/manga/reg/40.jpg","image_url_med":"http://anilist.co/img/dir/manga/med/40.jpg","publishing_status":"finished","average_score":"70.8","total_chapters":187,"total_volumes":20,"relation_type":null,"role":null},
{"id":41,"title_romaji":"Busou Renkin","type":"Manga","adult":false,"popularity":272,"title_japanese":"武装錬金","title_english":"Buso Renkin","synonyms":["Arms Alchemy"],"image_url_lge":"http://anilist.co/img/dir/manga/reg/41.jpg","image_url_med":"http://anilist.co/img/dir/manga/med/41.jpg","publishing_status":"finished","average_score":"58.2","total_chapters":83,"total_volumes":10,"relation_type":null,"role":null},
{"id":42,"title_romaji":"Dragon Ball","type":"Manga","adult":false,"popularity":1129,"title_japanese":"ドラゴンボール","title_english":"Dragon Ball","synonyms":["Dragonball","Dragon Ball Z","Dragonball Z"],"image_url_lge":"http://anilist.co/img/dir/manga/reg/42-O1wtRBzknyrv.jpg","image_url_med":"http://anilist.co/img/dir/manga/med/42-O1wtRBzknyrv.jpg","publishing_status":"finished","average_score":"78.3","total_chapters":520,"total_volumes":42,"relation_type":null,"role":null},
{"id":43,"title_romaji":"Eyeshield 21","type":"Manga","start_date":"2002-07-23T00:00:00+09:00","end_date":"2009-06-15T00:00:00+09:00","adult":false,"popularity":918,"title_japanese":"アイシールド21","title_english":"Eyeshield 21","synonyms":[],"description":"Wimpy Sena Kobayakawa has been running away from bullies all his life. But when the football gear comes on, things change&mdash;Sena's speed and uncanny ability to elude big bullies just might give him what it takes to become a great high school football hero! Enjoy all the bone-crushing action and slapstick comedy that this heartwarming coming-of-age story has to offer. <br><br>\n(Source: Viz) ","image_url_lge":"http://anilist.co/img/dir/manga/reg/43-S8Amw7dBaqR2.jpg","image_url_med":"http://anilist.co/img/dir/manga/med/43-S8Amw7dBaqR2.jpg","image_url_banner":null,"publishing_status":"finished","average_score":"79","total_chapters":333,"total_volumes":37,"relation_type":null,"role":null,"list_stats":{"plan_to_read":247,"reading":116,"completed":481,"on_hold":53,"dropped":21},"genres":["Comedy","Shounen","Sports"]},
{"id":44,"title_romaji":"Gintama","type":"Manga","start_date":"2003-12-08T00:00:00+09:00","end_date":null,"adult":false,"popularity":1132,"title_japanese":"銀魂","title_english":"Gintama","synonyms":["Dandelion","Shiro Kuro","Black and White"],"description":"The samurai didn't stand a chance. First, the aliens invaded Japan. Next, they took all the jobs. And then they confiscated everyone's swords. So what does a hotheaded former samurai like Sakata \"Gin\" Gintoki do to make ends meet? Take any odd job that comes his way, even if it means losing his dignity. (Source: Viz)<br><br>\nIncluded one-shots: <!--link--><a href=\"http://myanimelist.net/manga/44/Gintama/moreinfo\">Dandelion, Shirokuro, Bankara-san ga Tooru</a>","image_url_lge":"http://anilist.co/img/dir/manga/reg/44-rfk2r1wD2WUp.jpg","image_url_med":"http://anilist.co/img/dir/manga/med/44-rfk2r1wD2WUp.jpg","image_url_banner":null,"publishing_status":"publishing","average_score":"81.7","total_chapters":0,"total_volumes":0,"relation_type":null,"role":null,"list_stats":{"plan_to_read":282,"reading":558,"completed":32,"on_hold":202,"dropped":58},"genres":["Action","Comedy","Parody","Samurai","Sci-Fi","Shounen"]},
{"id":45,"title_romaji":"Ichigo 100%","type":"Manga","start_date":"2002-02-19T00:00:00+09:00","end_date":"2005-07-25T00:00:00+09:00","adult":false,"popularity":606,"title_japanese":"いちご100%","title_english":"Strawberry 100%","synonyms":[],"description":"Junpei Manaka sneaks up to the roof to see the sunset. When he opens the door, he startles a mysterious beauty. She panics and runs away, but before not Junpei has caught sight of her adorable strawberry print panties... in EXTREME close-up. With that vision forever burned into his memory, Junpei embarks on a quest to find the girl, and the panties, of his dreams! <br><br>\n(Source: Viz)","image_url_lge":"http://anilist.co/img/dir/manga/reg/45.jpg","image_url_med":"http://anilist.co/img/dir/manga/med/45.jpg","image_url_banner":null,"publishing_status":"finished","average_score":"72.2","total_chapters":167,"total_volumes":19,"relation_type":null,"role":null,"list_stats":{"plan_to_read":159,"reading":51,"completed":336,"on_hold":33,"dropped":27},"genres":["Comedy","Drama","Ecchi","Romance","School","Shounen"]},
{"id":46,"title_romaji":"Kannade","type":"Manga","start_date":"2003-09-22T00:00:00+09:00","end_date":"2003-12-15T00:00:00+09:00","adult":false,"popularity":16,"title_japanese":"神撫手","title_english":"Kannade","synonyms":[],"description":"Akito Hayama is the infamous God Hand, an art thief who steals only masterpieces. But these arn't your ordinary art pieces, they're actually copies made by Akito's missing mother. Akito is caught by an underground art broker and consequently learns the reason for the disappearance of his mother. In a attempt to save himself, a new found ability 'Kannade' emerges within Akito, as well as the quest to find certain art pieces by Akito's mother and what Kannade's fate really is.","image_url_lge":"http://anilist.co/img/dir/manga/reg/46.jpg","image_url_med":"http://anilist.co/img/dir/manga/med/46.jpg","image_url_banner":null,"publishing_status":"finished","average_score":"0","total_chapters":15,"total_volumes":2,"relation_type":null,"role":null,"list_stats":{"plan_to_read":7,"reading":3,"completed":5,"on_hold":1,"dropped":0},"genres":["Action","Mystery","Shounen"]},
{"id":47,"title_romaji":"Katekyo Hitman Reborn!","type":"Manga","start_date":"2004-05-24T00:00:00+09:00","end_date":"2012-11-12T00:00:00+09:00","adult":false,"popularity":1819,"title_japanese":"家庭教師ヒットマンREBORN!","title_english":"Reborn!","synonyms":["Kateikyoushi Hitman Reborn!","Home Tutor Hitman Reborn!"],"description":"Sawada Tsunayoshi is regular boy who has never excelled in sports, school or social life, thus being named \"No Good Tsuna\". Everyday, he leads just a normal life, living with his mother, while his father is away for work. But the thing Tsunayoshi doesn't know is that his family is actual lineage of the great Mafia Boss, the first head of Vongola, Giotto.<br><br>\r\nBecause of the Sawada history, Tsuna has been chosen to become tenth head of the Vongola family, an infamous Italian mafia family which rules the Mafia world. To become worthy of the title, Tsuna is being aided by professional hitman and infant, Reborn, who takes the role of Tsunayoshi's mafia tutor.<br><br>\r\n[Written by Katekyo Hitman Reborn! FC]","image_url_lge":"http://anilist.co/img/dir/manga/reg/47-Oa1vTAlLi46a.jpg","image_url_med":"http://anilist.co/img/dir/manga/med/47-Oa1vTAlLi46a.jpg","image_url_banner":null,"publishing_status":"finished","average_score":"76.5","total_chapters":411,"total_volumes":42,"relation_type":null,"role":null,"list_stats":{"plan_to_read":225,"reading":267,"completed":1050,"on_hold":164,"dropped":113},"genres":["Action","Comedy","School","Shounen","Super Power"]},
{"id":48,"title_romaji":"Pretty Face","type":"Manga","start_date":"2002-05-14T00:00:00+09:00","end_date":"2003-06-09T00:00:00+09:00","adult":false,"popularity":296,"title_japanese":"プリティフェイス","title_english":"Pretty Face","synonyms":[],"description":"Due to a terrible bus accident, Randoh (the main character) wakes up one day to discover he has the face of an attractive girl thanks to a rather perverted plastic surgeon. But not just any girl's face--it's the same girl that he has a crush on. To make matters even worse, he runs into the girl and she thinks it's her long-lost twin sister. When Randoh moves in with her (quite willingly) he is torn between helping out this girl by pretending to be her sister, and wanting his old face back.<br><br>\n(Source: Akatsuki-Manga)","image_url_lge":"http://anilist.co/img/dir/manga/reg/48.jpg","image_url_med":"http://anilist.co/img/dir/manga/med/48.jpg","image_url_banner":null,"publishing_status":"finished","average_score":"63.6","total_chapters":53,"total_volumes":6,"relation_type":null,"role":null,"list_stats":{"plan_to_read":78,"reading":19,"completed":175,"on_hold":13,"dropped":11},"genres":["Comedy","Ecchi","Romance","School","Shounen"]},
{"id":49,"title_romaji":"Prince of Tennis","type":"Manga","start_date":"1999-07-06T00:00:00+09:00","end_date":"2008-03-03T00:00:00+09:00","adult":false,"popularity":421,"title_japanese":"テニスの王子様","title_english":"Prince of Tennis","synonyms":["Tennis no Oujisama","TeniPuri"],"description":"Ryoma Echizen just joined the Seishun Academy's tennis team, which is known for being one of the most competitive teams in Japan. Its members are incredibly talented, gifted, and athletic. With rigorous and extremely intense practices, the upperclassmen of the team expect the very best from themselves and they expect even more from the new members of the team. While most of the freshmen are on pins and needles hoping they won't get cut from the team, Ryoma Echizen is confident, cool, and collected. Some might even say he's cocky, but at least he's got the skills to back up his attitude. With his virtually unreturnable \"twist serve,\" Ryoma is sure to make the starting team. Join Ryoma and the other first years, as they train hard, make friends, and try to find a place for themselves on the team. And meet Ryoma's cute but chronically shy classmate Sakuno Ryuzaki. She's got a big crush on Ryoma, but will he ever notice her? Ryoma Echizen is the Prince of Tennis. He may be ready for the Seishun Academy tennis team, but are THEY ready for HIM? <br><br>\n(Source: Viz)<br><br><strong>Note:</strong> The total chapter count includes 379 chapters for the original manga and 1 chapter entitled \"Chapter 0.\"  This totals 380.  Please do not change the chapter count.  ","image_url_lge":"http://anilist.co/img/dir/manga/reg/49.jpg","image_url_med":"http://anilist.co/img/dir/manga/med/49.jpg","image_url_banner":null,"publishing_status":"finished","average_score":"69.1","total_chapters":380,"total_volumes":42,"relation_type":null,"role":null,"list_stats":{"plan_to_read":74,"reading":34,"completed":259,"on_hold":27,"dropped":27},"genres":["Comedy","School","Sports"]},
{"id":50,"title_romaji":"Shaman King","type":"Manga","start_date":"1998-06-30T00:00:00+09:00","end_date":"2004-08-30T00:00:00+09:00","adult":false,"popularity":897,"title_japanese":"シャーマンキング","title_english":"Shaman King","synonyms":["Exotica","Diary of Exotica","Funbari no Uta","Mappa Douji"],"description":"Yoh Asakura is a shaman--one of the gifted few who, thanks to training or natural talent, can channel spirits that most people can't even see. With the help of his fiance, Anna, Yoh is in training for the ultimate shaman sports event: the \"Shaman Fight in Tokyo,\" the once-every-500-years tournament to see who can shape humanity's future and become the Shaman King. But unfortunately for Yoh, every shaman in the world is competing for the same prize...<br><br>\nThe later serialized one-shots, Mappa Douji, Relax and the short manga, Funbari no Uta are also included in the volumes of Shaman King.<br><br>\nThe side story Funbari no Uta, which lasts for five chapters, is set seven years after the end of the manga series and features Hana Asakura and his journey with his uncle Ryu to gather up the 5 elemental warriors<br><br>\nThe side story Mappa-Douji shows Hao's childhood in his original life. It follows the story of Hao in feudal Japan through the death of his mother at the hands of humans, meeting his first spirit friend, and developing his mind reading powers and other advanced shamanic abilities. The side story Relax follows Hao gathering followers for the tournament years before it started.<br><br><strong>Note:</strong> This entry is for the original printing of Shaman King.  Please see <!--link--><a href=\"http://myanimelist.net/manga/12917/\">Shaman King (Kanzenban Edition)</a> for the chapters not included in this edition.","image_url_lge":"http://anilist.co/img/dir/manga/reg/50-mhULcyMTBqO4.jpg","image_url_med":"http://anilist.co/img/dir/manga/med/50-mhULcyMTBqO4.jpg","image_url_banner":null,"publishing_status":"finished","average_score":"72","total_chapters":285,"total_volumes":32,"relation_type":null,"role":null,"list_stats":{"plan_to_read":170,"reading":93,"completed":470,"on_hold":106,"dropped":58},"genres":["Action","Adventure","Comedy","Shounen","Super Power","Supernatural"]}
];

router.get('/seed', function(req,res){
	Manga.create(mangaInfo,function(err){
		if (err) {
			console.log(err);
			res.send('Error seeding database');
		} else 
		{
			console.log('SEED EXECUTED');
			res.redirect('/')
		}	
	});	
});


module.exports = router;