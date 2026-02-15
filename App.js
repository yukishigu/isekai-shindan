import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  ImageBackground,
  Dimensions,
  Share,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

// 20個の質問データ
const questions = [
  {
    id: 1,
    question: '冒険に出るとき、あなたは何を優先しますか？',
    options: [
      { text: '仲間の安全', types: ['healer', 'priest', 'guardian', 'paladin'] },
      { text: '敵の撃破', types: ['warrior', 'berserker', 'gladiator', 'knight'] },
      { text: '戦略の立案', types: ['strategist', 'tactician', 'sage', 'scholar'] },
      { text: '隠密行動', types: ['rogue', 'assassin', 'ninja', 'spy'] },
    ],
  },
  {
    id: 2,
    question: '困難に直面したとき、どう対処しますか？',
    options: [
      { text: '正面から立ち向かう', types: ['warrior', 'knight', 'champion', 'crusader'] },
      { text: '知恵を使って解決', types: ['sage', 'wizard', 'scholar', 'alchemist'] },
      { text: '仲間と協力する', types: ['bard', 'diplomat', 'mediator', 'merchant'] },
      { text: '回避して別の道を探す', types: ['scout', 'ranger', 'explorer', 'wanderer'] },
    ],
  },
  {
    id: 3,
    question: 'パーティーでのあなたの役割は？',
    options: [
      { text: '前線で戦う', types: ['warrior', 'berserker', 'gladiator', 'vanguard'] },
      { text: '後方支援', types: ['healer', 'cleric', 'enchanter', 'supporter'] },
      { text: '魔法で援護', types: ['mage', 'sorcerer', 'warlock', 'elementalist'] },
      { text: '偵察と奇襲', types: ['rogue', 'scout', 'hunter', 'tracker'] },
    ],
  },
  {
    id: 4,
    question: '宝物を見つけたら？',
    options: [
      { text: '仲間と平等に分配', types: ['paladin', 'guardian', 'justicar', 'protector'] },
      { text: '最強の武器を選ぶ', types: ['weaponmaster', 'duelist', 'swordsman', 'lancer'] },
      { text: '魔法の書を探す', types: ['wizard', 'arcanist', 'spellblade', 'summoner'] },
      { text: '金貨を数える', types: ['merchant', 'treasure_hunter', 'appraiser', 'collector'] },
    ],
  },
  {
    id: 5,
    question: '理想の武器は？',
    options: [
      { text: '大剣・斧', types: ['warrior', 'berserker', 'barbarian', 'destroyer'] },
      { text: '杖・魔導書', types: ['mage', 'wizard', 'sage', 'oracle'] },
      { text: '短剣・弓', types: ['rogue', 'archer', 'ranger', 'sniper'] },
      { text: '盾・鎧', types: ['guardian', 'defender', 'fortress', 'bulwark'] },
    ],
  },
  {
    id: 6,
    question: '戦闘スタイルは？',
    options: [
      { text: '一撃必殺', types: ['assassin', 'sniper', 'executioner', 'slayer'] },
      { text: '持久戦', types: ['defender', 'monk', 'endurer', 'survivor'] },
      { text: '速攻', types: ['duelist', 'swashbuckler', 'striker', 'blitzer'] },
      { text: '遠距離攻撃', types: ['archer', 'gunner', 'artillery', 'marksman'] },
    ],
  },
  {
    id: 7,
    question: '魔法と剣、どちらが好き？',
    options: [
      { text: '魔法一筋', types: ['wizard', 'sorcerer', 'magician', 'conjurer'] },
      { text: '剣一筋', types: ['swordsman', 'samurai', 'fencer', 'bladesman'] },
      { text: '両方使いたい', types: ['spellblade', 'mystic_knight', 'battlemage', 'mageblade'] },
      { text: 'どちらも使わない', types: ['monk', 'martial_artist', 'pugilist', 'brawler'] },
    ],
  },
  {
    id: 8,
    question: 'リーダーシップについて',
    options: [
      { text: 'リーダーになりたい', types: ['commander', 'general', 'warlord', 'captain'] },
      { text: '参謀として支えたい', types: ['strategist', 'advisor', 'tactician', 'counselor'] },
      { text: '単独行動が好き', types: ['lone_wolf', 'wanderer', 'ronin', 'drifter'] },
      { text: 'チームの一員でいい', types: ['soldier', 'squire', 'footman', 'guard'] },
    ],
  },
  {
    id: 9,
    question: '冒険の目的は？',
    options: [
      { text: '世界を救う', types: ['hero', 'champion', 'savior', 'crusader'] },
      { text: '富と名声', types: ['adventurer', 'treasure_hunter', 'fortune_seeker', 'bounty_hunter'] },
      { text: '知識の探求', types: ['scholar', 'researcher', 'archaeologist', 'historian'] },
      { text: '強さを求めて', types: ['gladiator', 'challenger', 'duelist', 'trial_seeker'] },
    ],
  },
  {
    id: 10,
    question: '得意な地形は？',
    options: [
      { text: '森林', types: ['ranger', 'druid', 'hunter', 'woodsman'] },
      { text: '山岳', types: ['mountaineer', 'climber', 'highlander', 'cliff_walker'] },
      { text: '都市', types: ['thief', 'spy', 'informant', 'urbanite'] },
      { text: '海・川', types: ['pirate', 'sailor', 'corsair', 'navigator'] },
    ],
  },
  {
    id: 11,
    question: '夜と昼、どちらが得意？',
    options: [
      { text: '夜の方が得意', types: ['assassin', 'ninja', 'nightblade', 'shadow'] },
      { text: '昼の方が得意', types: ['knight', 'paladin', 'sun_warrior', 'daybreaker'] },
      { text: 'どちらでも', types: ['all_rounder', 'versatile', 'adaptive', 'balanced'] },
      { text: '時間は関係ない', types: ['timeless', 'eternal', 'transcendent', 'immortal'] },
    ],
  },
  {
    id: 12,
    question: '動物との関係は？',
    options: [
      { text: '動物と心を通わせる', types: ['beast_tamer', 'animal_whisperer', 'druid', 'naturalist'] },
      { text: '動物に乗って戦う', types: ['dragoon', 'cavalry', 'mounted_warrior', 'rider'] },
      { text: '動物は苦手', types: ['city_dweller', 'technician', 'urbanite', 'mechanist'] },
      { text: '普通に接する', types: ['farmer', 'shepherd', 'rancher', 'herder'] },
    ],
  },
  {
    id: 13,
    question: '魔法の才能は？',
    options: [
      { text: '天才的', types: ['archmage', 'prodigy', 'genius_mage', 'savant'] },
      { text: '努力で習得', types: ['battle_mage', 'study_mage', 'apprentice', 'scholar'] },
      { text: 'あまりない', types: ['warrior', 'fighter', 'physical_combatant', 'brawler'] },
      { text: '魔法は嫌い', types: ['anti_mage', 'magic_breaker', 'nullifier', 'dispeller'] },
    ],
  },
  {
    id: 14,
    question: 'お金の使い方は？',
    options: [
      { text: '装備に投資', types: ['weaponsmith', 'armorer', 'craftsman', 'artisan'] },
      { text: '貯金する', types: ['merchant', 'banker', 'treasurer', 'financier'] },
      { text: '仲間に使う', types: ['benefactor', 'patron', 'sponsor', 'philanthropist'] },
      { text: 'すぐ使い切る', types: ['gambler', 'spendthrift', 'hedonist', 'reveler'] },
    ],
  },
  {
    id: 15,
    question: '敵との交渉は？',
    options: [
      { text: '必ず交渉を試みる', types: ['diplomat', 'negotiator', 'peacemaker', 'mediator'] },
      { text: '状況次第', types: ['pragmatist', 'realist', 'opportunist', 'flexible'] },
      { text: '戦いあるのみ', types: ['warrior', 'zealot', 'fanatic', 'militant'] },
      { text: '逃げる', types: ['coward', 'survivor', 'escapist', 'tactician'] },
    ],
  },
  {
    id: 16,
    question: '信仰について',
    options: [
      { text: '神を深く信仰する', types: ['priest', 'cleric', 'templar', 'devotee'] },
      { text: '信仰はするが程々', types: ['pilgrim', 'believer', 'faithful', 'worshipper'] },
      { text: '信仰しない', types: ['atheist', 'skeptic', 'doubter', 'rationalist'] },
      { text: '自分が神だ', types: ['god', 'deity', 'divine', 'transcendent'] },
    ],
  },
  {
    id: 17,
    question: '料理の腕前は？',
    options: [
      { text: 'プロ級', types: ['chef', 'cook', 'culinary_master', 'gourmet'] },
      { text: '普通に作れる', types: ['innkeeper', 'tavern_owner', 'homemaker', 'provider'] },
      { text: '食べる専門', types: ['food_critic', 'glutton', 'epicure', 'taster'] },
      { text: '料理は不要', types: ['undead', 'spirit', 'elemental', 'construct'] },
    ],
  },
  {
    id: 18,
    question: '芸術への関心は？',
    options: [
      { text: '音楽が好き', types: ['bard', 'minstrel', 'troubadour', 'musician'] },
      { text: '絵画が好き', types: ['artist', 'painter', 'illustrator', 'portraitist'] },
      { text: '文学が好き', types: ['poet', 'writer', 'scribe', 'author'] },
      { text: '興味なし', types: ['philistine', 'pragmatist', 'utilitarian', 'realist'] },
    ],
  },
  {
    id: 19,
    question: '過去の経験は？',
    options: [
      { text: '貴族の出身', types: ['noble', 'aristocrat', 'lord', 'lady'] },
      { text: '平民の出身', types: ['commoner', 'peasant', 'citizen', 'townsperson'] },
      { text: '孤児・浮浪者', types: ['orphan', 'street_urchin', 'vagabond', 'waif'] },
      { text: '記憶がない', types: ['amnesiac', 'mysterious', 'enigma', 'unknown'] },
    ],
  },
  {
    id: 20,
    question: '最終的な目標は？',
    options: [
      { text: '平和な世界', types: ['peacekeeper', 'pacifist', 'harmonizer', 'unifier'] },
      { text: '最強になる', types: ['champion', 'apex', 'ultimate', 'supreme'] },
      { text: '自由に生きる', types: ['free_spirit', 'wanderer', 'nomad', 'libertarian'] },
      { text: '真実を知る', types: ['seeker', 'philosopher', 'truth_finder', 'enlightened'] },
    ],
  },
];

// 50種類の職業結果データ（ミニキャラ付き）
const results = {
  warrior: {
    title: '戦士（ウォリアー）',
    description: 'あなたは勇敢な戦士！剣と盾を手に、仲間を守りながら戦う正統派の戦闘職です。',
    character: '⚔️',
    color: '#e74c3c',
    traits: ['勇敢', '忠実', '正義感が強い'],
    stats: { 攻撃: 85, 防御: 75, 魔力: 30, 速度: 60 },
    personality: '真っ直ぐで誠実な性格。困っている人を見過ごせず、正義のために行動します。仲間からの信頼が厚く、リーダーシップを発揮することも。体を動かすことが好きで、努力を惜しみません。',
    activity: '冒険者ギルドの最前線で活躍。ダンジョン攻略のタンク役として、仲間を守りながら敵を討伐します。村の警備隊長や騎士団の一員として、人々の安全を守る任務にも適しています。訓練所で若手を指導する教官としても尊敬される存在になるでしょう。',
  },
  mage: {
    title: '魔法使い（メイジ）',
    description: '強力な魔法を操る知的な魔術師。遠距離から敵を殲滅する魔法のエキスパートです。',
    character: '🔮',
    color: '#9b59b6',
    traits: ['知的', '冷静', '戦略的'],
    stats: { 攻撃: 95, 防御: 40, 魔力: 95, 速度: 50 },
    personality: '論理的で分析力に優れた思考の持ち主。常に冷静に状況を判断し、最適な魔法を選択します。読書と研究を好み、新しい魔法の習得に余念がありません。少し内向的ですが、仲間思いの一面も。',
    activity: '魔法学院の研究者や、パーティーの主力火力として活躍。遺跡調査では古代魔法の解読を担当し、強敵との戦闘では強力な範囲攻撃魔法で戦況を一変させます。宮廷魔術師として王族に仕える道も。',
  },
  healer: {
    title: '僧侶（ヒーラー）',
    description: '仲間を癒し、支える聖なる力の使い手。パーティーになくてはならない存在です。',
    character: '✨',
    color: '#f39c12',
    traits: ['思いやり', '献身的', '優しい'],
    stats: { 攻撃: 40, 防御: 60, 魔力: 85, 速度: 55 },
    personality: '他者への思いやりに溢れた優しい心の持ち主。困っている人を放っておけず、自己犠牲的な行動も厭いません。穏やかで包容力があり、パーティーの精神的支柱となります。',
    activity: '冒険者パーティーの生命線として、仲間の回復と支援に専念。教会や神殿で病人の治療を行い、孤児院や貧民街での奉仕活動にも積極的。巡礼の旅で各地の人々を救済する聖職者として名を馳せることも。',
  },
  rogue: {
    title: '盗賊（ローグ）',
    description: '影に潜み、素早く敵を仕留める。機敏さとトリッキーな戦い方が特徴です。',
    character: '🥷',
    color: '#34495e',
    traits: ['機敏', '器用', '独立心'],
    stats: { 攻撃: 75, 防御: 50, 魔力: 45, 速度: 95 },
    personality: '自由を愛し、束縛を嫌う独立心旺盛な性格。機転が利き、どんな状況でも生き抜く術を知っています。表面的には軽薄に見えますが、仲間への義理は固く守ります。',
    activity: '盗賊ギルドの腕利きとして、宝物庫の侵入や重要文書の奪取を請け負います。冒険では罠解除やピッキング、偵察を担当。情報屋として裏社会のネットワークを築き、依頼人に必要な情報を提供する仕事でも成功します。',
  },
  knight: {
    title: '騎士（ナイト）',
    description: '高潔な騎士道精神を持つ戦士。名誉と正義のために戦う気高き存在です。',
    character: '🛡️',
    color: '#3498db',
    traits: ['高潔', '忠誠心', '勇敢'],
    stats: { 攻撃: 80, 防御: 85, 魔力: 35, 速度: 55 },
    personality: '名誉と誇りを何よりも重んじる高潔な精神の持ち主。弱き者を守り、不正を許さない正義感に溢れています。礼儀正しく品格があり、多くの人から尊敬を集めます。',
    activity: '王国の騎士団に所属し、国境警備や魔物討伐の任務を遂行。王族の護衛騎士として重要人物を守護したり、騎士団長として部下を率いて大規模な作戦を指揮します。トーナメントで武勲を立て、伝説の騎士として語り継がれることも。',
  },
  paladin: {
    title: '聖騎士（パラディン）',
    description: '神聖な力と武力を併せ持つ。正義の守護者として悪を打ち払います。',
    character: '⛪',
    color: '#f1c40f',
    traits: ['正義感', '信仰心', '献身的'],
    stats: { 攻撃: 75, 防御: 80, 魔力: 70, 速度: 50 },
    personality: '強い信仰心と揺るぎない正義感を持つ、神に仕える戦士。悪を憎み、善を愛し、弱者を守ることに使命を感じています。厳格ですが慈悲深く、人々の希望の光となります。',
    activity: '聖騎士団の一員として、アンデッドや悪魔の討伐に尽力。邪教徒の根絶や、呪われた地の浄化などの神聖な任務を担います。辺境の村を守護する聖堂騎士として、人々に安らぎをもたらします。',
  },
  // 残りの職業も同様にcharacterとcolorを追加
  assassin: { title: '暗殺者', character: '🗡️', color: '#2c3e50', traits: ['冷静', '正確', '孤独'], stats: { 攻撃: 90, 防御: 45, 魔力: 40, 速度: 95 }, personality: '感情を表に出さない冷徹な性格。任務遂行のためなら手段を選ばず、完璧主義者。', activity: '暗殺者ギルドの精鋭として活躍します。' },
  ranger: { title: '森林守護者', character: '🏹', color: '#27ae60', traits: ['自然愛', '冷静', '独立心'], stats: { 攻撃: 75, 防御: 60, 魔力: 50, 速度: 80 }, personality: '自然を愛し、動物たちと心を通わせる穏やかな性格。', activity: '森林地帯のパトロールや密猟者の取り締まりを行います。' },
  berserker: { title: '狂戦士', character: '😡', color: '#c0392b', traits: ['激情的', '破壊的', '勇猛'], stats: { 攻撃: 99, 防御: 30, 魔力: 20, 速度: 70 }, personality: '短気で激情的、戦いへの渇望が強い性格。', activity: '最前線で敵陣に単独突入し、圧倒的な破壊力で敵を蹴散らします。' },
  wizard: { title: '大賢者', character: '🧙', color: '#8e44ad', traits: ['博識', '賢明', '神秘的'], stats: { 攻撃: 98, 防御: 35, 魔力: 99, 速度: 45 }, personality: '深遠な知識と経験を持つ知恵の化身。', activity: '王国の筆頭魔術師として、国家の重要な決定に助言を与えます。' },
  bard: { title: '吟遊詩人', character: '🎸', color: '#e67e22', traits: ['芸術的', '社交的', '魅力的'], stats: { 攻撃: 50, 防御: 50, 魔力: 75, 速度: 70 }, personality: '陽気で社交的、誰とでもすぐに打ち解ける魅力的な性格。', activity: '酒場や宴会で演奏して生計を立てながら、情報収集も行います。' },
  monk: { title: '武闘家', character: '🥋', color: '#d35400', traits: ['修練的', '精神的', '禁欲的'], stats: { 攻撃: 80, 防御: 70, 魔力: 60, 速度: 85 }, personality: '厳しい修行で心身を鍛え抜いた求道者。', activity: '山奥の寺院で修行を積みながら、時に里に下りて人々を助けます。' },
  druid: { title: '自然の番人', character: '🌳', color: '#16a085', traits: ['自然愛', '神秘的', '穏やか'], stats: { 攻撃: 65, 防御: 65, 魔力: 85, 速度: 60 }, personality: '自然との調和を何より大切にする穏やかな性格。', activity: '森や大地の異変を察知し、環境を守るために活動。' },
  necromancer: { title: '死霊術師', character: '☠️', color: '#7f8c8d', traits: ['神秘的', '禁忌的', '孤独'], stats: { 攻撃: 85, 防御: 40, 魔力: 90, 速度: 50 }, personality: '社会から忌避される禁術を研究する孤高の魔術師。', activity: '墓地や地下墓所で死霊術の研究を続けます。' },
  summoner: { title: '召喚士', character: '🌠', color: '#9b59b6', traits: ['神秘的', '多彩', '契約的'], stats: { 攻撃: 70, 防御: 50, 魔力: 90, 速度: 55 }, personality: '異世界の存在と契約を結び、対等な関係を築ける特殊な才能の持ち主。', activity: '強力な召喚獣を呼び出して戦闘を優位に進めます。' },
  alchemist: { title: '錬金術師', character: '⚗️', color: '#e74c3c', traits: ['知的', '実験的', '創造的'], stats: { 攻撃: 60, 防御: 50, 魔力: 80, 速度: 60 }, personality: '探究心旺盛で、新しい調合法の発見に情熱を注ぎます。', activity: '工房で様々なポーションや錬金アイテムを製造します。' },
  merchant: { title: '商人', character: '💼', color: '#f39c12', traits: ['商才', '交渉上手', '実利的'], stats: { 攻撃: 40, 防御: 60, 魔力: 50, 速度: 65 }, personality: '利益を最優先しつつも、信用を大切にする商人気質。', activity: '交易商として各地を巡り、珍しい商品を仕入れて販売。' },
  ninja: { title: '忍者', character: '🥷', color: '#34495e', traits: ['隠密', '器用', '冷静'], stats: { 攻撃: 80, 防御: 55, 魔力: 55, 速度: 95 }, personality: '任務第一で行動する職業的な暗殺者。', activity: '諜報活動や暗殺任務を遂行。' },
  samurai: { title: '侍', character: '⚔️', color: '#c0392b', traits: ['忠義', '誇り高い', '武士道'], stats: { 攻撃: 90, 防御: 70, 魔力: 30, 速度: 75 }, personality: '名誉と忠義を重んじる武士道精神の体現者。', activity: '主君に仕え、その命に従って任務を遂行。' },
  pirate: { title: '海賊', character: '🏴‍☠️', color: '#e67e22', traits: ['自由奔放', '大胆', '冒険心'], stats: { 攻撃: 75, 防御: 60, 魔力: 35, 速度: 80 }, personality: '束縛を嫌い、自由を何より愛する豪快な性格。', activity: '海賊船の船長として船団を率います。' },
  gladiator: { title: '剣闘士', character: '🛡️', color: '#e74c3c', traits: ['派手', '勇敢', '名誉重視'], stats: { 攻撃: 85, 防御: 65, 魔力: 25, 速度: 75 }, personality: '観客の歓声に応える派手なパフォーマンスを好みます。', activity: '大闘技場のスター選手として活躍します。' },
  archer: { title: '弓使い', character: '🏹', color: '#16a085', traits: ['正確', '冷静', '集中力'], stats: { 攻撃: 80, 防御: 50, 魔力: 40, 速度: 75 }, personality: '冷静沈着で集中力が高い。', activity: '軍隊の弓兵部隊に所属します。' },
  guardian: { title: '守護者', character: '🛡️', color: '#3498db', traits: ['守護', '頑強', '献身的'], stats: { 攻撃: 60, 防御: 95, 魔力: 40, 速度: 40 }, personality: '仲間を守ることに全てを懸ける献身的な性格。', activity: 'パーティーの最前線で活躍します。' },
  spellblade: { title: '魔剣士', character: '⚡', color: '#9b59b6', traits: ['多才', 'バランス', '適応力'], stats: { 攻撃: 75, 防御: 60, 魔力: 75, 速度: 70 }, personality: '文武両道を体現する努力家。', activity: '近接戦闘と魔法攻撃を組み合わせます。' },
  dragoon: { title: '竜騎士', character: '🐉', color: '#e74c3c', traits: ['勇敢', '高貴', '竜との絆'], stats: { 攻撃: 85, 防御: 70, 魔力: 50, 速度: 65 }, personality: '竜との深い絆を築ける特別な才能の持ち主。', activity: 'ドラゴンに騎乗して空中から活躍。' },
  scholar: { title: '学者', character: '📚', color: '#8e44ad', traits: ['博識', '分析的', '慎重'], stats: { 攻撃: 50, 防御: 50, 魔力: 85, 速度: 55 }, personality: '知識の追求に人生を捧げる研究者気質。', activity: '図書館や研究所で古文書を解読。' },
  cleric: { title: '神官', character: '⛪', color: '#f39c12', traits: ['信仰深い', '慈悲深い', '献身的'], stats: { 攻撃: 45, 防御: 65, 魔力: 85, 速度: 50 }, personality: '深い信仰心を持つ聖職者。', activity: '教会で礼拝を執り行います。' },
  warlock: { title: '魔術師', character: '🔥', color: '#c0392b', traits: ['野心的', '契約的', '強欲'], stats: { 攻撃: 90, 防御: 40, 魔力: 90, 速度: 55 }, personality: '力への渇望が強い魔法使い。', activity: '禁断の魔法を研究します。' },
  sorcerer: { title: '魔導師', character: '✨', color: '#9b59b6', traits: ['天才的', '直感的', '自由奔放'], stats: { 攻撃: 92, 防御: 38, 魔力: 95, 速度: 60 }, personality: '生まれながらの天才魔法使い。', activity: '圧倒的な魔力で活躍します。' },
  beast_tamer: { title: '獣使い', character: '🐺', color: '#27ae60', traits: ['動物愛', '共感力', '自然派'], stats: { 攻撃: 65, 防御: 60, 魔力: 60, 速度: 75 }, personality: '動物たちと心を通わせる。', activity: '様々な魔獣を仲間にします。' },
  engineer: { title: '技術者', character: '⚙️', color: '#95a5a6', traits: ['創造的', '論理的', '実用的'], stats: { 攻撃: 70, 防御: 60, 魔力: 55, 速度: 60 }, personality: '機械いじりが大好き。', activity: '工房で機械装置を開発します。' },
  duelist: { title: '決闘者', character: '🤺', color: '#e74c3c', traits: ['優雅', '自信家', '誇り高い'], stats: { 攻撃: 85, 防御: 55, 魔力: 30, 速度: 90 }, personality: '剣の腕に絶対的な自信を持つ。', activity: '決闘場で名声を博します。' },
  strategist: { title: '軍師', character: '📋', color: '#34495e', traits: ['知的', '冷静', '計画的'], stats: { 攻撃: 45, 防御: 55, 魔力: 70, 速度: 60 }, personality: '数手先を読む戦略眼を持つ。', activity: '軍の参謀として作戦を立案。' },
  thief: { title: '盗賊', character: '💎', color: '#2c3e50', traits: ['器用', '機敏', '狡猾'], stats: { 攻撃: 65, 防御: 45, 魔力: 35, 速度: 95 }, personality: '機転が利く盗賊。', activity: '財宝を盗み出します。' },
  priest: { title: '司祭', character: '⛪', color: '#f1c40f', traits: ['神聖', '純粋', '慈愛'], stats: { 攻撃: 50, 防御: 70, 魔力: 90, 速度: 50 }, personality: '高位の聖職者。', activity: '大聖堂で儀式を執り行います。' },
  barbarian: { title: '野蛮人', character: '🪓', color: '#d35400', traits: ['野性的', '力強い', '原始的'], stats: { 攻撃: 95, 防御: 75, 魔力: 15, 速度: 60 }, personality: '野性的な戦士。', activity: '辺境の部族の戦士として活躍。' },
  elementalist: { title: '元素使い', character: '🌊', color: '#3498db', traits: ['自然派', '多彩', '調和的'], stats: { 攻撃: 85, 防御: 45, 魔力: 90, 速度: 60 }, personality: '四大元素を操る。', activity: '元素魔法で戦います。' },
  crusader: { title: '聖戦士', character: '✝️', color: '#e67e22', traits: ['信仰深い', '情熱的', '献身的'], stats: { 攻撃: 80, 防御: 75, 魔力: 65, 速度: 55 }, personality: '神への絶対的な信仰を持つ。', activity: '聖戦に参加します。' },
  dancer: { title: '踊り子', character: '💃', color: '#e91e63', traits: ['優雅', '魅惑的', '軽やか'], stats: { 攻撃: 55, 防御: 45, 魔力: 65, 速度: 90 }, personality: '優雅で魅力的。', activity: '宮廷や劇場で舞踏を披露。' },
  gunslinger: { title: '銃使い', character: '🔫', color: '#95a5a6', traits: ['正確', 'クール', '西部的'], stats: { 攻撃: 85, 防御: 50, 魔力: 30, 速度: 80 }, personality: 'クールで冷静。', activity: '賞金稼ぎとして活躍。' },
  sage: { title: '賢者', character: '🧠', color: '#9b59b6', traits: ['賢明', '博識', '洞察力'], stats: { 攻撃: 65, 防御: 55, 魔力: 90, 速度: 55 }, personality: '深い知恵を持つ賢者。', activity: '王の顧問として助言を与えます。' },
  blacksmith: { title: '鍛冶師', character: '🔨', color: '#7f8c8d', traits: ['職人気質', '頑固', '実直'], stats: { 攻撃: 75, 防御: 80, 魔力: 30, 速度: 50 }, personality: '職人のプライドを持つ。', activity: '工房で武器を製作。' },
  illusionist: { title: '幻術師', character: '🎭', color: '#9b59b6', traits: ['トリッキー', '神秘的', '狡猾'], stats: { 攻撃: 60, 防御: 45, 魔力: 85, 速度: 75 }, personality: '幻影を操る魔法使い。', activity: '幻影魔法で敵を惑わせます。' },
  vampire: { title: '吸血鬼', character: '🦇', color: '#8e44ad', traits: ['不死', '高貴', '夜行性'], stats: { 攻撃: 85, 防御: 70, 魔力: 80, 速度: 85 }, personality: '不死の存在。', activity: '古城に住み、夜に活動。' },
  time_mage: { title: '時魔導士', character: '⏰', color: '#3498db', traits: ['神秘的', '希少', '超越的'], stats: { 攻撃: 70, 防御: 50, 魔力: 95, 速度: 80 }, personality: '時間を操る魔法使い。', activity: '時の流れを支配します。' },
  hero: { title: '勇者', character: '🌟', color: '#f1c40f', traits: ['勇敢', '正義', '運命的'], stats: { 攻撃: 90, 防御: 80, 魔力: 80, 速度: 85 }, personality: '世界を救う運命を背負った存在。', activity: '魔王討伐の旅に出ます。' },
  demon_lord: { title: '魔王', character: '👹', color: '#8e44ad', traits: ['支配的', '強大', '恐怖'], stats: { 攻撃: 99, 防御: 90, 魔力: 95, 速度: 75 }, personality: '絶対的な力の支配者。', activity: '魔王城を拠点に世界を支配。' },
  saint: { title: '聖者', character: '👼', color: '#ecf0f1', traits: ['神聖', '奇跡的', '純粋'], stats: { 攻撃: 60, 防御: 75, 魔力: 99, 速度: 65 }, personality: '神に選ばれし者。', activity: '聖地で祈りを捧げます。' },
  god: { title: '神', character: '✨', color: '#f39c12', traits: ['全知全能', '超越', '絶対'], stats: { 攻撃: 99, 防御: 99, 魔力: 99, 速度: 99 }, personality: '全てを超越した究極の存在。', activity: '世界を創造し、見守ります。' },
};

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState({});
  const [result, setResult] = useState(null);

  const handleAnswer = (types) => {
    const newScores = { ...scores };
    
    types.forEach(type => {
      newScores[type] = (newScores[type] || 0) + 1;
    });
    
    setScores(newScores);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResult(newScores);
    }
  };

  const calculateResult = (finalScores) => {
    let maxType = 'warrior';
    let maxScore = 0;

    Object.keys(finalScores).forEach((type) => {
      if (finalScores[type] > maxScore) {
        maxScore = finalScores[type];
        maxType = type;
      }
    });

    setResult(results[maxType] || results.warrior);
    setCurrentScreen('result');
  };

  const resetQuiz = () => {
    setCurrentScreen('home');
    setCurrentQuestion(0);
    setScores({});
    setResult(null);
  };

  const shareResult = async () => {
    if (!result) return;

    try {
      const message = `🏰 異世界職業診断の結果 🏰\n\n私は『${result.title}』でした！\n\n${result.description}\n\n#異世界職業診断`;
      
      const shareResult = await Share.share({
        message: message,
      });

      if (shareResult.action === Share.sharedAction) {
        if (shareResult.activityType) {
          // シェアが完了（特定のアプリで）
          console.log('シェア完了:', shareResult.activityType);
        } else {
          // シェアが完了
          console.log('シェア完了');
        }
      } else if (shareResult.action === Share.dismissedAction) {
        // シェアがキャンセルされた
        console.log('シェアキャンセル');
      }
    } catch (error) {
      Alert.alert('エラー', 'シェアに失敗しました');
      console.error(error);
    }
  };

  // ホーム画面（豪華版）
  if (currentScreen === 'home') {
    return (
      <View style={styles.container}>
        <StatusBar style="light" />
        <View style={styles.gradientBackground}>
          <View style={styles.starsContainer}>
            <Text style={styles.star}>✨</Text>
            <Text style={[styles.star, styles.star2]}>⭐</Text>
            <Text style={[styles.star, styles.star3]}>✨</Text>
            <Text style={[styles.star, styles.star4]}>⭐</Text>
            <Text style={[styles.star, styles.star5]}>✨</Text>
          </View>
          
          <SafeAreaView style={styles.homeContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.mainTitle}>異世界</Text>
              <Text style={styles.mainTitle}>職業診断</Text>
              <View style={styles.decorLine} />
              <Text style={styles.subtitle}>
                あなたが異世界に転生したら{'\n'}どんな職業につく？
              </Text>
            </View>

            <View style={styles.featureBox}>
              <Text style={styles.featureIcon}>🌟</Text>
              <Text style={styles.featureText}>50種類の職業から診断</Text>
            </View>

            <TouchableOpacity
              style={styles.startButton}
              onPress={() => setCurrentScreen('quiz')}
            >
              <Text style={styles.startButtonText}>診断スタート</Text>
              <Text style={styles.startButtonSubtext}>全{questions.length}問</Text>
            </TouchableOpacity>
          </SafeAreaView>
        </View>
      </View>
    );
  }

  // 質問画面
  if (currentScreen === 'quiz') {
    const question = questions[currentQuestion];
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        <ScrollView contentContainerStyle={styles.quizContainer}>
          <View style={styles.progressSection}>
            <Text style={styles.progress}>
              質問 {currentQuestion + 1} / {questions.length}
            </Text>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                  },
                ]}
              />
            </View>
          </View>
          
          <View style={styles.questionCard}>
            <Text style={styles.questionText}>{question.question}</Text>
          </View>
          
          <View style={styles.optionsContainer}>
            {question.options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.optionButton}
                onPress={() => handleAnswer(option.types)}
                activeOpacity={0.7}
              >
                <Text style={styles.optionText}>{option.text}</Text>
                <Text style={styles.optionArrow}>→</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // 結果画面（豪華版）
  if (currentScreen === 'result' && result) {
    return (
      <View style={styles.container}>
        <StatusBar style="light" />
        <View style={[styles.gradientBackground, { backgroundColor: result.color }]}>
          <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={styles.resultContainer}>
              <View style={styles.resultHeader}>
                <Text style={styles.resultLabel}>あなたの職業は...</Text>
                <View style={styles.characterCircle}>
                  <Text style={styles.resultCharacter}>{result.character}</Text>
                </View>
                <Text style={styles.resultJobTitle}>{result.title}</Text>
                <View style={styles.decorDivider} />
              </View>

              <View style={styles.contentCard}>
                <Text style={styles.resultDescription}>{result.description}</Text>

                <View style={styles.traitsContainer}>
                  <Text style={styles.sectionTitle}>✨ 特徴</Text>
                  <View style={styles.traitsGrid}>
                    {result.traits.map((trait, index) => (
                      <View key={index} style={styles.traitBadge}>
                        <Text style={styles.traitText}>{trait}</Text>
                      </View>
                    ))}
                  </View>
                </View>

                {result.personality && (
                  <View style={styles.detailSection}>
                    <Text style={styles.sectionTitle}>🎭 どんな人？</Text>
                    <Text style={styles.detailText}>{result.personality}</Text>
                  </View>
                )}

                {result.activity && (
                  <View style={styles.detailSection}>
                    <Text style={styles.sectionTitle}>⚡ どう活躍できる？</Text>
                    <Text style={styles.detailText}>{result.activity}</Text>
                  </View>
                )}

                <View style={styles.statsSection}>
                  <Text style={styles.sectionTitle}>📊 能力値</Text>
                  {Object.entries(result.stats).map(([stat, value]) => (
                    <View key={stat} style={styles.statRow}>
                      <Text style={styles.statLabel}>{stat}</Text>
                      <View style={styles.statBarContainer}>
                        <View
                          style={[
                            styles.statBarFill,
                            { width: `${value}%`, backgroundColor: result.color }
                          ]}
                        />
                      </View>
                      <Text style={styles.statValue}>{value}</Text>
                    </View>
                  ))}
                </View>
              </View>

              <TouchableOpacity 
                style={[styles.retryButton, { backgroundColor: result.color }]} 
                onPress={resetQuiz}
              >
                <Text style={styles.retryButtonText}>もう一度診断する</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.shareButton} 
                onPress={shareResult}
              >
                <Text style={styles.shareButtonText}>結果をシェアする 📱</Text>
              </TouchableOpacity>
            </ScrollView>
          </SafeAreaView>
        </View>
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  gradientBackground: {
    flex: 1,
    backgroundColor: '#16213e',
  },
  starsContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  star: {
    position: 'absolute',
    fontSize: 20,
    color: '#fff',
    opacity: 0.8,
    top: '10%',
    left: '20%',
  },
  star2: {
    top: '20%',
    left: '70%',
    fontSize: 15,
  },
  star3: {
    top: '40%',
    left: '15%',
    fontSize: 18,
  },
  star4: {
    top: '60%',
    left: '80%',
    fontSize: 12,
  },
  star5: {
    top: '80%',
    left: '40%',
    fontSize: 16,
  },
  homeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  mainTitle: {
    fontSize: 48,
    fontWeight: '900',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
    letterSpacing: 8,
  },
  decorLine: {
    width: 200,
    height: 3,
    backgroundColor: '#f39c12',
    marginVertical: 20,
    borderRadius: 2,
  },
  subtitle: {
    fontSize: 16,
    color: '#ecf0f1',
    textAlign: 'center',
    lineHeight: 24,
    opacity: 0.9,
  },
  featureBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginBottom: 40,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  featureIcon: {
    fontSize: 24,
    marginRight: 10,
  },
  featureText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  startButton: {
    backgroundColor: '#f39c12',
    paddingVertical: 20,
    paddingHorizontal: 60,
    borderRadius: 35,
    elevation: 8,
    shadowColor: '#f39c12',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    alignItems: 'center',
  },
  startButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  startButtonSubtext: {
    color: '#fff',
    fontSize: 12,
    marginTop: 5,
    opacity: 0.9,
  },
  quizContainer: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 20,
    backgroundColor: '#f5f6fa',
  },
  progressSection: {
    marginBottom: 30,
  },
  progress: {
    fontSize: 16,
    color: '#2c3e50',
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: '600',
  },
  progressBar: {
    height: 10,
    backgroundColor: '#ecf0f1',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#3498db',
    borderRadius: 5,
  },
  questionCard: {
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 20,
    marginBottom: 25,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  questionText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    lineHeight: 30,
    textAlign: 'center',
  },
  optionsContainer: {
    gap: 15,
  },
  optionButton: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#3498db',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 17,
    color: '#2c3e50',
    fontWeight: '600',
    flex: 1,
  },
  optionArrow: {
    fontSize: 20,
    color: '#3498db',
    fontWeight: 'bold',
  },
  resultContainer: {
    flexGrow: 1,
    padding: 20,
  },
  resultHeader: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  resultLabel: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 20,
    opacity: 0.9,
  },
  characterCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 4,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  resultCharacter: {
    fontSize: 80,
  },
  resultJobTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 15,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  decorDivider: {
    width: 100,
    height: 3,
    backgroundColor: '#fff',
    opacity: 0.5,
    marginTop: 10,
  },
  contentCard: {
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: 25,
    marginTop: 20,
  },
  resultDescription: {
    fontSize: 16,
    color: '#34495e',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
  },
  traitsContainer: {
    marginBottom: 25,
  },
  traitsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  traitBadge: {
    backgroundColor: '#ecf0f1',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  traitText: {
    fontSize: 14,
    color: '#2c3e50',
    fontWeight: '600',
  },
  detailSection: {
    marginBottom: 25,
  },
  detailText: {
    fontSize: 15,
    color: '#34495e',
    lineHeight: 24,
  },
  statsSection: {
    marginBottom: 10,
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  statLabel: {
    width: 60,
    fontSize: 14,
    color: '#2c3e50',
    fontWeight: 'bold',
  },
  statBarContainer: {
    flex: 1,
    height: 24,
    backgroundColor: '#ecf0f1',
    borderRadius: 12,
    marginHorizontal: 10,
    overflow: 'hidden',
  },
  statBarFill: {
    height: '100%',
    borderRadius: 12,
  },
  statValue: {
    width: 35,
    fontSize: 14,
    color: '#7f8c8d',
    textAlign: 'right',
    fontWeight: '600',
  },
  retryButton: {
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  shareButton: {
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 40,
    backgroundColor: '#1DA1F2',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  shareButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});
