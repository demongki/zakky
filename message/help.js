exports.menu = (pushname, sender, prefix, banChats, offline, ucapanWaktu, wib, wita, wit, premi, latensii, totalgrouppp, totalkontakkk, totalchattt, SadGril) => {
return`${ucapanWaktu} ${pushname}

π _Creator_ : @${SadGril.split("@")[0]}
π _Hit Today_ : ${hit_today.length} π―ππ
π _Lib_ : π©ππππππ
π _Type_ : π΅ππππ±π
π _Prefix_ : γ π΄πππππ·πππππ γ
π _Mode_ : ${banChats ? 'πΊπ¬π³π­' : 'π·πΌπ©π³π°πͺ'}
π _Status_ : ${offline ? 'πΆπ­π­π³π°π΅π¬' : 'πΆπ΅π³π°π΅π¬'}
π _User_ : ${premi}
π _Group Chats_ : ${totalgrouppp.length}
π _Private Chats_ : ${totalkontakkk.length}
π _Total Chats_ : ${totalchattt.length}
π _Speed_ : ${latensii.toFixed(4)} πΊππππππ

*</INFO TIME>*
π _${wib}_ πππ½
π _${wita}_ ππππΌ
π _${wit}_ πππ`
}