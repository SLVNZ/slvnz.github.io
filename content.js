/* ============================================================
   SLVNZ 4.0 — content.js  (editörden üretildi: 07.07.2026 18:16:36)
   Bu metni content.js dosyasının TAMAMIYLA değiştir.
   ============================================================ */

window.SLVNZ_PLACEHOLDER_BODY = "";

window.SLVNZ_CONTENT = {
  "meta": {
    "title": "SLVNZ 4.0",
    "brandName": "SLVNZ",
    "brandAccent": "4.0",
    "brandLogo": "",
    "heroLine1": "SLVNZ",
    "heroLine2": "4.0",
    "tagline": "MASAÜSTÜ ROL YAPMA SİSTEMİ",
    "description": "",
    "version": "v4.0",
    "contentSeed": "2026-07-07-mrasku9t"
  },
  "sections": {
    "oyun-kurallari": {
      "label": "OYUN KURALLARI",
      "blurb": "Sistemin çekirdeği — zarlar, nitelikler, savaş ve karakter gelişimi.",
      "items": [
        {
          "id": "oyun-sistemi",
          "title": "OYUN SİSTEMİ",
          "mode": "rich",
          "blocks": [
            {
              "type": "heading",
              "level": 2,
              "text": "SLVNZ 4.0 SİSTEMİ"
            },
            {
              "type": "paragraph",
              "text": "SLVNZ 4.0 sistemi, özünde D&D ve FATE sistemlerini baz ve ilham alınarak düşünülmüş, özelleştirilmiş ve detaylandırılmış bir masaüstü rol yapma oyunu sistemidir. 3.0 sistemine kıyasla \"Düşük Fantazya\" atmosferini yaşatmak üzere düzenlenmiştir."
            },
            {
              "type": "paragraph",
              "text": "Sistem mümkün olduğunca oyun etkisini barındırırken, oyuncunun sistemin ördüğü sınırlara bağlı kalmadan, yaratıcılığını ve rolünü ortaya koyarak oyunun ve savaşın gidişatına yön vermesini amaçlayan esnek gerçekçiliği sunmayı hedeflemektedir."
            }
          ]
        },
        {
          "id": "zarlar-eylemler",
          "title": "ZARLAR & EYLEMLER",
          "mode": "rich",
          "blocks": [
            {
              "type": "heading",
              "level": 2,
              "text": "ZARLAR & EYLEMLER"
            },
            {
              "type": "paragraph",
              "text": "Oyundaki eylemler, karakterinizle gerçekleştirmek isteyeceğiniz herhangi bir girişimi ifade eder. Bazı eylemler bir beceri gerektirmeden doğrudan gerçekleşebilse de bazı eylemlerin gerçekleşmesi için zar kullanılması gerekir. Kullanılacak zarlar 20 yüzlü bir zar (d20) kullanılarak gerçekleştirilebilir."
            },
            {
              "type": "paragraph",
              "text": "Zar kullanımı ile gerçekleşen herhangi bir eylemin sonucu zarın yansıttığı sayının yüksekliği ile doğru orantılı bir şekilde değişir. Oyun yöneticisi bahsedilen sayı/sayılarla ilgili özelleştirilmiş bir sınır ya da kriter belirtmediyse, sisteme göre zarın yansıttığı sayıların doğuracağı sonuçlar şu şekilde gelişebilmektedir:"
            },
            {
              "type": "table",
              "header": [
                "D20",
                "AÇIKLAMA"
              ],
              "rows": [
                [
                  "1",
                  "Kritik Başarısızlık"
                ],
                [
                  "2-5",
                  "Başarısızlık"
                ],
                [
                  "6-10",
                  "Şartlı Başarı"
                ],
                [
                  "11-19",
                  "Başarı"
                ],
                [
                  "20",
                  "Kritik Başarı"
                ]
              ]
            },
            {
              "type": "paragraph",
              "text": "Eylemlerin geneli, oyun yöneticisinin tercihine göre 10 yüzlü ya da 20 yüzlü zar kullanma seçimi yapılırken kurulmak istenilen denge göz önünde bulundurulmalıdır. 10 yüzlü zar daha dar bir yelpazede daha dengeli bir sonuç yelpazesi oluşturabilirken, 20 yüzlü zar seçimi başarıyı daha yüksek bir ihtimale yayarken başarısızlığın denk gelmesi halinde oluşabilecek cezayı daha ağır bir hale getirebilmektedir."
            },
            {
              "type": "heading",
              "level": 3,
              "text": "ZARA GÖRE BAŞARI DURUMLARI"
            },
            {
              "type": "paragraph",
              "text": "Zar kullanımının sonucunu yansıtan sayıların sebep olabilecekleri durumların karşılıkları şu şekildedir:"
            },
            {
              "type": "heading",
              "level": 3,
              "text": "Kritik Başarısızlık"
            },
            {
              "type": "paragraph",
              "text": "Eylem sonucunu belirlemek için nasıl bir zar kullanılırsa kullanılsın, sonucunun 1 gelmesi halinde, gerçekleştirilmeye çalışılan eylem kesin bir şekilde başarısız sonuçlanır. Bu başarısızlığın yanı sıra ortaya çıkan sonuç, eyleme kalkışan karakter ve/veya çevresindeki karakterler için olumsuz durumlara sebebiyet verebilir. Ayrıca, kritik başarısızlık durumlarında, karakterin sahip olduğu herhangi bir artı/fazladan değer bu kritik duruma dahil edilmez."
            },
            {
              "type": "example",
              "text": "Usta bir hırsız olan Majik, korsan şehri Sulgaran'ın en büyük iskelesindeki \"Sorvalas\" isimli bir yük gemisine sızmaya çalışmaktadır. Geminin kıç tarafına denizden tırmanmayı başaran Majik, yük deposuna açılan bir pencereyi dışarıdan açmaya çalışmak için 20 yüzlü bir zar kullanır. Zarın sonucu 1 gelir. Majik, camı açmaya çalışmakta başarısız olmakla kalmaz, tutunduğu yerde dengesini kaybederek suya düşer ve yüksek bir ses çıkarır. Bu ses, iskele etrafındaki sivillerin ve muhafızların dikkatini çekecektir ki o bölgeye doğru birkaç kişi neler olduğunu görmek üzere yola koyulur."
            },
            {
              "type": "heading",
              "level": 3,
              "text": "Başarısızlık"
            },
            {
              "type": "paragraph",
              "text": "Başarısızlık durumunda da karakter gerçekleştirmeye çalıştığı eylemi gerçekleştiremez. Ancak, diğer iki başarısızlık durumundan da farklı olarak, karakterin gerçekleştirmeye çalıştığı eylem doğrultusunda herhangi bir fazladan değeri bulunuyorsa sayıya eklenerek zarın sonucu değiştirilebilir. Eklenen değer ile bahsedilen sınırlar aşılmıyorsa eylem gerçekleşemez ve başarısız olarak sonuçlanır."
            },
            {
              "type": "heading",
              "level": 3,
              "text": "Şartlı Başarı"
            },
            {
              "type": "paragraph",
              "text": "Gerçekleştirilmeye çalışılan eylemin kısmi olarak başarılı olması ya da gerçekleşmesiyle birlikte karakterin ve/veya etrafındaki karakterlerin başına bir bela açılmasına sebep olan bir olay ile sonuçlanmasıdır."
            },
            {
              "type": "heading",
              "level": 3,
              "text": "Başarı"
            },
            {
              "type": "paragraph",
              "text": "Karakterin gerçekleştirmeye çalıştığı eylemin başarılı bir şekilde sonuçlanmasıdır."
            },
            {
              "type": "heading",
              "level": 3,
              "text": "Kritik Başarı"
            },
            {
              "type": "paragraph",
              "text": "Gerçekleştirilmeye çalışılan eylemin kesin bir şekilde başarılı sonuçlanmasıdır. Bu başarının yanında, kritik başarısızlık sonucunda benzer bir yaklaşımda, eyleme kalkışan karakter ve/veya etrafındaki karakterlere olumlu getirisi olabilecek bir durumun bu sonuca dahil olmasını gerektirir."
            },
            {
              "type": "example",
              "text": "Usta hırsız Majik, suya düştükten sonra etrafta toplanan insanlar tarafından fark edilmemek üzere geminin ters tarafında gizlenmeye çalışır. Gizlenmeye çalışırken bir GİZLİLİK zarı kullanır. Zar sonucu 20 ile sonuçlanır. Majik, kimse fark etmeden geminin kıç tarafındaki bir çıkıntıya tutunarak kendini sudan çeker ve iskeleye tamamen ters bir noktada gözden kaybolmayı başarır. Bu sırada, geminin depo alanında bulunan bir miço, depo penceresini açıp neyin düştüğüne bakmak üzere dışarıya bakar, bir şey göremeyip pencereyi kapatmayı unutarak içeriye döner. Majik, ortamda yaşanan karışıklığı da kendine avantaj edinerek açılmış olan pencereden içeriye girer."
            }
          ]
        },
        {
          "id": "nitelikler",
          "title": "NİTELİKLER",
          "mode": "rich",
          "blocks": [
            {
              "type": "heading",
              "level": 2,
              "text": "NİTELİKLER"
            },
            {
              "type": "paragraph",
              "text": "Bazı durumlarda karakterlerin spesifik eylemleri gerçekleştirmelerinde onlara fayda sağlayabilecekleri nitelikleri bulunmaktadır. Bu nitelikler, herhangi bir karakterin sahip olduğu en temel özellikleri vurgular."
            },
            {
              "type": "tabs",
              "tabs": [
                {
                  "label": "KUVVET (KUV)",
                  "blocks": [
                    {
                      "type": "paragraph",
                      "text": "Kuvvet, karakterin dış dünyaya doğrudan fiziksel güç uygulama kapasitesidir. Kas gücü, itme, çekme, kaldırma, kırma, savurma, zorlama ve fiziksel baskı kurma gibi eylemlerde kullanılır.\n\nKUV yüksek olan karakter, dünyayı bedeniyle zorlayabilen karakterdir. Ağır bir kapıyı omuzlamak, bir yaratığı geri itmek, bir kalkan hattını yarmak, ağır silahı etkili savurmak veya rakibi boğuşmada bastırmak KUV alanına girer.\n\nKUV şunları yönetir:"
                    },
                    {
                      "type": "table",
                      "header": [
                        "ALAN",
                        "AÇIKLAMA"
                      ],
                      "rows": [
                        [
                          "Ham fiziksel güç",
                          "Kırma, kaldırma, itme, çekme, ezme"
                        ],
                        [
                          "Yakın dövüş baskısı",
                          "Ağır silahlar, darbe kuvveti, silah savurma"
                        ],
                        [
                          "Boğuşma ve kontrol",
                          "Rakibi tutma, sürükleme, yere serme"
                        ],
                        [
                          "Taşıma kapasitesi",
                          "Ağır ekipman, yük, zırh toleransı"
                        ],
                        [
                          "Fiziksel engel aşma",
                          "Kapı kırma, zincir koparma, moloz kaldırma"
                        ]
                      ]
                    },
                    {
                      "type": "paragraph",
                      "text": "KUV şunları yapmaz:"
                    },
                    {
                      "type": "list",
                      "ordered": false,
                      "items": [
                        "Uzun süre dayanmayı belirlemez; bu DAY alanıdır.",
                        "Hızlı kaçınmayı veya dengeyi belirlemez; bu ÇEV alanıdır.",
                        "Korkuya, büyüye veya zihinsel baskıya direnmez; bu İRD alanıdır."
                      ]
                    },
                    {
                      "type": "example",
                      "text": "Örnek zar durumları:\n\n“Kapıyı kırıyorum.” → KUV\n“Rakibi omzumla geri itiyorum.” → KUV\n“Büyük baltayı tam güçle indiriyorum.” → KUV + ilgili silah becerisi\n“Çöken kirişi kaldırıp altından birini çıkarıyorum.” → KUV veya KUV + DAY, durumun süresine göre"
                    }
                  ]
                },
                {
                  "label": "ÇEVİKLİK (ÇEV)",
                  "blocks": [
                    {
                      "type": "paragraph",
                      "text": "Çeviklik, karakterin bedenini hızlı, dengeli, hassas ve kontrollü biçimde kullanma kapasitesidir. Refleks, kaçınma, denge, ince hareket, ani pozisyon alma, sessiz hareket ve hızlı saldırı koordinasyonu bu niteliğin alanına girer.\n\nÇEV yüksek olan karakter güçlü olmak zorunda değildir; fakat bedenini doğru anda doğru yere koyabilir. Saldırıdan sıyrılmak, dar bir çıkıntıda dengede kalmak, hızlı hamle yapmak, hafif silahla isabetli saldırmak veya düşmeden yuvarlanmak ÇEV ile ilgilidir.\n\nÇEV şunları yönetir:"
                    },
                    {
                      "type": "table",
                      "header": [
                        "ALAN",
                        "AÇIKLAMA"
                      ],
                      "rows": [
                        [
                          "Refleks",
                          "Ani tehlikeye tepki verme"
                        ],
                        [
                          "Kaçınma",
                          "Saldırıdan sıyrılma, yön değiştirme"
                        ],
                        [
                          "Denge",
                          "Dar zemin, kaygan yüzey, düşme riski"
                        ],
                        [
                          "İnce bedensel kontrol",
                          "Sessiz hareket, akrobatik manevra"
                        ],
                        [
                          "Hafif silah kullanımı",
                          "Hançer, kısa kılıç, çevik saldırı stilleri"
                        ],
                        [
                          "Hareket kapasitesi",
                          "Savaş alanında pozisyon alma, temel hareket artışı"
                        ]
                      ]
                    },
                    {
                      "type": "paragraph",
                      "text": "ÇEV şunları yapmaz:"
                    },
                    {
                      "type": "list",
                      "ordered": false,
                      "items": [
                        "Darbenin gücünü belirlemez; bu KUV alanıdır.",
                        "Darbe yedikten sonra ayakta kalmayı belirlemez; bu DAY alanıdır.",
                        "Tehlikeyi önceden hissetmeyi belirlemez; bu SZG alanıdır."
                      ]
                    },
                    {
                      "type": "example",
                      "text": "Örnek zar durumları:\n\n“Okun altından yuvarlanıyorum.” → ÇEV + Kaçınma\n“İnce taş köprüden koşarak geçiyorum.” → ÇEV\n“Sessizce muhafızın arkasından ilerliyorum.” → ÇEV + Gizlilik\n“Hançerle hızlı bir açık yakalamaya çalışıyorum.” → ÇEV + İsabet / ilgili silah becerisi"
                    }
                  ]
                },
                {
                  "label": "DAYANIKLILIK (DAY)",
                  "blocks": [
                    {
                      "type": "paragraph",
                      "text": "Dayanıklılık, karakterin bedensel baskıya, hasara, acıya, yorgunluğa, hastalığa, zehre ve uzun süreli fiziksel zorlanmaya direnme kapasitesidir. DAY, yalnızca “can” değildir; karakterin bedensel bütünlüğünü ne kadar süre koruyabildiğini ifade eder.\n\nDAY yüksek olan karakter her zaman iri veya güçlü olmak zorunda değildir; fakat kolay yıkılmaz. Zehre direnmek, kan kaybına rağmen ayakta kalmak, uzun yürüyüşe devam etmek, bloklama sırasında gelen darbeyi bedeniyle taşımak veya acı altında bilincini korumak DAY alanına girer.\n\nDAY şunları yönetir:"
                    },
                    {
                      "type": "table",
                      "header": [
                        "ALAN",
                        "AÇIKLAMA"
                      ],
                      "rows": [
                        [
                          "Fiziksel direnç",
                          "Darbe, düşme, ezilme, yanma, soğuk"
                        ],
                        [
                          "Acı toleransı",
                          "Yaralanmaya rağmen eylemi sürdürme"
                        ],
                        [
                          "Yorgunluk direnci",
                          "Uzun yürüyüş, antrenman, zor koşullar"
                        ],
                        [
                          "Zehir/hastalık direnci",
                          "Bedeni bozan dış etkilere karşı koyma"
                        ],
                        [
                          "Soluk temeli",
                          "Fiziksel kaynak havuzunun ana dayanağı"
                        ],
                        [
                          "Blok baskısı",
                          "Kalkan veya silahla gelen kuvveti taşıma"
                        ]
                      ]
                    },
                    {
                      "type": "paragraph",
                      "text": "DAY şunları yapmaz:"
                    },
                    {
                      "type": "list",
                      "ordered": false,
                      "items": [
                        "Ağır nesne kaldırmayı belirlemez; bu KUV alanıdır.",
                        "Saldırıdan kaçmayı belirlemez; bu ÇEV alanıdır.",
                        "Zihinsel veya ruhsal baskıya direnmez; bu İRD alanıdır."
                      ]
                    },
                    {
                      "type": "example",
                      "text": "Örnek zar durumları:\n\n“Zehre direniyorum.” → DAY\n“Darbe yedim ama ayakta kalmaya çalışıyorum.” → DAY\n“Kalkanıma çarpan devasa darbeyi taşıyorum.” → DAY + Bloklama\n“Saatlerdir çölde yürüyorum, devam edebilir miyim?” → DAY"
                    }
                  ]
                },
                {
                  "label": "İRADE (İRD)",
                  "blocks": [
                    {
                      "type": "paragraph",
                      "text": "İrade, karakterin zihinsel, ruhsal ve duygusal baskı altında kendi benliğini koruma kapasitesidir. Korkuya, panik etkisine, zihin manipülasyonuna, acımasız sorguya, büyüsel telkine, lanete, saplantıya, ayartmaya ve konsantrasyon bozucu etkilere karşı kullanılır.\n\nİRD yüksek olan karakter her şeyi bilmek zorunda değildir; fakat kendi zihninin direksiyonunu kolay bırakmaz. Korkunç bir varlığın huzurunda geri çekilmemek, zihinsel büyüye direnmek, işkence altında sır vermemek, karanlık enerjinin fısıltılarını bastırmak veya konsantrasyonunu korumak İRD alanına girer.\n\nİRD şunları yönetir:"
                    },
                    {
                      "type": "table",
                      "header": [
                        "ALAN",
                        "AÇIKLAMA"
                      ],
                      "rows": [
                        [
                          "Zihinsel direnç",
                          "Korku, panik, baskı, yıldırma"
                        ],
                        [
                          "Ruhsal savunma",
                          "Lanet, musallat, karanlık tesir"
                        ],
                        [
                          "Benlik koruma",
                          "Zihin kontrolü, telkin, efsun"
                        ],
                        [
                          "Konsantrasyon",
                          "Büyü veya süreli etkiyi sürdürme"
                        ],
                        [
                          "Kararlılık",
                          "Vazgeçmeme, baskı altında kararını koruma"
                        ],
                        [
                          "Acıya rağmen odak",
                          "Bedensel acının zihni dağıtmasını engelleme"
                        ]
                      ]
                    },
                    {
                      "type": "paragraph",
                      "text": "İRD şunları yapmaz:"
                    },
                    {
                      "type": "list",
                      "ordered": false,
                      "items": [
                        "Bilgi hatırlamayı veya akademik çözümlemeyi doğrudan belirlemez.",
                        "Çevresel detayı fark etmeyi belirlemez; bu çoğunlukla SZG veya ilgili beceridir.",
                        "Sosyal ikna gücü değildir; ikna hâlâ beceri, rol yapma ve bağlama bağlıdır."
                      ]
                    },
                    {
                      "type": "example",
                      "text": "Örnek zar durumları:\n\n“Beni korkutmaya çalışan varlığa direniyorum.” → İRD\n“Zihin kontrolüne karşı koyuyorum.” → İRD\n“Hasar aldım ama büyünün konsantrasyonunu koruyorum.” → İRD + Konsantrasyon\n“Karanlık bir yadigâr zihnime fısıldıyor, etkilenmemeye çalışıyorum.” → İRD"
                    }
                  ]
                },
                {
                  "label": "SEZGİ (SZG)",
                  "blocks": [
                    {
                      "type": "paragraph",
                      "text": "Sezgi, karakterin açık bilgiye, ham mantığa veya doğrudan gözleme dayanmadan örüntü, niyet, tehlike, yalan, aura, enerji izi ve durumun görünmeyen tarafını kavrama kapasitesidir. SZG, ZEK’in yerine geçen “akıllılık” niteliği değildir; İRF’in yerine geçen “mistik bilgelik” niteliği de değildir. Daha net biçimde: karakterin dünya ile arasında kurduğu içgüdüsel okuma yeteneğidir.\n\nSZG yüksek olan karakter, bir şeylerin yanlış olduğunu erken fark eder. Birinin yalan söylediğini kesin kanıtla değil davranış boşluğuyla hisseder. Bir odada görünürde hiçbir şey yokken mekânın “ölü” olduğunu anlar. Bir büyünün matematiğini bilmez ama enerjinin nerede yoğunlaştığını sezebilir. Bir haritadaki sembolü akademik olarak çözemeyebilir ama sembolün tehdit, çağrı veya uyarı taşıdığını anlayabilir.\n\nSZG şunları yönetir:"
                    },
                    {
                      "type": "table",
                      "header": [
                        "ALAN",
                        "AÇIKLAMA"
                      ],
                      "rows": [
                        [
                          "Tehlike Hissi",
                          "Pusu, tuzak, takip, yaklaşan tehdit"
                        ],
                        [
                          "Sosyal sezgi",
                          "Yalan, niyet, bastırılmış duygu, sahte tavır"
                        ],
                        [
                          "Örüntü kavrama",
                          "Bağlantı kurma, eksik parçayı hissetme"
                        ],
                        [
                          "Aura/Enerji Algısı",
                          "Enerji yoğunluğu, büyüsel iz, varlık hissi (Enerji yetkinliği ile bağlantılıdır)"
                        ],
                        [
                          "Pasif farkındalık",
                          "Aktif arama yapmadan tersliği sezme"
                        ]
                      ]
                    },
                    {
                      "type": "paragraph",
                      "text": "SZG şunları yapmaz:"
                    },
                    {
                      "type": "list",
                      "ordered": false,
                      "items": [
                        "Kitabi bilgi vermez. “Bu sembol hangi antik dile ait?” sorusu SZG değil, ilgili bilgi/araştırma becerisidir.",
                        "Kesin gelecek bilgisi vermez. Kehanet enerjisi veya özel yetenek olmadan SZG yalnızca his ve ipucu üretir.",
                        "İnsanları otomatik kandırmayı veya ikna etmeyi sağlamaz.",
                        "Her şeyi fark eden pasif radar değildir; GM sezgiyi ipucu, rahatsızlık, yönelim veya şüphe olarak vermelidir."
                      ]
                    },
                    {
                      "type": "example",
                      "text": "Örnek zar durumları:\n\n“Bu adamın yalan söyleyip söylemediğini anlamaya çalışıyorum.” → SZG + sosyal beceri / Farkındalık\n“Bu odada bir terslik var mı?” → SZG veya SZG + Farkındalık\n“Büyüsel bir iz hissedebilir miyim?” → SZG + ilgili enerji bilgisi\n“Hangi tünel daha tehlikeli geliyor?” → SZG\n“Bu yaratığın saldırmadan önceki niyetini okuyabilir miyim?” → SZG + Farkındalık"
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "id": "beceriler",
          "title": "BECERİLER",
          "mode": "rich",
          "blocks": [
            {
              "type": "heading",
              "level": 2,
              "text": "BECERİLER"
            },
            {
              "type": "paragraph",
              "text": "Niteliklere benzer olarak karakterlerin bazı özel durumlar için ihtiyaç duyacağı beceriler bulunmaktadır. Beceriler, niteliklere benzese de onlar kadar fazla durumda kullanılmayabilirler. Beceriler, **Temel Beceriler** ve **Özel Beceriler** olmak üzere ikiye ayrılır.\n\nTemel Beceriler, oyunun ortak eylem dilidir; Özel Beceriler ise karakterin bu ortak dili kendi geçmişi, eğitimi ve uzmanlığıyla büktüğü alanlardır."
            },
            {
              "type": "heading",
              "level": 3,
              "text": "TEMEL BECERİLER"
            },
            {
              "type": "paragraph",
              "text": "Temel Beceriler, SLVNZ 4.0’ın varsayılan eylem alanlarıdır. Her karakter bu becerilerin bir kısmını teorik olarak kullanabilir; ancak eğitimli karakterler aynı eylemleri daha güvenilir, daha kontrollü ve daha az riskli yapar."
            },
            {
              "type": "tabs",
              "tabs": [
                {
                  "label": "BLOK (SİLAH)",
                  "blocks": [
                    {
                      "type": "paragraph",
                      "text": "Bloklama / Kılıç, karakterin kılıç veya benzeri savunmaya uygun yakın dövüş silahlarıyla gelen saldırıyı kesme, saptırma, karşı hat oluşturma veya rakibin darbe açısını bozma becerisidir.\n\nBu beceri, saldırıyı “bedenle taşımaktan” çok teknikle yön değiştirme üzerine kuruludur. Bu yüzden kalkan bloklamasına göre daha çevik, daha riskli ve daha hassastır.\n\nKullanım alanları:"
                    },
                    {
                      "type": "table",
                      "header": [
                        "DURUM",
                        "AÇIKLAMA"
                      ],
                      "rows": [
                        [
                          "Silahla saldırı savuşturma",
                          "Gelen darbeyi silahla kesmek veya saptırmak"
                        ],
                        [
                          "Rakibin silah hattını bozma",
                          "Darbenin yönünü değiştirerek açık yaratmak"
                        ],
                        [
                          "Karşı hamle hazırlama",
                          "Başarılı bloktan sonra saldırı fırsatı üretme"
                        ]
                      ]
                    },
                    {
                      "type": "paragraph",
                      "text": "Sınırlar:"
                    },
                    {
                      "type": "list",
                      "ordered": false,
                      "items": [
                        "Çok ağır darbelerde kalkan kadar güvenli değildir.",
                        "Büyük yaratıkların ham kuvvet saldırılarına karşı risklidir.",
                        "Başarısızlıkta saldırı doğrudan karaktere geçebilir.",
                        "Silahın dayanıklılığı önemlidir; bloklama hamlesi silahı yıpratabilir veya kırabilir."
                      ]
                    }
                  ]
                },
                {
                  "label": "BLOK (KALKAN)",
                  "blocks": [
                    {
                      "type": "paragraph",
                      "text": "Bloklama / Kalkan, karakterin kalkan kullanarak gelen saldırıyı durdurma, emme, yönlendirme veya bedeninden uzak tutma becerisidir.\n\nKılıç bloklamasından farklı olarak kalkan bloklaması daha güvenli ama daha ağırdır. Kalkan, saldırıyı doğrudan yok etmez; darbeyi karakterin koluna, omzuna, duruşuna ve **soluk** kaynağına aktarır.\n\nKullanım alanları:"
                    },
                    {
                      "type": "table",
                      "header": [
                        "DURUM",
                        "AÇIKLAMA"
                      ],
                      "rows": [
                        [
                          "Fiziksel saldırıyı durdurma",
                          "Kılıç, balta, mızrak, ok, pençe vb."
                        ],
                        [
                          "Darbe emme",
                          "Saldırıyı karakter yerine kalkana bindirme"
                        ],
                        [
                          "Hat tutma",
                          "Dar geçitte, kapıda veya cephede savunma"
                        ],
                        [
                          "Müttefik koruma",
                          "Yanındaki veya arkasındaki hedefi kapatma"
                        ],
                        [
                          "Tam blok imkanları",
                          "Kapsamlı korunma olanağı"
                        ]
                      ]
                    },
                    {
                      "type": "paragraph",
                      "text": "Sınırlar:"
                    },
                    {
                      "type": "list",
                      "ordered": false,
                      "items": [
                        "Bloklanan her güçlü darbe soluk baskısı yaratabilir.",
                        "Yan, eşik ve kör alanlardan gelen saldırılara karşı pozisyon önemlidir.",
                        "Büyük kalkanlar hareketi ve kaçınmayı azaltır.",
                        "Kalkan kırılabilir, düşebilir veya karakterin gardını bozabilir."
                      ]
                    }
                  ]
                },
                {
                  "label": "KAÇINMA",
                  "blocks": [
                    {
                      "type": "paragraph",
                      "text": "Kaçınma, karakterin saldırıdan, çökmeden, patlamadan, düşen nesneden veya ani tehlikeden bedensel hareketle sıyrılma becerisidir.\n\nKaçınma, her zaman geriye zıplamak anlamına gelmez. Eğilmek, yana kaymak, yuvarlanmak, ağırlık merkezini değiştirmek, darbenin içinden çıkmak veya saldırının hedef noktasını bozmak da kaçınmadır.\n\nKullanım alanları:"
                    },
                    {
                      "type": "table",
                      "header": [
                        "DURUM",
                        "AÇIKLAMA"
                      ],
                      "rows": [
                        [
                          "Yakın saldırılardan sıyrılma",
                          "Kılıç, mızrak, pençe, yumruk vb."
                        ],
                        [
                          "Menzilli saldırıdan kaçma",
                          "Ok, taş, enerjisel mermi"
                        ],
                        [
                          "Alan etkisinden kaçınma veya sığınma tepkisi verme",
                          "Patlama, çökme, itme vb."
                        ]
                      ]
                    },
                    {
                      "type": "paragraph",
                      "text": "Sınırlar:"
                    },
                    {
                      "type": "list",
                      "ordered": false,
                      "items": [
                        "Görülmeyen veya sezilmeyen saldırıya karşı kullanımı sınırlıdır.",
                        "Dar alanda esnek şekilde kaçınmak zorlaşır.",
                        "Ağır zırh, yük veya çevresel engel eksiler doğurabilir."
                      ]
                    }
                  ]
                },
                {
                  "label": "ATICILIK",
                  "blocks": [
                    {
                      "type": "paragraph",
                      "text": "Atıcılık, karakterin elle fırlatılan silahları veya nesneleri hedefe yönlendirme becerisidir.\n\nCirit, bıçak, balta, taş, el sapanı, şişe, bomba benzeri fırlatılan nesneler bu beceri kapsamına girer. Atıcılık, nişancılık ve okçuluktan ayrıdır; çünkü burada bedenin savurma hareketi, ağırlık hissi ve mesafe sezgisi daha önemlidir."
                    }
                  ]
                },
                {
                  "label": "NİŞANCILIK",
                  "blocks": [
                    {
                      "type": "paragraph",
                      "text": "Nişancılık, mekanik veya nişan hattı kullanan menzilli silahları kullanma becerisidir.\n\nTatar yayı, musket, tabanca, tüfek, arbalet, mekanik fırlatıcılar veya nişangâhlı özel silahlar bu becerinin alanına girer. Nişancılık, okçuluktan farklı olarak bedensel çekiş gücünden ziyade hedefleme, sabitleme, nefes kontrolü ve zamanlama gerektirir."
                    }
                  ]
                },
                {
                  "label": "OKÇULUK",
                  "blocks": [
                    {
                      "type": "paragraph",
                      "text": "Okçuluk, yay ve ok kullanarak hedefe isabetli saldırı yapma becerisidir.\n\nOkçuluk, nişancılıktan ayrıdır çünkü karakterin bedeni silahın doğrudan parçasıdır. Yay çekişi, nefes, duruş, salım anı, mesafe sezgisi ve hedef takibi birlikte çalışır."
                    }
                  ]
                },
                {
                  "label": "İSABET",
                  "blocks": [
                    {
                      "type": "paragraph",
                      "text": "İsabet, karakterin hedefe yöneltilmiş hassas eylemlerinde kullandığı genel hedefleme becerisidir.\n\nBu beceri, özellikle silah kategorisine girmeyen veya özel hedefleme gerektiren durumlarda kullanılır. Enerjisel odak, asa, işaret ederek büyü yönlendirme, küçük hedefe dokunma, hassas hamle veya belirli bir noktayı vurma bu becerinin alanına girer."
                    }
                  ]
                },
                {
                  "label": "FARKINDALIK",
                  "blocks": [
                    {
                      "type": "paragraph",
                      "text": "Farkındalık, karakterin çevresindeki duyusal ve sezgisel detayları fark etme becerisidir.\n\nGörmek, duymak, koklamak, hareket algılamak, ortamda terslik hissetmek, takip edildiğini anlamak, gizlenen birini seçmek veya yaklaşan tehlikeyi fark etmek bu becerinin alanına girer.\n\nKullanım alanları:"
                    },
                    {
                      "type": "table",
                      "header": [
                        "DURUM",
                        "AÇIKLAMA"
                      ],
                      "rows": [
                        [
                          "Gizlenen varlığı fark etme",
                          "Gizliliğe karşı test"
                        ],
                        [
                          "Ses veya hareket algılama",
                          "Fısıltı, ayak sesi, kapı gıcırtısı vb."
                        ],
                        [
                          "Görsel detay seçme",
                          "Kalabalıkta kişi, yerde iz, duvarda çatlak vb."
                        ],
                        [
                          "Savaş alanı takibi",
                          "Eşik veya kör alandaki hareketi fark etme vb."
                        ]
                      ]
                    }
                  ]
                },
                {
                  "label": "GİZLİLİK",
                  "blocks": [
                    {
                      "type": "paragraph",
                      "text": "Gizlilik, karakterin görünmeden, duyulmadan, iz bırakmadan veya dikkat çekmeden hareket etme becerisidir.\n\nSadece sessiz yürümek değildir. Kalabalıkta sıradan görünmek, gölgede beklemek, zırh sesini bastırmak, izini saklamak, saklanacak doğru anı seçmek ve dikkat dağıtıcı unsurları kullanmak da Gizlilik kapsamındadır.\n\nKullanım alanları:"
                    },
                    {
                      "type": "table",
                      "header": [
                        "DURUM",
                        "AÇIKLAMA"
                      ],
                      "rows": [
                        [
                          "Sessiz hareket",
                          "Duyulmadan ilerleme"
                        ],
                        [
                          "Saklanma",
                          "Görüş hattından çekilme"
                        ],
                        [
                          "İz bırakmama",
                          "Takip edilmeyi zorlaştırma"
                        ],
                        [
                          "Kalabalığa karışma",
                          "Dikkat çekmeden hareket etme"
                        ],
                        [
                          "Pusu hazırlığı",
                          "Uygun konumda fark edilmeden bekleme"
                        ]
                      ]
                    }
                  ]
                },
                {
                  "label": "ARAŞTIRMA",
                  "blocks": [
                    {
                      "type": "paragraph",
                      "text": "Araştırma, karakterin aktif şekilde bilgi, ipucu, nesne, bağlantı veya anlam arama becerisidir.\n\nFarkındalıktan farkı şudur: Farkındalık pasif veya anlık algıdır; Araştırma bilinçli inceleme, kurcalama, karşılaştırma, soru sorma, belge okuma, izleri takip etme ve çıkarım yapma sürecidir.\n\nKullanım alanları:"
                    },
                    {
                      "type": "table",
                      "header": [
                        "DURUM",
                        "AÇIKLAMA"
                      ],
                      "rows": [
                        [
                          "Oda inceleme",
                          "Çekmece, duvar, zemin, gizli bölme arama vb."
                        ],
                        [
                          "Belge tarama",
                          "Kayıt, mektup, mühür, arşiv"
                        ],
                        [
                          "İpucu bulma",
                          "Suç mahalli, kamp alanı, savaş sonrası vb."
                        ]
                      ]
                    }
                  ]
                },
                {
                  "label": "İZCİLİK",
                  "blocks": [
                    {
                      "type": "paragraph",
                      "text": "İzcilik, karakterin doğada yön bulma, iz sürme, kamp kurma, çevre okuma ve hayatta kalma becerisidir.\n\nBu beceri yalnızca “orman bilgisi” değildir. Çöl, dağ, bataklık, tundra, mağara, harabe çevresi ve sınır bölgelerinde hayatta kalma yöntemlerini kapsar.\n\nAncak izcilik, karakterin bu bölgelerin hepsinde hayatta kalma ve yön bulma yöntemlerini içermez. Bir karakter, hangi biyomlarda yetkinse, bu biyomlara yönelik özel izcilik bilgilerine sahiptir.\n\nKullanım alanları:"
                    },
                    {
                      "type": "table",
                      "header": [
                        "DURUM",
                        "AÇIKLAMA"
                      ],
                      "rows": [
                        [
                          "İz sürme",
                          "Ayak izi, kırık dal, kamp kalıntısı"
                        ],
                        [
                          "Yön bulma",
                          "Haritasız veya kötü görüşte ilerleme"
                        ],
                        [
                          "Kamp kurma",
                          "Güvenli dinlenme alanı seçme"
                        ],
                        [
                          "Biyom okuma",
                          "Hava, zemin, hayvan hareketleri vb."
                        ],
                        [
                          "Tehlike tanıma",
                          "Yırtıcı, bataklık, zehirli bitki vb."
                        ],
                        [
                          "Temel doğa üretimi",
                          "Ateş yakma, düğüm, barınak, su bulma vb."
                        ]
                      ]
                    }
                  ]
                },
                {
                  "label": "PERFORMANS",
                  "blocks": [
                    {
                      "type": "paragraph",
                      "text": "Performans, karakterin bedenini, sesini, tavrını, sahne hâkimiyetini veya sosyal varlığını etkileyici biçimde kullanma becerisidir.\n\nBu beceri yalnızca sanat yapmak değildir. Kalabalığı etkilemek, dikkat çekmek, rol kesmek, yalanı daha inandırıcı sunmak, bir ritüeli görkemli icra etmek veya sosyal baskı kurmak da Performans kapsamına girebilir."
                    }
                  ]
                },
                {
                  "label": "SAĞALTIM",
                  "blocks": [
                    {
                      "type": "paragraph",
                      "text": "Sağaltım, karakterin yara, hastalık, kanama, kırık, zehir, enfeksiyon ve bedensel bozulmalara müdahale etme becerisidir.\n\nBu beceri hem savaş sonrası ilk yardım hem de uzun süreli bakım için kullanılır. Cerrahi, dikiş, bandaj, zehir temizleme, hastalık teşhisi ve bitkisel/ilaçsal müdahaleler Sağaltım kapsamına girebilir."
                    }
                  ]
                },
                {
                  "label": "TERBİYE",
                  "blocks": [
                    {
                      "type": "paragraph",
                      "text": "Terbiye, karakterin hayvanları, binekleri veya yarı-vahşi canlıları sakinleştirme, yönlendirme, eğitme ve onlarla güven ilişkisi kurma becerisidir.\n\nTerbiye, hayvan üzerinde mutlak kontrol sağlamaz. Canlının doğası, korkusu, açlığı, eğitimi, türü ve karakterle ilişkisi sonucu belirler."
                    }
                  ]
                }
              ]
            },
            {
              "type": "heading",
              "level": 3,
              "text": "ÖZEL BECERİLER"
            },
            {
              "type": "paragraph",
              "text": "Özel beceriler, temel becerilerin dışında kalan ve karakterin kendisini geliştirmek istediği herhangi bir beceriyi içerir. Bu beceriler tamamen oyuncunun yaratıcılığına ve karakterini kişiselleştirme kapsamında nasıl ilerletmek istediğine bağlıdır. Özel becerilere şu şekilde bazı örnekler verilebilir:"
            },
            {
              "type": "list",
              "ordered": false,
              "items": [
                "**Aşçılık:** Bir karakterin yemek yapma konusundaki ustalığını belirler.",
                "**Simyacılık:** Bir karakterin simya malzemeleri hakkında bilgisini ve bu malzemeleri kullanarak iksir oluşturabilme becerisini belirler.",
                "**Yüzücülük:** Bir karakterin suda yüzme becerisini belirler."
              ]
            }
          ]
        },
        {
          "id": "enerjiler",
          "title": "ENERJİLER VE ENERJİ KAYNAKLARI",
          "body": "",
          "mode": "rich",
          "blocks": [
            {
              "type": "heading",
              "level": 2,
              "text": "BÜYÜNÜN TEMEL MANTIĞI"
            },
            {
              "type": "paragraph",
              "text": "SLVNZ 4.0’da büyü, doğrudan “ateş atmak” veya “mana harcamak” değildir. Bir büyünün oluşması için dört ayrı katman bir araya gelir:"
            },
            {
              "type": "table",
              "header": [
                "KATMAN",
                "İŞLEV"
              ],
              "rows": [
                [
                  "Kaynak",
                  "Büyünün bedelini ve yakıtını sağlar"
                ],
                [
                  "Kanal",
                  "Kaynağın kullanıcıdan veya çevreden büyüye aktarılmasını sağlar"
                ],
                [
                  "Enerji",
                  "Büyünün temel işlevini belirler"
                ],
                [
                  "Element",
                  "Büyünün dünyada hangi biçimde görüneceğini belirler"
                ]
              ]
            },
            {
              "type": "example",
              "text": "Bir karakter düşmana alevli bir mızrak fırlatıyorsa, büyünün elementi Ateş, enerjisi büyük ihtimalle Yıkım, kaynağı Mana, kanalı ise asa, kalıntı, ritüel, içsel yetenek veya dışsal bir odak olabilir."
            },
            {
              "type": "paragraph",
              "text": "Bu ayrım oldukça önemlidir. Çünkü aynı element, farklı enerjilerle tamamen farklı büyülere dönüşebilir."
            },
            {
              "type": "table",
              "header": [
                "BÜYÜ",
                "ELEMENT",
                "ENERJİ",
                "SONUÇ"
              ],
              "rows": [
                [
                  "Ateş Oku",
                  "Ateş",
                  "Yıkım",
                  "Hasar verir"
                ],
                [
                  "Ateş Duvarı",
                  "Ateş",
                  "Koruma",
                  "Alanı kapatır"
                ],
                [
                  "Ateş Sureti",
                  "Ateş",
                  "İllüzyon",
                  "Görsel yanılsama oluşturur"
                ],
                [
                  "Ateşten Elementali",
                  "Ateş",
                  "Oluşturma",
                  "Geçici varlık/şekil oluşturur"
                ],
                [
                  "Ateşi Söndürme",
                  "Ateş",
                  "Dönüştürme",
                  "Var olan ateşi dağıtır"
                ]
              ]
            },
            {
              "type": "heading",
              "level": 2,
              "text": "ELEMENTLER"
            },
            {
              "type": "paragraph",
              "text": "Elementler, büyünün dünyada hangi doğal veya maddesel biçimde açığa çıktığını gösterir. Element, büyünün “ne yaptığı” değil, “nasıl göründüğü / hangi doğa kuvvetiyle tezahür ettiği” sorusunun cevabıdır."
            },
            {
              "type": "tabs",
              "tabs": [
                {
                  "label": "ATEŞ",
                  "blocks": [
                    {
                      "type": "paragraph",
                      "text": "Ateş, ısı, yanma, köz, alev, patlama, kavurma ve tüketimle ilişkili elementtir.\n\nAteş elementi hızlı, saldırgan ve görünürdür. Gizlenmesi zordur, çevreye yayılma riski taşır ve kontrolsüz kullanıldığında büyünün hedefinden fazlasını etkileyebilir."
                    }
                  ]
                },
                {
                  "label": "SU",
                  "blocks": [
                    {
                      "type": "paragraph",
                      "text": "Su, akış, soğutma, basınç, arındırma, sis, buz, sıvı hareketi ve yaşam ortamlarıyla ilişkili elementtir.\n\nSu elementi doğrudan hasardan çok kontrol, yönlendirme, boğma, temizleme, soğutma ve form değiştirme alanında güçlüdür."
                    }
                  ]
                },
                {
                  "label": "TOPRAK",
                  "blocks": [
                    {
                      "type": "paragraph",
                      "text": "Toprak, taş, kum, metal cevheri, kil, kristal, maden, ağırlık, yapı ve sabitlikle ilişkili elementtir.\n\nToprak elementi yavaş ama güvenilirdir. Savunma, engel, yapı, sıkıştırma, alan kontrolü ve fiziksel biçimlendirme için uygundur."
                    }
                  ]
                },
                {
                  "label": "HAVA",
                  "blocks": [
                    {
                      "type": "paragraph",
                      "text": "Hava, rüzgâr, basınç, ses, nefes, uçuş, itme, savurma ve görünmez hareketle ilişkili elementtir.\n\nHava elementi hızlı, esnek ve taktiksel bir elementtir. Doğrudan hasardan çok hareket, konum, denge bozma, ses taşıma ve alan dağıtma üzerinde etkilidir."
                    }
                  ]
                },
                {
                  "label": "YILDIRIM",
                  "blocks": [
                    {
                      "type": "paragraph",
                      "text": "Yıldırım, elektrik, ani boşalma, sinirsel şok, manyetik tepki, iletkenlik ve hızlı enerji patlamasıyla ilişkili elementtir.\n\nYıldırım elementi yüksek riskli ve yüksek etkili bir elementtir. Ani hasar, sersemletme, refleks bozma ve iletken hatlardan yayılma potansiyeli taşır."
                    }
                  ]
                },
                {
                  "label": "IŞIK",
                  "blocks": [
                    {
                      "type": "paragraph",
                      "text": "Işık, görünürlük, parlama, yansıma, gölge bastırma, renk, sıcaklık, aydınlatma ve algı yönlendirme ile ilişkili elementtir.\n\nIşık elementi burada Aydınlık Enerjisi ile karıştırılmamalıdır. Işık bir elementtir; Aydınlık ise yasak/üst düzey bir enerjidir. Işık elementi sıradan büyülerde kullanılabilir. Aydınlık enerjisi ise varoluşsal ve kutsal düzeyde tehlikeli bir güçtür."
                    }
                  ]
                }
              ]
            },
            {
              "type": "heading",
              "level": 2,
              "text": "TEMEL ENERJİLER"
            },
            {
              "type": "paragraph",
              "text": "Temel Enerjiler, büyünün işlevsel omurgasıdır. Bunlar büyünün dünyada ne yaptığına karar verir."
            },
            {
              "type": "tabs",
              "tabs": [
                {
                  "label": "YIKIM",
                  "blocks": [
                    {
                      "type": "paragraph",
                      "text": "Yıkım, var olan yapıyı bozma, parçalama, yakma, kırma, kesme, patlatma, zayıflatma veya doğrudan hasar verme enerjisidir.\n\nYıkım enerjisi en anlaşılır ama en riskli temel enerjilerden biridir. Çünkü etkisi genellikle dışa taşar. Basit bir ateş kıvılcımı bile yanlış kullanılırsa yangına, taş patlaması çökmeye, yıldırım saldırısı zincirleme sekmeye dönüşebilir."
                    }
                  ]
                },
                {
                  "label": "KORUMA",
                  "blocks": [
                    {
                      "type": "paragraph",
                      "text": "Koruma, bir varlığı, alanı, nesneyi veya sınırı dış etkilerden muhafaza etme enerjisidir.\n\nKoruma yalnızca “kalkan basmak” değildir. Bir şeyi saklamak, bastırmak, ayırmak, zararı dağıtmak, saldırının şiddetini azaltmak veya belirli bir sınır çizmek de Koruma kapsamına girer."
                    }
                  ]
                },
                {
                  "label": "OLUŞTURMA",
                  "blocks": [
                    {
                      "type": "paragraph",
                      "text": "Oluşturma, enerjiyi geçici veya yarı-kalıcı biçime sokarak madde, şekil, araç, varlık benzeri form veya çevresel etki meydana getirme enerjisidir.\n\nOluşturma, yoktan mutlak madde yaratmak değildir. SLVNZ 4.0’da özellikle Büyük Savaş sonrası dönemde Oluşturma daha sınırlı ve bedellidir. Çoğu oluşturma etkisi geçici, kırılgan, kaynak bağımlı veya çevredeki malzemeyi kullanarak çalışır."
                    }
                  ]
                },
                {
                  "label": "DÖNÜŞTÜRME",
                  "blocks": [
                    {
                      "type": "paragraph",
                      "text": "Dönüştürme, var olan bir şeyin formunu, halini, yoğunluğunu, yüzeyini, hareketini veya niteliğini değiştirme enerjisidir.\n\nDönüştürme, Oluşturma’dan ayrıdır. Oluşturma yeni bir biçim meydana getirir; Dönüştürme mevcut bir varlığı veya maddeyi başka bir duruma sokar."
                    }
                  ]
                },
                {
                  "label": "EFSUN",
                  "blocks": [
                    {
                      "type": "paragraph",
                      "text": "Efsun, zihin, duygu, arzu, korku, yönelim ve karar süreçleri üzerinde etki kuran enerjidir.\n\nEfsun mutlak zihin kontrolü değildir. En sağlıklı kullanım biçimi; duygu eğilimi yaratma, dikkati başka yöne çekme, korkuyu büyütme, güven hissi verme, öfkeyi kışkırtma, anlık tereddüt yaratma veya bir düşünceyi daha cazip hale getirme şeklindedir. Ancak üst seviyelerde varlıkları süreli kontrol eğilimine kadar gidebilmektedir."
                    }
                  ]
                },
                {
                  "label": "İLLÜZYON",
                  "blocks": [
                    {
                      "type": "paragraph",
                      "text": "İllüzyon, duyulara yönelik yanılsama, görüntü, ses, koku, hareket, parıltı, gölge veya enerjisel sahte iz oluşturma enerjisidir.\n\nİllüzyon, gerçekliği değiştirmez; algıyı değiştirir. Bu yüzden İllüzyon ile oluşturulan bir köprü üstünden yürünemez, ama hedef köprünün var olduğuna inandırılabilir. Fiziksel temas, dikkatli inceleme veya güçlü sezgi illüzyonu bozabilir."
                    }
                  ]
                },
                {
                  "label": "KEHANET",
                  "blocks": [
                    {
                      "type": "paragraph",
                      "text": "Kehanet, iz, olasılık, geçmiş yankısı, yön, gizli bağ, enerji izi ve muhtemel sonuçları sezme enerjisidir.\n\nKehanet kesin gelecek bilgisi vermemektedir. SLVNZ 4.0 için Kehanet’in en iyi kullanımı “bilgiye doğrudan sahip olmak” değil, eksik bilgiyi yön, sembol, rüya, titreşim veya olasılık olarak almaktır."
                    }
                  ]
                },
                {
                  "label": "ÇÜRÜME",
                  "blocks": [
                    {
                      "type": "paragraph",
                      "text": "Çürüme, canlı, ölü, ruhsal, bedensel veya maddesel bütünlüğün bozulmasıyla ilişkili enerjidir.\n\nÇürüme yalnızca nekromansi değildir. Paslanma, hastalık, çürüme, bedensel zayıflama, ruhsal yıpranma, ölü dokuyla etkileşim, canlılık bozumu ve eski kalıntıları uyandırma gibi alanları kapsar."
                    }
                  ]
                }
              ]
            },
            {
              "type": "heading",
              "level": 2,
              "text": "ÖZEL ENERJİLER"
            },
            {
              "type": "paragraph",
              "text": "Özel Enerjiler, doğanın sıradan mana düzeniyle kolayca yönlendirilemeyen, ilişki, anlaşma, inanç, kozmik dengesizlik veya üst varlık teması gerektiren enerji türleridir.\n\nBunlar yasak değildir; fakat herkesin erişebileceği genel büyücülük alanının dışında kalırlar."
            },
            {
              "type": "tabs",
              "tabs": [
                {
                  "label": "İNANÇ",
                  "blocks": [
                    {
                      "type": "paragraph",
                      "text": "İnanç, bir Kadim, kutsal ilke, yemin, tarikat, ocak veya manevi bağ üzerinden yönlendirilen enerjidir.\n\nİnanç enerjisi kullanıcının yalnızca teknik bilgisine bağlı değildir. Bağın gücü, sadakat, ritüel düzen, yemin ihlali, Kadim’in tavrı ve karakterin manevi konumu bu enerjiyi etkiler."
                    }
                  ]
                },
                {
                  "label": "PAKT",
                  "blocks": [
                    {
                      "type": "paragraph",
                      "text": "Pakt, bir patron, üstün varlık, kadim dışı güç, iblisvari figür, eski varlık, ejderha, gölge varlık veya bilinmeyen entiteyle yapılan anlaşmadan doğan enerjidir.\n\nPakt enerjisi öğrenilmiş bir teknikten çok, ilişkiye ve borca dayanır. Kullanıcı enerjiye sahip değildir; enerjiye erişim hakkı kazanmıştır."
                    }
                  ]
                },
                {
                  "label": "KAOS",
                  "blocks": [
                    {
                      "type": "paragraph",
                      "text": "Kaos, denge dışına taşmış, düzenlenmemiş, ihtimal yüklü ve sonuçları tam öngörülemeyen enerjidir.\n\nKaos enerjisi en güçlü özgürlük alanlarından biridir; fakat kontrol edildiğinde bile tamamen itaat etmez. Kullanıcı istediği etkinin yönünü belirleyebilir, ama etkinin nasıl açığa çıkacağı değişebilir."
                    }
                  ]
                }
              ]
            },
            {
              "type": "heading",
              "level": 2,
              "text": "YASAK ENERJİLER"
            },
            {
              "type": "paragraph",
              "text": "Yasak Enerjiler, varlığı bilinen fakat büyüyü öğreten gelenekler tarafından kullanılmaması öğütlenen enerji türleridir.\n\nBu yasak yalnızca ahlaki değildir; pratik ve varoluşsaldır. Bu enerjiler kullanıcının bedenini, ruhunu, çevresini, yaşam alanını veya kozmik düzenle ilişkisini bozabilir."
            },
            {
              "type": "tabs",
              "tabs": [
                {
                  "label": "KAN",
                  "blocks": [
                    {
                      "type": "paragraph",
                      "text": "Kan, canlı bedenin taşıdığı soy, hafıza, bedensel bağ, hastalık, ritim ve yaşam izleriyle ilişkili yasak enerjidir.\n\nKan enerjisi yalnızca kanı hareket ettirmek değildir. Kan üzerinden soy bağına, bedensel zayıflığa, hastalığa, ritüel mülkiyete, yeminlere ve bedensel kontrol alanlarına uzanabilir."
                    }
                  ]
                },
                {
                  "label": "AYDINLIK",
                  "blocks": [
                    {
                      "type": "paragraph",
                      "text": "Aydınlık, Işık elementinden farklıdır. Işık görünen, fiziksel veya algısal bir elementtir. Aydınlık, varoluşsal düzeyde arındırma, açığa çıkarma, hüküm verme, kutsal yakıcılık ve karanlığı reddetme enerjisidir.\n\nAydınlık, güvenli değildir. Kullanıcıya zarar vermiyor gibi görünse bile çevresindeki karanlık, çürüme, gizli bağ, gölge varlık ve mühürleri kışkırtabilir. Ayrıca Aydınlık, sıradan canlıların taşıyamayacağı kadar mutlak bir yönelim taşıyabilir."
                    }
                  ]
                },
                {
                  "label": "KARANLIK",
                  "blocks": [
                    {
                      "type": "paragraph",
                      "text": "Karanlık, ışığın yokluğu değildir. Enerjinin doğasını bozan, yaşamı tüketen, varoluşu içe çökerten, canlı çevreyi kurutan ve büyünün sınırlarını kirleten yasak enerjidir.\n\nKaranlık enerjisi özellikle cadı, kara ritüel, bozulmuş kalıntı, savaş sonrası yarıklar ve yasak dillerle ilişkili olabilir."
                    }
                  ]
                },
                {
                  "label": "RUH",
                  "blocks": [
                    {
                      "type": "paragraph",
                      "text": "Ruh Enerjisi, ölüler, hayaletler, benlik izleri, hatıra yankıları, musallatlar, ruhsal bağlar ve varlığın maddi beden dışındaki özüyle ilişkili yasak enerjidir.\n\nRuh enerjisi ile çalışmak, yalnızca ölülerle konuşmak değildir. Bir varlığın benliğine, hatırasına, ölüm sonrası izine veya ruhsal bütünlüğüne temas etmektir."
                    }
                  ]
                },
                {
                  "label": "YAŞAM",
                  "blocks": [
                    {
                      "type": "paragraph",
                      "text": "Yaşam Enerjisi, canlılığın büyüme, çoğalma, yenilenme, taşma, mutasyon ve varoluş gücüyle ilişkili yasak enerjidir.\n\nİlk bakışta iyileştirici gibi görünür; fakat SLVNZ 4.0’da Yaşam enerjisinin asıl tehlikesi eksikliği kadar fazlalığının da yıkıcı olmasıdır. Yaşam, kontrolsüz kaldığında iyileştirmez; sarar, büyütür, çoğaltır, ele geçirir."
                    }
                  ]
                }
              ]
            },
            {
              "type": "heading",
              "level": 2,
              "text": "ENERJİSEL KAYNAKLAR"
            },
            {
              "type": "paragraph",
              "text": "Enerjisel Kaynaklar, büyünün çalışması için harcanan yakıttır. Enerji büyünün türünü, kaynak ise büyünün bedelini belirler."
            },
            {
              "type": "table",
              "header": [
                "KAYNAK",
                "GÜVENLİK",
                "YENİLENME",
                "ANA RİSK"
              ],
              "rows": [
                [
                  "Mana",
                  "En güvenli",
                  "Çevreden/kalıntıdan/kanaldan",
                  "Vahşi tepki"
                ],
                [
                  "Ki",
                  "Görece güvenli ama sınırlı",
                  "Dinlenme, meditasyon",
                  "Beden-ruh yorgunluğu"
                ],
                [
                  "Ruh",
                  "Çok riskli",
                  "Çok yavaş veya dış ruh kaynağıyla",
                  "Ruhsal çöküş"
                ],
                [
                  "Yaşam",
                  "En tehlikeli",
                  "Doğal varoluşsal dengeye bağlı",
                  "Eksiklik/fazlalık felaketi"
                ]
              ]
            },
            {
              "type": "tabs",
              "tabs": [
                {
                  "label": "MANA",
                  "blocks": [
                    {
                      "type": "paragraph",
                      "text": "Mana, evrende vahşi biçimde akan temel büyüsel yakıttır.\n\nBüyük Savaş öncesinde mana daha erişilebilirken, 4.0 döneminde sıradan canlıların manayı doğrudan bedenlerinde kanalize etmesi çok daha zordur. Mana artık çoğunlukla dış kanallar, kalıntılar, eski büyü döneminden kalmış nesneler, özel bölgeler, nadir doğuştan yetenekliler veya kanal kurabilen kişiler aracılığıyla kullanılabilir.\n\nMana'nın güçlü yönleri:"
                    },
                    {
                      "type": "list",
                      "ordered": false,
                      "items": [
                        "En yaygın ve en güvenli kaynaktır.",
                        "Temel enerjilerle en uyumlu kaynaktır.",
                        "Eğitimli kullanıcı için kontrol edilebilir.",
                        "Büyü üretimi ve standart büyücülük için ana yakıttır."
                      ]
                    },
                    {
                      "type": "paragraph",
                      "text": "Riskleri:"
                    },
                    {
                      "type": "list",
                      "ordered": false,
                      "items": [
                        "Vahşi ve dizginsizdir.",
                        "Dış kanal aracılığıyla kullanıldığında beklenmeyen tepki verebilir.",
                        "Aynı sahnede ardışık ve yoğun kullanımda taşma riski artar.",
                        "Kalıntı veya bozuk odak üzerinden kullanılırsa büyü sapabilir."
                      ]
                    },
                    {
                      "type": "table",
                      "header": [
                        "KULLANIM DURUMU",
                        "MANA TEPKİ RİSKİ"
                      ],
                      "rows": [
                        [
                          "Basit büyü",
                          "Düşük"
                        ],
                        [
                          "Aynı enerjiyle ardışık kullanım",
                          "Orta"
                        ],
                        [
                          "Yüksek kaynak harcaması",
                          "Orta/Yüksek"
                        ],
                        [
                          "Bozuk kalıntı veya odak",
                          "Yüksek"
                        ],
                        [
                          "Yasak enerjiyle birlikte mana kullanımı",
                          "Çok Yüksek"
                        ]
                      ]
                    }
                  ]
                },
                {
                  "label": "Kİ",
                  "blocks": [
                    {
                      "type": "paragraph",
                      "text": "Ki, varlığın beden-ruh disipliniyle açığa çıkardığı içsel enerji kaynağıdır.\n\nMana gibi vahşi değildir; fakat erişimi çok daha zordur. Ki, doğuştan sahip olunan bir havuzdan ziyade disiplin, meditasyon, nefes, çakra yönlendirme, dövüş talimi ve uzun süreli bedensel farkındalıkla kullanılabilir hale gelir.\n\nKi’nin güçlü yönleri:"
                    },
                    {
                      "type": "list",
                      "ordered": false,
                      "items": [
                        "Dış mana kanalına ihtiyaç duymaz.",
                        "Daha kontrollüdür.",
                        "Savaş sanatlarıyla çok iyi birleşir.",
                        "Sessiz, sade ve düşük görünürlüklü etkiler için uygundur.",
                        "Kullanıcının beden tekniğiyle doğrudan ilişkilidir."
                      ]
                    },
                    {
                      "type": "paragraph",
                      "text": "Sınırları:"
                    },
                    {
                      "type": "list",
                      "ordered": false,
                      "items": [
                        "Miktarı azdır.",
                        "Geliştirmesi zordur.",
                        "Patlayıcı büyük büyüler için uygun değildir.",
                        "Tükendiğinde karakter bedensel ve ruhsal yorgunluğa girer."
                      ]
                    },
                    {
                      "type": "paragraph",
                      "text": "Ki Tükenme Sonuçları:"
                    },
                    {
                      "type": "table",
                      "header": [
                        "SEVİYE",
                        "SONUÇ"
                      ],
                      "rows": [
                        [
                          "Azalma",
                          "Halsizlik, refleks düşüşü"
                        ],
                        [
                          "Kritik Azalma",
                          "Titreme, nefes bozulması, odak kaybı"
                        ],
                        [
                          "Tükenme",
                          "Bayılma, ruhsal boşalma, ağır yorgunluk"
                        ],
                        [
                          "Aşırı zorlama",
                          "Kalıcı hasar veya ölüm riski"
                        ]
                      ]
                    }
                  ]
                },
                {
                  "label": "RUH",
                  "blocks": [
                    {
                      "type": "paragraph",
                      "text": "Ruh Kaynağı, varlığın benlik özü, ruhsal bütünlüğü ve maddi bedenin ötesindeki varoluş bağından harcanan kaynaktır.\n\nKi’den daha derindir ve daha tehlikelidir. Ki dinlenme ve meditasyonla toparlanabilirken, Ruh kaynağı hızlı yenilenmez. Ruh kullanımı uzun süreli bekleme, özel ritüeller, dış ruh kaynağı veya çok nadir manevi onarım gerektirir.\n\nRuh kaynağının güçlü yönleri:"
                    },
                    {
                      "type": "list",
                      "ordered": false,
                      "items": [
                        "Ruhsal varlıklar, musallatlar, ölüler ve benlik izleri üzerinde etkilidir.",
                        "Mana çalışmadığında bile bazı eşiklerde iş görebilir.",
                        "Çok derin ve kalıcı etkiler yaratabilir.",
                        "Beden dışı varlıklarla temas kurabilir."
                      ]
                    },
                    {
                      "type": "paragraph",
                      "text": "Riskleri:"
                    },
                    {
                      "type": "list",
                      "ordered": false,
                      "items": [
                        "Kullanıcının özünü eksiltir.",
                        "Ruh seviyesi düştükçe karakter yorulur, donuklaşır, çöker.",
                        "Aşırı kullanım karakterin benliğinde çatlak yaratabilir.",
                        "Tükenirse geride boş beden kalabilir."
                      ]
                    },
                    {
                      "type": "paragraph",
                      "text": "Ruh Kaynağı Kullanım Tablosu:"
                    },
                    {
                      "type": "table",
                      "header": [
                        "DURUM",
                        "SONUÇ"
                      ],
                      "rows": [
                        [
                          "Hafif kullanım",
                          "Ruhsal yorgunluk, soğuma, huzursuzluk"
                        ],
                        [
                          "Orta kullanım",
                          "Duygu silikleşmesi, anı bulanıklığı"
                        ],
                        [
                          "Ağır kullanım",
                          "Benlik çatlağı, musallatlara açıklık"
                        ],
                        [
                          "Kritik kullanım",
                          "Ruh kopması, bedenin boşalması"
                        ],
                        [
                          "Tükenme",
                          "Ölüm"
                        ]
                      ]
                    }
                  ]
                },
                {
                  "label": "YAŞAM",
                  "blocks": [
                    {
                      "type": "paragraph",
                      "text": "Yaşam Kaynağı, varlığın doğrudan varoluşsal canlılık gücüdür.\n\nBu kaynak en tehlikeli kaynaktır. Çünkü hem eksikliği hem fazlalığı ölümcül olabilir. Mana taşabilir, Ki tükenebilir, Ruh aşınabilir; fakat Yaşam kaynağı doğrudan “varlığın var olma dengesi” ile ilgilidir.\n\nYaşam kaynağının güçlü yönleri:"
                    },
                    {
                      "type": "list",
                      "ordered": false,
                      "items": [
                        "Çok güçlü iyileştirme, büyütme ve canlılık etkileri yaratabilir.",
                        "Ölüm eşiğindeki varlıklara müdahale edebilir.",
                        "Bitki, et, kemik, organik madde ve canlı formlar üzerinde olağanüstü etkilidir.",
                        "Bazı yasak ritüellerde başka kaynakların yerine geçebilir."
                      ]
                    },
                    {
                      "type": "paragraph",
                      "text": "Riskleri:"
                    },
                    {
                      "type": "list",
                      "ordered": false,
                      "items": [
                        "Azalırsa varlık çöker.",
                        "Fazlalaşırsa varlık kontrolsüz biçimde sarılır.",
                        "Canlı formlara tutunup yayılabilir.",
                        "Bilinci bastırabilir.",
                        "Bedeni mutasyona, aşırı büyümeye veya varlık kaymasına sürükleyebilir."
                      ]
                    },
                    {
                      "type": "paragraph",
                      "text": "Yaşam Kaynağı Dengesizliği:"
                    },
                    {
                      "type": "table",
                      "header": [
                        "DURUM",
                        "SONUÇ"
                      ],
                      "rows": [
                        [
                          "Hafif eksilme",
                          "Solgunluk, halsizlik, iyileşme yavaşlığı"
                        ],
                        [
                          "Orta eksilme",
                          "Organik zayıflama, bilinç bulanıklığı"
                        ],
                        [
                          "Ağır eksilme",
                          "Yaşamsal çöküş, ölüm riski"
                        ],
                        [
                          "Hafif fazlalık",
                          "Aşırı canlılık, ateş, büyüme sancısı"
                        ],
                        [
                          "Orta fazlalık",
                          "Doku taşması, bitkisel/organik yayılma ve yoğun acı/ağrı"
                        ],
                        [
                          "Yarıya yaklaşan sarılma",
                          "Bilinç kaybı, kontrolden çıkma"
                        ],
                        [
                          "Tam sarılma",
                          "Varlık dönüşümü veya kaybı"
                        ]
                      ]
                    }
                  ]
                }
              ]
            },
            {
              "type": "heading",
              "level": 2,
              "text": "KANALLAR"
            },
            {
              "type": "paragraph",
              "text": "4.0’da kaynak tek başına büyüye dönüşmez. Kaynağın büyüye aktarılması için bir **kanal** gerekir."
            },
            {
              "type": "table",
              "header": [
                "KANAL",
                "AÇIKLAMA"
              ],
              "rows": [
                [
                  "Odaklayıcı",
                  "Asa, tılsım, kristal, mühür, yüzük"
                ],
                [
                  "Kalıntı",
                  "Büyük savaş öncesinden kalmış enerjisel nesne"
                ],
                [
                  "Ritüel",
                  "Söz, hareket, malzeme ve zamanla kurulan geçici kanal"
                ],
                [
                  "İçsel kanal",
                  "Nadir doğuştan yetenek, Sahir/Sahire benzeri yapı"
                ],
                [
                  "Dışsal kanal kurucu",
                  "Kanal açabilen kişi, varlık veya eşya"
                ],
                [
                  "Mekân kanalı",
                  "Eski enerjisel bölgeler, enerjisel tesir noktaları, kadim izler"
                ],
                [
                  "İlişki kanalı",
                  "Pakt veya inanç gibi ilişki temelli erişim"
                ]
              ]
            }
          ]
        },
        {
          "id": "yetenekler",
          "title": "YETENEKLER",
          "mode": "rich",
          "blocks": [
            {
              "type": "heading",
              "level": 2,
              "text": "YETENEKLER"
            },
            {
              "type": "paragraph",
              "text": "Karakterlerin nitelikleri, becerileri ve enerjilerinin yanı sıra bunları da dâhil ederek kullanabileceği yetenekleri bulunmaktadır. Bu yetenekler oyuncunun karakterinin yürümesini istediği yola göre şekillenmektedir. Karakter yetenekleri, fiziksel ve enerjisel olmak üzere iki ayrı dalda oluşmaktadır."
            },
            {
              "type": "paragraph",
              "text": "Fiziksel yetenekler, kaynak olarak karakterde SOLUK tüketirken, enerjisel yetenekler MANA, RUH, Kİ ve YAŞAM enerjisi tüketebilirler. Ancak, bazı fiziksel yeteneklerin de enerjisel kaynaklar tüketmesi mümkün olabilir."
            },
            {
              "type": "tabs",
              "tabs": [
                {
                  "label": "FİZİKSEL YETENEKLER",
                  "blocks": [
                    {
                      "type": "paragraph",
                      "text": "Fiziksel yetenekler, çoğunlukla yakın dövüş konusunda ustalaşan ya da menzilli araçlar kullanan karakterlerin ihtiyaç duyduğu yeteneklerdir. Genellikle kas gücü gerektirdiği için karakterlerin SOLUK değerlerini tüketen fiziksel yetenekler, kimi zaman enerji ile harmanlanarak farklı etkiler doğurabilen yeteneklere dönüşebilmektedir. Fiziksel yeteneklerin bu şekli Savaş Sanatı olarak adlandırılmaktadır."
                    },
                    {
                      "type": "paragraph",
                      "text": "SLVNZ 4.0 sisteminde fiziksel yetenekler, genel yetenekler ve yetkinlik yetenekleri olarak ikiye ayrılır. Genel yetenekler, karakterlerin herhangi bir yetkinlik şartı gerektirmeksizin mücadelede kullanabileceği yetenekleri nitelendirirken, yetkinlik yetenekleri, yetkinlik sahibi oldukları silahlar ve beceriler çerçevesinde gerçekleştirebilecekleri daha özel yetenekleri belirtir. Her fiziksel silah yetkinliğinin kendine özgü bir yetenek ağacı ve dalları bulunmaktadır. Karakterler, bu dala giriş yapmak üzere 500 DP. toplayacakları bir sürece girerek, ağaca giriş yaptıktan sonra farklı dallara yönelebilirler."
                    }
                  ]
                },
                {
                  "label": "ENERJİSEL YETENEKLER",
                  "blocks": [
                    {
                      "type": "paragraph",
                      "text": "Enerjisel yetenekler (Büyüler), doğada bulunan kaotik enerjinin farklı kanallarca çevreye veya kalıntılara sinmiş, belirli sembollerce nesnesel veya doğal akıştan geçirilerek meydana getirilebilen veya tamamen serbest bir biçimde olağan dışı meydana gelebilen sıradışı yeteneklerdir. Evrende herhangi bir insansı karakterin enerjisel yetenek kullanması sıradan bir durum değildir."
                    },
                    {
                      "type": "heading",
                      "level": 3,
                      "text": "ENERJİSEL YETENEK KULLANIMI"
                    },
                    {
                      "type": "paragraph",
                      "text": "Karakterler, istisnai durumlarda basit sayılabilecek enerjisel etkileri meydana getirebilirler. Bu durumlar, kalıntılar gibi karakterlerin üstünde taşıdığı nesneler aracılığıyla gerçekleşmiyorsa, çoğunlukla karakterin belirli vücut hareketleri beraberinde fonetik biçimde uyum sağlayacağı sözler ile birleştirerek gerçekleştireceği bir zincirleme yapı olarak karşılaşılır. Karakterler, bu şekilde enerjisel yetenekleri gerçekleştirebilmek için beraberlerinde MANA rezervi bulundurmalıdır. Aksi halde enerjisel yetenekleri bu şekilde kendi başlarına gerçekleştiremezler."
                    }
                  ]
                },
                {
                  "label": "SAVAŞ SANATI",
                  "blocks": [
                    {
                      "type": "paragraph",
                      "text": "Savaş sanatları, özellikle fiziksel yetenekler gibi kas gücüne dayanan ancak bu gücü enerjisel yönlendirmelerle harmanlayan özel savaş manevralarının ortaya çıkarttığı etkilere sahiptir. Bu etkiler, çoğunlukla karakterlerin savaştıkları silahların üstünden uyandırılabilecek veya yaptıkları hamleler ile birlikte meydana gelecek çevresel tepkiler şeklinde yorumlanabilir."
                    }
                  ]
                }
              ]
            },
            {
              "type": "heading",
              "level": 3,
              "text": "ODAK VE KONSANTRASYON"
            },
            {
              "type": "paragraph",
              "text": "İki yetenek türünde de anlık gerçekleşen ya da bir süre boyunca mevcut kalan etkiler bulunabilmektedir. Bir süre boyunca etkin kalan bazı yeteneklerin sürdürülebilmesi için odak ya da konsantrasyon gereklidir ve karakterlerin odaklanma/konsantre olma konusunda sınırlılıkları bulunmaktadır. Odak, fiziksel yetenekler için kullanılırken; konsantrasyon, enerjisel yetenekler için kullanılmaktadır."
            },
            {
              "type": "paragraph",
              "text": "Bir yetenek üstünde odaklanırken ya da konsantre olurken, eğer karakter bu konuda yetkin değilse birden fazla yetenek üstünde bu yoğunlaşmayı gerçekleştiremez.\n\nKonsantrasyon gerektiren yeteneklerde, karakter zihnini ortaya çıkardığı enerjinin dağılmadan dışarıda kalabilmesi için kendini odaklamış olur. Odak gerektiren yeteneklerde ise karakter, algılarını yeteneğin akışına odaklayarak duruşunu korur. Karakterlerin odaklanma ya da konsantrasyon sırasında alacağı herhangi bir hasar, odaklanmayı/konsantrasyonu bozulma tehlikesine sokar. Karaktere isabet eden saldırının türüne ve kuvvetine göre GM bir sınır belirlemekle yükümlüdür. Eğer belirlenmek istenmezse Sayfa 1 üstünde bulunan başarı tablosu baz alınabilir. Ancak, bu durumda konsantrasyon/odağın sadece bozulma ve korunma durumu bulunmaktadır. Kritik başarısızlık, şartlı başarı ve kritik başarı durumları böyle bir senaryoda devre dışı bırakılmalıdır.\n\nKarakterler odak ya da konsantrasyon yapabilme kapasitelerini geliştirebilirler. Bu durum, karakterlerin odak yuvası ve konsantrasyon yuvası sayılarını artırması demektir. Aktif bulunan her konsantrasyon ve odak gerektiren yetenek için bir yuva doldurulur, yetenek sona erdikten sonra boşaltılır. Konsantrasyon ve odak yuvalarının nasıl geliştirildiğine Karakter Gelişimi bölümünden bakabilirsiniz."
            }
          ]
        },
        {
          "id": "savas-mucadele",
          "title": "SAVAŞ & MÜCADELE",
          "mode": "rich",
          "blocks": [
            {
              "type": "heading",
              "level": 2,
              "text": "SAVAŞ & MÜCADELE"
            },
            {
              "type": "paragraph",
              "text": "Karakterler tek başlarına kalkıştıkları eylemlerde başarı düzeyini belirlemek için kullandıkları zar sistemini karşılıklı girdikleri savaşlar veya mücadeleler için de kullanırlar. İki karakterin birbirine kılıç savurması, belirli enerjilerin etkisi altında bırakması, güreş tutması vb. durumlarda savaş ve mücadele sistemi devreye girer.\n\nEn basit hali ile bunun gibi durumlarda iki taraf da birer zar kullanır. Sayısal değeri yüksek gelen taraf karşılaşmadan galip çıkar. Ancak, silahlı mücadeleler, enerji yönlendirmenin kullanıldığı durumlar gibi özel anlarda, gerçekleştirilen eylemin niteliğine göre kullanılacak zar sayıları değişmektedir."
            },
            {
              "type": "example",
              "text": "Örneğin, birbirine karşı çift elli kılıçlarla savaşan iki karakterin mücadelesinde; kılıcı savuran taraf, kılıcın isabetini belirlemek için bir zar, kılıcı savurma kuvvetini belirlemek için ise ikinci bir zar kullanır. **Fiziksel zarlar ile oynanan bir ortamda bu zarların sırayla atılması tavsiye edilir.** Dijital çevrimiçi bir ortamda ise topluca atılabilir, ancak gelen sonuçlar soldan sağa sıralanacak şekilde önce isabet, ardından kuvvet şeklinde olmalıdır."
            },
            {
              "type": "paragraph",
              "text": "Yukarıdaki anlatım ışığında, savaş ve mücadele durumlarında takip edilebilecek durumlar şu şekilde birbirinden ayrılabilir:"
            },
            {
              "type": "heading",
              "level": 3,
              "text": "SIRADAN MÜCADELE"
            },
            {
              "type": "paragraph",
              "text": "Sıradan mücadeleler; güreş tutma, birbirini engelleme, yalan söyleme, ikna etme gibi karşılıklı başarma ve kaybetme durumları değerlendirilir. Bu durumlarda genellikle iki taraf da birer adet zar kullanır. Yardımcı puanlarla birlikte sayısal üstünlüğe sahip olan taraf mücadelenin galibi olur."
            },
            {
              "type": "example",
              "text": "Majik, kalabalık bir sokakta dolaşırken dalgın yürüyen bir adamın cebinden altın kesesini almaya çalışmak için El Çabukluğu özel becerisini kullanır. Buna karşılık dalgın adam için bu durumu zamanında fark edip etmeyeceğini belirlemek için FARKINDALIK beceri zarı kullanılır."
            },
            {
              "type": "heading",
              "level": 3,
              "text": "SAVAŞ"
            },
            {
              "type": "paragraph",
              "text": "Savaş anında karakterler genellikle saldırı eylemlerini belirlemek üzere birden fazla zar kullanırlar. Bu durumlar genellikle **ÇEVİKLİK, KUVVET, İSABET, KAYNAK KULLANIMI, ENERJİ** gibi nitelikler üzerinden belirlenir. Bir savaş anında gelişebilecek eylemler ve bu eylemler için kullanılabilecek zar sıfatları sınıflandırılabilir."
            },
            {
              "type": "tabs",
              "tabs": [
                {
                  "label": "YAKIN MENZİLLİ SALDIRILAR",
                  "blocks": [
                    {
                      "type": "paragraph",
                      "text": "Yakın menzilli herhangi bir silah ile saldırıda bulunan bir karakter, özel ya da ekleme bir durum olmadığı sürece iki adet zar kullanır. Bu zarlar sırayla atılmalı ya da dijital bir ortamda kullanılıyorsa gelen sonuç soldan sağa sıralanacak şekilde, ilk olarak İSABET, ikinci olarak HASAR/KUVVET olmak üzere sayısal değerlere dökülür."
                    }
                  ]
                },
                {
                  "label": "UZAK MENZİLLİ SALDIRILAR",
                  "blocks": [
                    {
                      "type": "paragraph",
                      "text": "Yakın menzilli saldırılara benzer olarak, uzun menzilli saldırılarda da genel olarak iki zar kullanılır. Ancak, bahsedilen menzilli saldırı enerji yönlendirmeyi içeriyorsa, bu durumda kullanılacak zarların sayısı ikiden fazla olacak şekilde enerjisel yeteneğin özelliklerine göre değişebilmektedir. Enerjisel yetenekler dışında sıradan olarak bahsedilebilecek menzilli saldırılarda (Yay kullanımı gibi) MENZİLLİ İSABET ve KUVVET zarı kullanılır. Ancak, kuvvet gerektirmeyen bazı menzilli araçlar kullanılırken (Tatar Yayı, Musket gibi) sadece atışı isabet ettirmek için bir zar kullanılır. Bunun sebebi bu tarz menzilli silahların kendilerine özgü sabit bir hasarının bulunmasıdır."
                    }
                  ]
                }
              ]
            },
            {
              "type": "heading",
              "level": 3,
              "text": "Savunma"
            },
            {
              "type": "paragraph",
              "text": "Karakterler kendilerine yönelmiş herhangi bir saldırıdan kaçınmak ya da korunmak üzere bir savunma zarı kullanabilirler. Bu tür zarlar genellikle **KAÇINMA, BLOKLAMA** ya da **DAYANIKLILIK** kullanılarak atılır."
            },
            {
              "type": "tabs",
              "tabs": [
                {
                  "label": "KAÇINMA",
                  "blocks": [
                    {
                      "type": "paragraph",
                      "text": "Kaçınma durumlarında gelen saldırının isabet zarının sayısal değerini kaçınma zarı ile geçmek yeterlidir. Ancak rakibin isabet değeri ile karakterin kaçınma değeri arasındaki fark ne kadar fazla ise, karşı tarafın gerçekleştirdiği saldırının isabet ettiği nokta, rakibin saldırmak istediği noktaya o kadar yakın olmaktadır."
                    }
                  ]
                },
                {
                  "label": "BLOKLAMA",
                  "blocks": [
                    {
                      "type": "paragraph",
                      "text": "Savaşta bloklama iki farklı temele dayanır: Silahla Bloklama & Kalkanla bloklama"
                    }
                  ]
                }
              ]
            },
            {
              "type": "tabs",
              "tabs": [
                {
                  "label": "SİLAHLA BLOKLAMA",
                  "blocks": [
                    {
                      "type": "paragraph",
                      "text": "Karakterler kendilerine yönelen yakın menzilli saldırıları silahlarıyla bloklamayı tercih edebilirler. Bir karakterin silahla bloklama yapabilmesi için bu beceri konusunda yetkinlik sahibi olması gerekir. \n\nSilahla gerçekleştirilecek bloklama hamleleri, karakterlerin **çeviklik** ve ilgili silaha yönelik **blok becerisi** üzerinden hesaplanır. Bir karakter, silahıyla bir saldırıyı bloklayabilmesi durumunda *soluk* tüketir."
                    }
                  ]
                },
                {
                  "label": "KALKANLA BLOKLAMA",
                  "blocks": [
                    {
                      "type": "paragraph",
                      "text": "Bir karakter, kuşanmış olduğu kalkan türüne göre farklı şekillerde bloklama gerçekleştirebilir. Buckler ve küçük boyutta karakteri tamamen kapatmayan hafif kalkanlar, karakterin *çeviklik* niteliği ve *kalkan blok* becerilerinin toplamıyla belirlenir. Bu kalkan türlerinde mevcut blok zarının aşılması durumunda darbe doğrudan karaktere ulaşır.\n\nAncak Orta, Büyük ve Kule Kalkan gibi daha büyük kalkan türlerinde, çeviklik değeri alınmadan sadece ilgili kalkanın blok becerisi ile bir hesaplama gerçekleştirilir. Bloklama durumunda, bloklayan karakter *soluk tüketir* ancak saldırının kendisine ulaşmasını engellemiş olur. Bloklama yapan karakterin blok zarının aşılması durumunda, 6 puanlık farka kadar karakter bloklamayı gerçekleştirebilir, uygulanan kuvvetten bağımsız olarak aşılan fark sebebiyle fazladan soluk tüketir."
                    },
                    {
                      "type": "heading",
                      "level": 3,
                      "text": "TAM BLOK POZU"
                    },
                    {
                      "type": "paragraph",
                      "text": "Karakterler, Orta ve daha büyük kalkan türleri ile *tam blok* pozuna geçiş yapabilirler. Bu poza geçiş yapmak bir eylemdir. Bir karakter tam blok pozundayken,\n\n- Hareket mesafesi yarıya düşer.\n- Çevresel farkındalığı azalır.\n- Soluğunu toparlayamaz.\n- Gerçekleştireceği yakın mesafeli fiziksel saldırılar dezavantajlı kuvvet ve isabet alır.\n- Uzak menzilli enerjisel veya fiziksel saldırı gerçekleştiremez.\n+ Kalkanıyla baktığı yönden gelecek bütün fiziksel saldırıları garanti bir şekilde bloklar.\n\nKarakter, soluğu kesilene veya kendisi bozana kadar turlar boyunca tam blok pozunu koruyabilir. Ancak kendi isteğiyle tam blok pozundan çıkması durumunda, bir sonraki turuna kadar tam blok pozuna tekrar giremez (Pozdan çıkmak ek eylemdir)."
                    }
                  ]
                }
              ]
            },
            {
              "type": "heading",
              "level": 3,
              "text": "ENERJİSEL YETENEK KULLANIMI"
            },
            {
              "type": "paragraph",
              "text": "Enerjinin yönlendirilmesi ve kullanımı basit formlarda başlasa da geliştikçe karmaşıklaşan, dolayısıyla zar kullanımı açısından da farklı yaklaşımlar isteyebilen bir durumdur. Çoğu enerji kullanımı için iki ya da üç zar kullanılsa da büyünün tanımı ya da işlevi özelleştikçe, bu işleve uyum sağlamak adına enerji kullanımına farklı türde zarlar eklenebilir."
            },
            {
              "type": "paragraph",
              "text": "*Enerji kullanımı iki farklı temele dayandırılır. Bu temeller, İsabet temelli ve yoğunluk temelli enerjiler olarak nitelendirilir.*"
            },
            {
              "type": "tabs",
              "tabs": [
                {
                  "label": "İSABET TEMELLİ ENERJİLER",
                  "blocks": [
                    {
                      "type": "paragraph",
                      "text": "Tekil bir hedef belirlenerek, bu hedefe isabet ettirilmeye çalışılan enerjileri ifade eden yetenek tipleridir. Bu tip enerjilerde her zaman ilk olarak **İSABET** becerisi baz alınarak bir zar kullanılır. Sonrasında enerjiye yönelik yoğunluk ve duruma yönelik element, etki süresi vb. etkenler için ayrı zarlar kullanılabilir."
                    }
                  ]
                },
                {
                  "label": "YOĞUNLUK TEMELLİ ENERJİLER",
                  "blocks": [
                    {
                      "type": "paragraph",
                      "text": "Genel olarak isabet gerektirmeksizin bir varlığa ya da bir bölgeye yoğunlaşarak belirli bir etkinin oluşturulmaya çalışıldığı enerjilerdir. Bu tür enerjiler, zihinsel saldırılar, bir alanda patlama, yanma, erime vb. etkiler oluşturma, bir madde üstünde farklı etkilere sebep olma gibi durumları içermektedir. İsabet temelli enerjilerde olduğu gibi yoğunluk temelli enerjilerde de duruma göre alan, etki süresi, mesafe gibi farklı etkenler göz önünde bulundurularak farklı zar kullanımları eklenebilir."
                    }
                  ]
                }
              ]
            },
            {
              "type": "heading",
              "level": 3,
              "text": "MÜCADELEDE ODAK & KONSANTRASYON"
            },
            {
              "type": "paragraph",
              "text": "Fiziksel ya da enerjisel bir yeteneğini odak/konsantrasyon durumunda bulundurmak, karakterlerin bu durumlara yönelik yuvalarını dolduran eylemlerdir. İki durum da birbirine süreç olarak benzerlik gösterebilse de bu durumların korunması konusu birbirinden farklılık gösterebilir."
            }
          ]
        },
        {
          "id": "savas-sistemi",
          "title": "SAVAŞ SİSTEMİ",
          "mode": "rich",
          "blocks": [
            {
              "type": "heading",
              "level": 2,
              "text": "SAVAŞ SİSTEMİ"
            },
            {
              "type": "heading",
              "level": 3,
              "text": "SAVAŞ DÜZENİ"
            },
            {
              "type": "tabs",
              "tabs": [
                {
                  "label": "KARE SAVAŞ DÜZENİ",
                  "blocks": [
                    {
                      "type": "image",
                      "src": "https://slvnz.github.io/resources/webpage/svg/square-battle.svg",
                      "alt": "",
                      "caption": "Kare savaş düzeni",
                      "width": "300"
                    },
                    {
                      "type": "paragraph",
                      "text": "Kare savaş sistemi, SLVNZ 4.0'ın mücadele eylemlerinin ve hareketlerinin işlenmesi için temeli oluşturur. Savaş sisteminde varlıkların her biri bir Kare içinde yer alırlar ve birimlerin hareketleri, gerçekleşecek eylemlerin mesafeleri ve kapsayacakları alanlar birim olarak belirlenmiş tekil kare yuvalar üzerinden hesaplanır.\n\nSavaş düzeninde, karakterin baktığı yöndeki ve bu yönün içerdiği birimin sağ ve sol bitişiğindeki birimler **net alan** olarak isimlendirilir."
                    },
                    {
                      "type": "list",
                      "ordered": false,
                      "items": [
                        "Karakter, net alandaki varlıklara normal şekilde fiziksel saldırıda bulunabilir.",
                        "Karakter, net alandan alacağı saldırılara karşı normal şekilde savunma & kaçınma hamleleri yapabilir."
                      ]
                    },
                    {
                      "type": "paragraph",
                      "text": "Savaş düzeninde net alan, net alanlardan karakterin çevresine doğru dolaşırken **SOL** ve **SAĞ** birimler bulunur."
                    },
                    {
                      "type": "list",
                      "ordered": false,
                      "items": [
                        "Karakter, **BU ALANLARDAN** gelen fiziksel saldırılara karşı savunma yapmak için herhangi bir eksi puan almaz. Ancak saldırıyı savuşturma veya saldırıdan kaçınma süreçleri koşullara bağlı olarak değişiklik gösterir.",
                        "Karakter, elinin boş bulunduğu taraftan gelen bir saldırıya karşı kaçınma yapmak zorundadır. Saldırının geldiği taraftaki elinde en az orta boy kalkan bulunduruyorsa, bloklamayı avantajlı gerçekleştirir.",
                        "Karakter, altıgen sisteminde olduğu gibi sadece net alan sınırlarında bulunan varlıklara herhangi bir şekilde bakış yönünü değiştirmeden saldırıda bulunabilir. Ancak, silah bulundurduğu elinin olduğu tarafa da bakış açısını değiştirmeden saldırıda bulunabilir (Sol elinde silah bulunduran biri sol tarafa saldırabilir, ancak sağ tarafa saldırmak için o bölgeye net alan olacak şekilde yüzünü dönmelidir).",
                        "Karakter, bu alanlardan gelecek menzilli fiziksel saldırıların farkındadır ve yukarıdaki kuralları gözeterek savunma & kaçınma yapabilir."
                      ]
                    },
                    {
                      "type": "paragraph",
                      "text": "Karakterin baktığı yönün sağ ve sol arkasındaki birimler **eşik alan** olarak isimlendirilir."
                    },
                    {
                      "type": "list",
                      "ordered": false,
                      "items": [
                        "Karakter, eşik alandan gelen yakın mesafeli fiziksel saldırılara karşı -2 negatif değer alarak savunma gerçekleştirir.",
                        "Karakter, eşik alan tarafından gelecek uzun menzilli fiziksel saldırıyı yapacak kişinin orada olduğunun farkındaysa, gelen saldırıya karşı farkındalık zarı kullanır. Farkındalık 10'dan yüksek gelirse gelen fiziksel menzilli saldırıyı fark ederek kaçınmaya çalışabilir. Saldıranın okçuluk/atıcılık/isabet/nişancılık ve kuvvet yüksekliğine bağlı olarak saldırının başarı düzeyi belirlenir."
                      ]
                    },
                    {
                      "type": "paragraph",
                      "text": "Karakterin baktığı yönün tam tersinde — yani arkasında — kalan birim **kör alan** olarak isimlendirilir."
                    },
                    {
                      "type": "list",
                      "ordered": false,
                      "items": [
                        "Karakter, kör alandan gelen yakın mesafeli fiziksel saldırılara karşı, eğer saldırıyı yapan kişinin arkasında olduğunun farkındaysa dezavantaj ile kaçınma gerçekleştirmeye çalışır. **Bloklama** şeklinde bir savunma bu pozisyona karşı gerçekleştirilemez.",
                        "Karakter, kör alandan gelecek fiziksel bir uzak menzilli saldırıya karşı başka bir varlık tarafından tepki olarak uyarılmıyor veya buna özel bir sistemi yoksa savunma veya kaçınma gerçekleştiremez."
                      ]
                    }
                  ]
                },
                {
                  "label": "BLOK SİSTEMİ",
                  "blocks": [
                    {
                      "type": "image",
                      "src": "https://slvnz.github.io/resources/webpage/svg/square-block.svg",
                      "alt": "",
                      "caption": "Kare blok sistemi",
                      "width": "300"
                    },
                    {
                      "type": "paragraph",
                      "text": "Fiziksel mücadelelerde kaçınma genel bir standarda sahip basit bir yapıda olsa da bir kalkanla bloklamanın koşullara bağlı değişkenlikleri bulunmaktadır. Bu değişkenler dahilinde, bloklama sistemi kare ve altıgen sistem üzerinde farklılıklarıyla incelenebilir. Kalkanlar genel kullanım şekilleriyle sol elde kuşanıldıkları için, şemalar sol kullanım üzerinden bir görsellik sunmaktadır. Kalkanın diğer tarafta kullanım durumunda, aynı sistem karakterin sağ tarafı için geçerlidir."
                    },
                    {
                      "type": "heading",
                      "level": 3,
                      "text": "KÜÇÜK KALKANLAR & SİLAHLAR"
                    },
                    {
                      "type": "paragraph",
                      "text": "Küçük kalkanlar, karakteri önemli ölçüde kapatma özelliğine sahip olmadıkları için çoğunlukla bireysel ölçekte fiziksel saldırıları engellemek ve savuşturmak üzere kullanılır. Sonuçları bire bir aynı olmasa da silahlar ve küçük kalkanlar aynı sistem yapısına tabidir."
                    },
                    {
                      "type": "list",
                      "ordered": false,
                      "items": [
                        "Küçük kalkanlar bloklamak için ek puanlarını karakterin **ÇEV** niteliğinden edinirler.",
                        "Silahlar bu ek puanı kendilerine ait özel **BLOK** niteliğinden edinirler.",
                        "Daha büyük boyutta kalkanlarda bloklama eyleminin zarı düşük kalsa bile arada oluşacak puan farkına bağlı olarak kısmi başarı sağlanabilirken, silahlar ve küçük kalkanlarda kaçınma durumundaki gibi başarısız olunur."
                      ]
                    },
                    {
                      "type": "heading",
                      "level": 3,
                      "text": "ORTA KALKANLAR"
                    },
                    {
                      "type": "paragraph",
                      "text": "Orta kalkanlar, karakteri önemli ölçüde kapatma özelliğine sahiptir. Bu özellikler hem ağırlıkları hem de büyüklükleri sebebiyle karakterin hareket kabiliyeti üzerinde olumsuz etkilere sebep olmaktadır. Ancak, bu duruma karşılık karaktere gelecek fiziksel hamlelere karşı korunak sağlamaktadır."
                    },
                    {
                      "type": "list",
                      "ordered": false,
                      "items": [
                        "Orta kalkan kullanan bir karakter, **NORMAL ALANLAR** tarafından gelecek yakın menzilli fiziksel saldırılara karşı normal şekilde **BLOK BONUSU** edinerek bloklama yapabilir (Kalkandan gelecek blok aşırtma sınırı).",
                        "Eğer karaktere gelecek saldırı **NET ALAN** tarafından geliyorsa, karakter bloklama eylemine **AVANTAJ** alır.",
                        "Eğer karaktere gelecek saldırı zor alan tarafından geliyorsa, karakter bloklama eylemine **DEZAVANTAJ** alır."
                      ]
                    },
                    {
                      "type": "heading",
                      "level": 3,
                      "text": "KULE KALKANLAR"
                    },
                    {
                      "type": "paragraph",
                      "text": "Kule kalkanlar, karakterlerin hareketlerini ve **ÇEV** niteliklerini önemli ölçüde düşürürken korunak durumunu aynı ölçüde yükselten yapıya sahiptir. Bir karakter, orta kalkanlarda olduğu gibi kule kalkanlarda da blok bonusu becerisi üzerinden bloklama gerçekleştirir, ancak kule kalkanı tam blok pozuna geçirdiği zaman stamina değeri tükenene ya da kalkan işlev görmez hale gelene kadar saldırıları kesinlikle bloklar."
                    },
                    {
                      "type": "heading",
                      "level": 3,
                      "text": "BLOKLAMADA DAYANIKLILIK"
                    },
                    {
                      "type": "paragraph",
                      "text": "Bloklama, karaktere üstün korunak sağlasa da karakter tarafından kaynak kullanımı denetimi gerektiren bir süreçtir. Bir karakter, saldırı blokladıkça kalkanı üzerinde hasar alır. Kalkanın materyalinin zarar görmesinin yanı sıra, karakter arka arkaya kuvvetli saldırılar bloklamaya başlarsa DAY niteliği üzerinden bir mücadeleye girer. Bu mücadelede, bloklanan her kuvvetli saldırı sonrasında karakterin bir miktar soluk kaynağı geçici olarak tükenmeye başlar.\n\nKarakter bu kaynağı tüketene kadar bloklama yapmayı tercih ederse, soluk kaynağı 0'a düştüğü veya dengesi bozulduğu zaman karakterin gardı kırılır ve kırılgan pozuna girer. Bu pozdayken alacağı sonraki ilk yakın menzilli saldırı kritik bir isabetle gerçekleşir. Eğer karakter stamina kaynağı tükenmeden blok yapmaya ara verirse, ara verdiği turlar boyunca sabit bir şekilde kaynağın eriyen miktarı yenilenmeye başlar."
                    }
                  ]
                }
              ]
            },
            {
              "type": "heading",
              "level": 3,
              "text": "SAVAŞ EYLEMLERİ"
            },
            {
              "type": "paragraph",
              "text": "Bu savaş düzenine göre karakterler varsayılan olarak şunları gerçekleştirebilir:"
            },
            {
              "type": "list",
              "ordered": false,
              "items": [
                "İnsansı varlıkların temel hareket sınırı 4 birimdir. Niteliklerden her **+2 ÇEV** başına insansı varlıklar karasal hareketlerine **+1 birim hareket mesafesi** kazanır.",
                "Çevresinde kendine gelen bir saldırıya karşı **TEPKİ EYLEM** kullanarak bakış yönünü saldırıya yönlendirebilir. Eğer **KÖR NOKTADAN** gelen bir saldırıya karşı yapıyorsa, sadece kaçınma hareketi gerçekleştirebilir. Bu durumda kaçınma eylemine dezavantaj alır.",
                "Belirli bir yöne bakan bir varlık, görüş mesafesinde hareket eden bir varlığın turu boyunca gerçekleştireceği hareketi takip edecek şekilde tepki eylem olarak bakış yönünü değiştirebilir. Eğer eşik veya kör alandan yakın mesafesinde hareket eden bir varlık varsa (3-6 birim mesafe), pasif olarak kullanılacak bir **FARKINDALIK** zarı ile fark etmesi durumunda bu alanda hareket eden varlığa karşı da bakış yönünü tepki eylemle değiştirebilir.",
                "Karakter, turunda **NET ALANDA** ve **silah tuttan elinin tarafında** (Eşik alan hariç) bulunan hedeflere saldırabilir. Karakterin kendi turunda yüzünü bir yöne dönmesi herhangi bir eylem türü ya da hareket puanı gerektirmez.",
                "Karakter, **NET ALAN** sınırlarının dışına ayrılacak bir varlığa **TEPKİ EYLEM** olarak **FIRSAT SALDIRISI** gerçekleştirebilir. Karakter, fırsat saldırısı gerçekleştirirken yüzünü saldırdığı birim tarafına dönüp dönmeme konusunda seçim yapabilir. Fırsat saldırısı isabet eden hedefin hareketi iptal olur. Net alan dışındaki alanlarda hareket eden varlıklar fırsat saldırısını tetiklemez."
              ]
            },
            {
              "type": "heading",
              "level": 3,
              "text": "ENERJİSEL SAVAŞ"
            },
            {
              "type": "paragraph",
              "text": "Enerjisel savaş, karakterlerin enerjisel yetenekler ile gerçekleştireceği savaş sürecidir. Enerjisel savaş süreci fiziksel yakın savaş sürecine kıyasla daha basittir ancak kendi incelikleri bulunmaktadır."
            },
            {
              "type": "heading",
              "level": 3,
              "text": "Kaynak Kullanımı"
            },
            {
              "type": "paragraph",
              "text": "Enerjisel savaşta kısa sürede pek çok yetenek seri olarak sıralanarak kullanılmaktadır. Bu süreçte şu kurallar izlenmektedir:"
            },
            {
              "type": "list",
              "ordered": false,
              "items": [
                "Eğer kaynak tüketimi olan, aynı enerji türüne ait bir yetenek arka arkaya 2 seferden fazla kullanılırsa harcadığı kaynak değeri **X2** olacak şekilde katlanmaya başlar. Karakter, bu katlanmayı araya aynı enerjiyi kullanan bir **BAZBÜYÜ** ile karıştırır veya **FARKLI ENERJİ TÜRÜNDE** bir yetenek kullanırsa **SIFIRLAR**.",
                "Karakterlerin **GÖREBİLDİKLERİ** hedefler bulunmaktadır. Görebildikleri hedefler üstünde **İSABET** ve **ODAKLANMA** gerektiren enerjisel yetenekler kullanılabilir.",
                "Bir karakter, **FARKINDA** olduğu ancak **GÖREMEDİĞİ** bir hedef üstünde — eğer arada bir fiziksel/enerjisel engel yoksa — sadece **İSABET** becerisini kullanabileceği tipte yetenekler kullanabilir.",
                "Bir karakter, ancak **GÖREBİLDİĞİ** bir hedef üstünde **ETKİ OLUŞTURAN** enerjisel yetenekler kullanabilir."
              ]
            },
            {
              "type": "heading",
              "level": 3,
              "text": "Konsantrasyon"
            },
            {
              "type": "paragraph",
              "text": "Karakterlerin uygulayacağı yeteneklerin bir kısmı, anında gerçekleşen etkiler haricinde **SÜREKLİ ETKİ** meydana getirebilir. Bu şekilde etki oluşturan yeteneklerde karakterin **KONSANTRASYON** sürecine girmesi gerekir. Konsantrasyon, bir karakterin mental olarak enerjisel etkinin varlığını sürdürmesi için ona odağını koruma sürecidir."
            },
            {
              "type": "paragraph",
              "text": "Bu süreçte karakter farklı eylemler gerçekleştirebilir, enerjisel veya fiziksel yetenekler kullanabilir. Ancak farklı bir konsantrasyon sürecine girecek olursa, mevcut konsantrasyonu **BOZULUR**. Aynı şekilde, bir karakter konsantrasyon sürecindeyken herhangi bir şekilde hasar alırsa **KONSANTRASYON TESTİ** zarı kullanır. Zarın **10 DEĞERİNİN ALTINDA** gelmesi durumunda, konsantrasyon bozulur. Bir karakterin **BİRDEN FAZLA KONSANTRASYON YUVASI** bulunabilir. Bir konsantrasyon yuvasını geliştirme konusunda gerekli deneyim puanını hesaplamak için \"**500** x **KONSANTRASYON SEVİYESİ**\" şeklinde bir formül kullanılır."
            }
          ]
        },
        {
          "id": "ekipman",
          "title": "EKİPMAN",
          "mode": "rich",
          "blocks": [
            {
              "type": "heading",
              "level": 2,
              "text": "EKİPMAN"
            },
            {
              "type": "paragraph",
              "text": "SLVNZ 4.0'da karakterlerin ekipman kullanımlarının ayrı bir yeri bulunmaktadır. Karakterlerin sahip olduğu ekipmanlar, karakter niteliklerini doğrudan etkileyebilmektedir. Karakterler, kuşandıkları ekipmanlar aracılığıyla kendilerini korunaklı veya işlevsel hallere getirebilirken, kuşandıkları ekipmanların ağırlıksal niteliklerine bağlı olarak bazı kısıntılar yaşarlar. Bu sistem, ekipman yükü ile Yük Puanı (YP) üzerinden hesaplanır."
            },
            {
              "type": "heading",
              "level": 3,
              "text": "YÜK PUANININ HESAPLANMASI"
            },
            {
              "type": "paragraph",
              "text": "Karakterin savaş sırasında üzerinde taşıdığı zırh, kalkan, silah ve erişilebilir ekipmanlar Kuşanım Yükü oluşturur. Bu yük, yalnızca ekipmanın gerçek ağırlığını değil; ekipmanın bedene yayılışını, hareketi ne kadar kısıtladığını, savaş sırasında ne kadar yer kapladığını ve karakterin beden ritmini ne ölçüde bozduğunu temsil eder.\n\nBu nedenle Yük Puanı — YP, doğrudan kilogram karşılığı değildir. Bir tam plaka zırh, bütün bedene yayılan sürekli bir yük oluşturduğu için yüksek YP’ye sahiptir. Buna karşılık büyük bir kılıç ağır ve hantal olsa da, tam plaka zırh kadar sürekli bedensel kısıtlama yaratmaz.\n\nToplam Kuşanım Yükü = Zırh YP + Kalkan YP + Kuşanılmış Silah YP + Üstte Taşınan Ekipman YP + Modifikasyon YP\n\nHesaba katılanlar:\n\nGiyilen zırh\nKuşanılmış kalkan\nElde, belde, sırtta veya hızlı çekilebilir konumda taşınan silahlar\nSavaş sırasında üstte taşınmaya devam eden çanta, mühimmat, ağır alet, iksir çantası, kamp ekipmanı\nZırha, kalkana veya silaha sonradan eklenmiş ağır parçalar\nMetal kaplama, ek plaka, miğfer, omuzluk, zırh eteği, ikinci katman gibi modifikasyonlar"
            },
            {
              "type": "heading",
              "level": 3,
              "text": "KUVVET İLE YÜK AZALTIMI"
            },
            {
              "type": "paragraph",
              "text": "Karakterin KUVVET niteliği, kuşanım yükünün karakter üzerindeki etkisini azaltır.\n\nKuvvet Yük Azaltımı = KUV x 3\n\nSonrasında karakterin asıl yük seviyesi şu formülle bulunur:\n\nEtkili Yük = Toplam Kuşanım Yükü - Kuvvet Yük Azaltımı\n\nEtkili Yük hiçbir zaman 0’ın altına düşmez."
            },
            {
              "type": "example",
              "text": "Karakterin toplam kuşanım yükü 32 YP olsun.\nKarakterin KUV değeri +4 ise:\nKUV x 3 = 12\n32 - 12 = 20\nKarakterin Etkili Yük değeri 20 olur."
            },
            {
              "type": "heading",
              "level": 3,
              "text": "EKİPMAN YÜKÜ EŞİKLERİ VE ETKİLERİ"
            },
            {
              "type": "table",
              "header": [
                "ETKİN YÜK PUANI MARJI",
                "YÜK SEVİYESİ",
                "ETKİLERİ"
              ],
              "rows": [
                [
                  "0-8",
                  "Hafif Kuşanım",
                  "Yok"
                ],
                [
                  "9-16",
                  "Orta Kuşanım",
                  "-1 Hareket, -1 Kaçınma, -1 Atletik Eylemler"
                ],
                [
                  "17-24",
                  "Ağır Kuşanım",
                  "-2 Hareket, -2 Kaçınma, -2 Atletik Eylemler, Atik eylemlerde STAMINA kesintisi"
                ],
                [
                  "25-32",
                  "Çok Ağır Kuşanım",
                  "-3 Hareket, -3 Kaçınma, -5 Atletik Eylemler, Fiziksel Eylemlerde STAMINA kesintisi"
                ],
                [
                  "33+",
                  "Aşırı Yük",
                  "-4 Hareket, -5 Kaçınma, Dezavantajlı -5 Atletik Eylemler, Her Fiziksel Eylemde daha fazla STAMINA kesintisi"
                ]
              ]
            },
            {
              "type": "tabs",
              "tabs": [
                {
                  "label": "ZIRHLAR",
                  "blocks": [
                    {
                      "type": "table",
                      "header": [
                        "ZIRH TİPİ",
                        "YÜK PUANI"
                      ],
                      "rows": [
                        [
                          "ZIRHSIZ",
                          "0"
                        ],
                        [
                          "DERİ",
                          "3"
                        ],
                        [
                          "SERTLEŞTİRİLMİŞ DERİ",
                          "5"
                        ],
                        [
                          "YARIM PLAKA",
                          "12"
                        ],
                        [
                          "ZİNCİR",
                          "14"
                        ],
                        [
                          "PULLU",
                          "16"
                        ],
                        [
                          "TAM PLAKA",
                          "24"
                        ]
                      ]
                    },
                    {
                      "type": "paragraph",
                      "text": "Zırhlar, karakterlerin fiziksel saldırılardan ve birçok enerjisel saldırıdan korunmasına olanak sağlar. Ancak koruma seviyesi yükseldikçe, donanımlı korunma beraberinde bazı dezavantajları getirir. Bu dezavantajlar, yük puanının getireceği etkilerle sınırlı kalmayabilir. Örneğin, oyun yöneticisinin tercihine bağlı olarak, bir karakter giydiği miğferden dolayı farkındalık becerisine eksi değer alabilir."
                    }
                  ]
                },
                {
                  "label": "SİLAHLAR",
                  "blocks": [
                    {
                      "type": "table",
                      "header": [
                        "SİLAH TİPİ",
                        "YÜK PUANI"
                      ],
                      "rows": [
                        [
                          "HANÇER",
                          "1"
                        ],
                        [
                          "SATIR",
                          "2"
                        ],
                        [
                          "KISA KILIÇ",
                          "2"
                        ],
                        [
                          "NORMAL KILIÇ",
                          "3"
                        ],
                        [
                          "UZUN KILIÇ",
                          "3"
                        ],
                        [
                          "BÜYÜK KILIÇ",
                          "4"
                        ],
                        [
                          "SAVAŞ BALTASI",
                          "3"
                        ],
                        [
                          "BÜYÜK SAVAŞ BALTASI",
                          "4"
                        ],
                        [
                          "TOPUZ / ÇEKİÇ",
                          "3"
                        ],
                        [
                          "BÜYÜK TOPUZ / ÇEKİÇ",
                          "5"
                        ],
                        [
                          "ZİNCİRLİ GÜRZ",
                          "4"
                        ],
                        [
                          "BÜYÜK ZİNCİRLİ GÜRZ",
                          "6"
                        ],
                        [
                          "MIZRAK",
                          "3"
                        ],
                        [
                          "UZUN MIZRAK",
                          "4"
                        ],
                        [
                          "PIKE",
                          "5"
                        ],
                        [
                          "YAY",
                          "3"
                        ],
                        [
                          "UZUN YAY",
                          "4"
                        ],
                        [
                          "TATAR YAYI",
                          "5"
                        ],
                        [
                          "MUSKET / TÜFEK",
                          "5"
                        ]
                      ]
                    },
                    {
                      "type": "paragraph",
                      "text": "Her silah tipinin kendine özgü niteliklerinin bulunmasının yanı sıra karakterler bu silah tipleri üzerinde antrenman yaparak kendilerini geliştirebilir, silahları daha isabetli savurma konusunda ve ileride silah tiplerine özgü farklı yeteneklere sahip olmak için ilerleyebilirler."
                    }
                  ]
                },
                {
                  "label": "KALKANLAR",
                  "blocks": [
                    {
                      "type": "table",
                      "header": [
                        "KALKAN TİPİ",
                        "BLOK PAYI",
                        "YÜK PUANI"
                      ],
                      "rows": [
                        [
                          "KALKANSIZ",
                          "0",
                          "0"
                        ],
                        [
                          "BUCKLER",
                          "ÇEV",
                          "1"
                        ],
                        [
                          "UFAK KALKAN",
                          "ÇEV",
                          "2"
                        ],
                        [
                          "NORMAL KALKAN*",
                          "3",
                          "5"
                        ],
                        [
                          "KULE KALKAN",
                          "6",
                          "10"
                        ]
                      ]
                    },
                    {
                      "type": "paragraph",
                      "text": "(*) Tam Blok Pozu yapabilen kalkan tipi."
                    },
                    {
                      "type": "paragraph",
                      "text": "Kalkanlar, zırhların yanı sıra karakterlere ekstra korunma imkânı tanıyan ekipman türüdür. Bir karakter kalkanla kullanım tarzını şekillendirerek iki farklı şekilde korunabilir. Kalkanda ve birçok yetenek içeriğinde kullanılabilecek bu ve buna benzer durumlara Poz ismi verilir. Kalkan için kullanılabilen pozlar Savaş Pozu ve Tam Blok Pozudur. Bu pozların kullanılabileceği kalkan tipleri Normal Kalkan ve Kule Kalkan tipleridir. Bunların dışında kalan diğer kalkan türleri blok için karakterin çeviklik niteliğini baz alır."
                    },
                    {
                      "type": "heading",
                      "level": 3,
                      "text": "SAVAŞ POZU"
                    },
                    {
                      "type": "paragraph",
                      "text": "Karakterin kalkanı tuttuğu normal savaş duruşudur. Bu duruşta karakter gelen saldırıyı bloke etmek için kuşanmış olduğu kalkanın blok niteliğini ve kendi sahip olduğu blok becerisini birleştirerek kullanır."
                    },
                    {
                      "type": "heading",
                      "level": 3,
                      "text": "TAM BLOK POZU"
                    },
                    {
                      "type": "paragraph",
                      "text": "Tam blok pozunda karakter, kalkanını önünü kapatacak biçimde tutacak şekilde bir duruşa geçer. Bu şekilde karakterin vücudunun dönük olduğu yönden gelen saldırılar NET BLOK gerçekleştirir. NET BLOK, karakterin bütün fiziksel saldırılardan zarar görmemesine, kalkanın hasar alması ve kolun baskı altında kalmasına sebep olur. Aşağıdan gelebilecek saldırılara karşı yine de bir savunma refleksi gerektirir.\n\nTAM BLOK pozundayken karakterin hareket kabiliyeti yarıya iner, gerçekleştireceği fiziksel saldırılara alacağı KUVVET BONUSU yok sayılır. TAM BLOK pozundayken karakter önüne, sağ çaprazına ve sağına fiziksel saldırı gerçekleştirebilir."
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "id": "karakter-gelisimi",
          "title": "KARAKTER GELİŞİMİ",
          "mode": "rich",
          "blocks": [
            {
              "type": "heading",
              "level": 2,
              "text": "KARAKTER GELİŞİMİ"
            },
            {
              "type": "paragraph",
              "text": "Oyuncular oyun boyunca karakterlerinin niteliklerini, becerilerini ve yeteneklerini geliştirebilirler. Bu geliştirme süreci, karakterin uygun antrenmanları gerçekleştirmesi sonucu toplayabileceği deneyim puanları ile mümkündür. Deneyim puanları, oyunun kaç yüzlü zar ile oynanmaya karar verildiği gözetilmeksizin, 20 yüzlü zar kullanılarak toplanır.\n\nAncak gelişim yönünde atılan zarlarda, karakterler tecrübesiz oldukları bir üst alanda antrenman gerçekleştirirken d20 zarın **1-5 değerleri gerileme**, **6-20 değerleri ilerleme** olarak sayılır.\n\nBu gerileme/ilerleme aralığında sıfır noktası olarak 5-6 kısmı belirlenir.\n\nEğer karakterler antrenman alanlarıyla ilgili bir yol gösterici edinebilirse (tekniği anlatacak birisi, temel bilgileri anlatacak dökümanlar vb.), yol göstericinin niteliğine göre karakterin antrenman zarındaki gerileme aralığı azalır."
            },
            {
              "type": "example",
              "text": "Bir karakter bir silah için yetkinlik antrenmanı yapmaktadır. \nBu karakter, silahta yetkin olmadığı için gerileme/ilerleme marjına tabiidir. Yani, d20 antrenman zarıyla gelecek 7 değeri için, +2 deneyim puanı kazanır. Eğer gelen zar 2 ise, -4 deneyim puanı azaltır.\nAncak antrenman yapacak karakter, bu temel konusunda kendisini yönlendirecek bir kaynak bulur ve bir süre bu kaynak doğrultusunda ilerlerse, gerileme marjını giderek azaltacak şekilde antrenman zarının getirisini azami 20 değere yaklaştırır."
            },
            {
              "type": "paragraph",
              "text": "Karakterin gerçekleştirmek istediği antrenman türü GM tarafına önerilir ve kabul edilirse, karakter oyun süresince 3 saatlik bir çalışma süresine girer. Bu çalışma süresi boyunca arada verilen molalar haricinde bir kesinti yaşanması durumunda GM inisiyatifi ile deneyim puanı için kullanılacak zar türü değişebilir.\n\nKarakterler girdikleri antrenman sonucunda +1 Yorgunluk Durumu puanı alırlar. Karakter yorgunken bir antrenman daha yapacak olursa bu durum karaktere +1 Yorgun Durumu puanı daha ekler. Bir karakterin yorgunluk durumu 2 puan veya daha fazla ise, antrenman yapamaz.\n\nKarakterler zihinsel ve fiziksel olarak yorgunluk durumuna girebilirler. Meditasyon gibi eylemler dışında, bir karakterin enerjisel yetenekleri üstünde çalışması da vücuttaki enerji akışından dolayı karakteri fiziksel bir yorgunluğa sürükleyebilir. Bundan dolayı GM ile anlaşılarak belirlenen belirli antrenman türleri dışında enerjisel ve fiziksel yetenekler üstünde geliştirme çalışmaları karakteri 6 saat sonunda yoracaktır.\n\nKarakterlerin gelişim süreçleri iki farklı kolda ve formüle ayrılmıştır. Bunlar Temel Gelişim ve Özel Gelişimdir."
            },
            {
              "type": "tabs",
              "tabs": [
                {
                  "label": "TEMEL GELİŞİM",
                  "blocks": [
                    {
                      "type": "paragraph",
                      "text": "Temel gelişim, karakterlerin temel becerilerini, ekipman yetkinliklerini, enerjisel yetkinliklerini ve kaynak havuzlarını geliştirebileceği süreçleri kapsamaktadır. Bu süreç, karakterin gireceği en az 1 en çok 4 saatlik antrenman ya da meditasyon süreci sonunda atılan farklı yüzlü zarlar ile, belirlenmiş deneyim puanına erişmeye çalışarak seviye atlayabileceği bir sistemdir.\n\n**TEMEL NİTELİKLER**, temel gelişimin bu sistemi ile aynı biçimde ilerlese de gerektirdiği deneyim puanı bakımından çok daha ağırdır. Temel niteliklerde **KUV**, **ÇEV** ve **DAY**, sözü edilen antrenmanlarla geliştirilebilir. Ancak **İRD** ve **SZG** nitelikleri daha özel yöntemler veya antrenmanlarla gelişir. Temel niteliklerin gelişmesi için gerekli deneyim puanı formülü **SEVİYE x 500** olarak işlenir.\n\nTemel Nitelikler nezdinde, istikrarlı bir antrenman süreci takip edilmezse, antrenman gerçekleştirilmeyen günlere bağlı olarak periyodik bir gerileme süreci başlar. Karakter, bu nitelik antrenman sürecinde ne kadar deneyim puanı biriktirdiyse, periyodik gerileme miktarı o kadar azalır. Yani KUV niteliğini geliştirmeye çalışan bir karakter, 1 haftalık antrenman sonucunda 120 puan elde etmişse, 3 gün antrenmanını devam ettirmemesi durumunda, sonraki her antrenmansız gün başına d10 gerileme yaşar. Ancak bu puan miktarı 300 civarındayken, periyodik gerileme d5 civarındadır. Bu durum, sadece temel nitelikler için geçerlidir.\n\nÖzellikle temel niteliklerin geliştirilmesi oldukça uzun bir süreç alabilmektedir. Bu durum göz önünde bulundurulduğunda, bir karakterin asıl özgünlüğünü diğer becerileri ve yeteneklerinin gelişimi ile gösterebileceği belirtilebilir. Özellikle yeni bir oyuna başlanırken veya yeni bir karakter oluşturulurken, GM'in temel nitelikler için ayrı bir Deneyim Puanı havuzu belirlemesi veya oyunculara doğrudan seviye sayısıyla nitelik sınırı vermesi (2 adet +1 nitelik ve 1 adet +2 nitelik, ya da niteliklere özel 2000 Deneyim Puanı gibi...) tavsiye edilir."
                    }
                  ]
                },
                {
                  "label": "ÖZEL GELİŞİM",
                  "blocks": [
                    {
                      "type": "paragraph",
                      "text": "Özel gelişim, karakterlerin özel becerilerini geliştirebilecekleri bir gelişim sürecini kapsamaktadır. Bu süreç, temel gelişimdeki özel antrenmanlardan farklı olarak yaptıkça öğrenme ve gelişme modeli üstüne kuruludur. Yani, bir karakter özel becerisini kullandığı zaman attığı zar ile deneyim puanı kazanır. Bu bağlamda, temel olarak özel becerileri geliştirmek için gerekli deneyim formülü ise SEVİYE x 100 Deneyim Puanı şeklindedir. Ancak bütün özel beceriler karmaşıklık ve özellik bakımından eş olamayacağı üzere, üst seviyeler için gereken çarpan sayısı değişkendir."
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "id": "huner-kusurlar",
          "title": "HÜNER & KUSURLAR",
          "mode": "rich",
          "blocks": [
            {
              "type": "heading",
              "level": 2,
              "text": "HÜNER & KUSURLAR"
            },
            {
              "type": "paragraph",
              "text": "Karakterlerin arka plan hikâyelerinden, bazı yeteneklerinden, taşıdıkları eşyalardan ya da oyun içinde gelişebilecek başka durumlardan dolayı karakterlerin üstünde özel etkiler oluşabilir. Bu etkiler geçici, şartlı ya da kalıcı bir şekilde karakterin üstünde bulunabilir."
            },
            {
              "type": "paragraph",
              "text": "Bu durumlar, niteliklere, becerilere, yeteneklere ya da doğrudan oyuncunun rolsel durumuna etki edebilecek şeyler olabilir. Örneğin, bir gözü kör olan bir karakterin üstünde bulunan bir KUSUR durumu, karakterin görmeye yönelik FARKINDALIK beceri değerine -3 almasına sebep olabilir."
            },
            {
              "type": "paragraph",
              "text": "Bir diğer örnekte, karanlıkta görme yetisine sahip bir karakterin edinmiş olduğu avantaj durumu, karakterin soluk ışıkla aydınlanan bir ortamda görmeye dayalı FARKINDALIK zarlarına artı değer almasını sağlayacaktır."
            },
            {
              "type": "paragraph",
              "text": "Bunların dışında rolsel ya da durumsal olarak, karakterlerin hastalık durumları ve bu durumlardan zaman zaman yaşayabilecekleri sıkıntılar, bazı durumlara duyarlı oluşları sebebiyle daha etkin olabilme durumları vb. olaylar hüner, avantaj ve kusurlara dahil edilebilir."
            }
          ]
        }
      ]
    },
    "yetenekler": {
      "label": "YETENEKLER",
      "blurb": "Karakterlerin sahip olabileceği güçlerin ve uzmanlıkların kataloğu.",
      "items": [
        {
          "id": "enerjisel-yetenekler",
          "title": "ENERJİSEL YETENEKLER",
          "mode": "table",
          "table": {
            "columns": [
              {
                "id": "isim",
                "label": "İSİM",
                "type": "text",
                "showInTable": true,
                "snapZone": "none"
              },
              {
                "id": "tur",
                "label": "SEVİYE",
                "type": "number",
                "showInTable": true,
                "snapZone": "top"
              },
              {
                "id": "seviye",
                "label": "ELEMENT",
                "type": "text",
                "showInTable": true,
                "snapZone": "top"
              },
              {
                "id": "maliyet",
                "label": "KAYNAK",
                "type": "text",
                "showInTable": true,
                "snapZone": "top"
              },
              {
                "id": "yeni-alan",
                "label": "ENERJİ",
                "type": "text",
                "showInTable": true,
                "snapZone": "top"
              },
              {
                "id": "yeni-alan-2",
                "label": "Kaynak Bedeli",
                "type": "number",
                "showInTable": true,
                "snapZone": "top"
              },
              {
                "id": "yeni-alan-3",
                "label": "MENZİL",
                "type": "text",
                "showInTable": false,
                "snapZone": "top"
              },
              {
                "id": "aciklama",
                "label": "AÇIKLAMA",
                "type": "textarea",
                "showInTable": false,
                "snapZone": "bottom"
              }
            ],
            "rows": [
              {
                "_id": "r1",
                "isim": "Ateş Oku",
                "tur": 0,
                "seviye": "Ateş",
                "maliyet": "Mana",
                "aciklama": "Menzilde görebildiğin bir hedefe elinden fırlayan bir ateş oku fırlatırsın. İsabet halinde hedef basınç ve yanma hasarı alır.",
                "yeni-alan": "Yıkım",
                "yeni-alan-2": 0,
                "yeni-alan-3": "12 Birim"
              },
              {
                "_id": "r2",
                "isim": "Akı Kalkanı",
                "tur": "Savunma",
                "seviye": 1,
                "maliyet": 8,
                "aciklama": "Vücudun çevresinde enerji bir kalkan oluşturur ve gelen ilk darbeyi emer."
              },
              {
                "_id": "r3",
                "isim": "Boşluk Adımı",
                "tur": "Hareket",
                "seviye": 3,
                "maliyet": 22,
                "aciklama": "Kısa mesafeli anlık ışınlanma. Görüş hattındaki bir noktaya sıçrar."
              }
            ]
          }
        },
        {
          "id": "fiziksel-yetenekler",
          "title": "FİZİKSEL YETENEKLER",
          "mode": "table",
          "table": {
            "columns": [
              {
                "id": "isim",
                "label": "İSİM",
                "type": "text",
                "showInTable": true,
                "snapZone": "none"
              },
              {
                "id": "tur",
                "label": "TÜR",
                "type": "text",
                "showInTable": true,
                "snapZone": "top"
              },
              {
                "id": "seviye",
                "label": "SEVİYE",
                "type": "number",
                "showInTable": true,
                "snapZone": "top"
              },
              {
                "id": "maliyet",
                "label": "MALİYET",
                "type": "number",
                "showInTable": true,
                "snapZone": "top"
              },
              {
                "id": "aciklama",
                "label": "AÇIKLAMA",
                "type": "textarea",
                "showInTable": false,
                "snapZone": "bottom"
              }
            ],
            "rows": []
          }
        },
        {
          "id": "savas-sanatlari",
          "title": "SAVAŞ SANATLARI",
          "mode": "table",
          "table": {
            "columns": [
              {
                "id": "isim",
                "label": "İSİM",
                "type": "text",
                "showInTable": true,
                "snapZone": "none"
              },
              {
                "id": "tur",
                "label": "TÜR",
                "type": "text",
                "showInTable": true,
                "snapZone": "top"
              },
              {
                "id": "seviye",
                "label": "SEVİYE",
                "type": "number",
                "showInTable": true,
                "snapZone": "top"
              },
              {
                "id": "maliyet",
                "label": "MALİYET",
                "type": "number",
                "showInTable": true,
                "snapZone": "top"
              },
              {
                "id": "aciklama",
                "label": "AÇIKLAMA",
                "type": "textarea",
                "showInTable": false,
                "snapZone": "bottom"
              }
            ],
            "rows": []
          }
        },
        {
          "id": "ozel-beceriler",
          "title": "ÖZEL BECERİLER",
          "mode": "table",
          "table": {
            "columns": [
              {
                "id": "isim",
                "label": "İSİM",
                "type": "text",
                "showInTable": true,
                "snapZone": "none"
              },
              {
                "id": "tur",
                "label": "TÜR",
                "type": "text",
                "showInTable": true,
                "snapZone": "top"
              },
              {
                "id": "seviye",
                "label": "SEVİYE",
                "type": "number",
                "showInTable": true,
                "snapZone": "top"
              },
              {
                "id": "maliyet",
                "label": "MALİYET",
                "type": "number",
                "showInTable": true,
                "snapZone": "top"
              },
              {
                "id": "aciklama",
                "label": "AÇIKLAMA",
                "type": "textarea",
                "showInTable": false,
                "snapZone": "bottom"
              }
            ],
            "rows": []
          }
        },
        {
          "id": "hunerler",
          "title": "HÜNERLER",
          "mode": "table",
          "table": {
            "columns": [
              {
                "id": "isim",
                "label": "İSİM",
                "type": "text",
                "showInTable": true,
                "snapZone": "none"
              },
              {
                "id": "tur",
                "label": "TÜR",
                "type": "text",
                "showInTable": true,
                "snapZone": "top"
              },
              {
                "id": "seviye",
                "label": "SEVİYE",
                "type": "number",
                "showInTable": true,
                "snapZone": "top"
              },
              {
                "id": "maliyet",
                "label": "MALİYET",
                "type": "number",
                "showInTable": true,
                "snapZone": "top"
              },
              {
                "id": "aciklama",
                "label": "AÇIKLAMA",
                "type": "textarea",
                "showInTable": false,
                "snapZone": "bottom"
              }
            ],
            "rows": []
          }
        }
      ]
    },
    "evren-rehberi": {
      "label": "EVREN REHBERİ",
      "blurb": "Diyarlar, varlıklar ve yaratıklarla SLVNZ evreninin atlası.",
      "type": "hub",
      "items": [
        {
          "id": "genel-evren",
          "title": "GENEL EVREN",
          "blurb": "Evrenin genel işleyişi, kozmolojisi ve temel kavramları.",
          "pages": [
            {
              "id": "giris",
              "title": "GİRİŞ",
              "mode": "text",
              "body": "Bu bölümün açıklaması henüz yazılmadı. Buraya ilgili kuralların, tanımların ve örneklerin geleceği yer tutucu bir metindir.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.\n\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident."
            }
          ]
        },
        {
          "id": "diyarlar",
          "title": "DİYARLAR",
          "blurb": "Evreni oluşturan diyarlar, katmanlar ve düzlemler.",
          "pages": [
            {
              "id": "giris",
              "title": "GİRİŞ",
              "mode": "text",
              "body": "Bu bölümün açıklaması henüz yazılmadı. Buraya ilgili kuralların, tanımların ve örneklerin geleceği yer tutucu bir metindir.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.\n\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident."
            }
          ]
        },
        {
          "id": "varliklar",
          "title": "VARLIKLAR",
          "blurb": "Evrende yaşayan akıllı ırklar, halklar ve varlıklar.",
          "pages": [
            {
              "id": "kadimler",
              "title": "KADİMLER",
              "mode": "rich",
              "body": "Bu bölümün açıklaması henüz yazılmadı. Buraya ilgili kuralların, tanımların ve örneklerin geleceği yer tutucu bir metindir.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.\n\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
              "blocks": [
                {
                  "type": "tabs",
                  "tabs": [
                    {
                      "label": "UMAY",
                      "blocks": [
                        {
                          "type": "paragraph",
                          "text": "Umay, savaş sonrası dönemde varlığını sürdüren Kadimler arasında en yaşlısı ve en ağır hafıza taşıyıcısıdır. Diğer Kadimlerden farklı olarak yalnızca bir doğa, zaman, ışık ya da karanlık ilkesinin temsilcisi değildir; o, varlığın devam etme iradesini temsil eder.\n\nHalk anlatılarında Umay çoğu zaman ana, ata, ocak koruyucusu, soyların gözeticisi ve doğumun sessiz tanığı olarak bilinir. Fakat bu sade anlatı, Umay’ın gerçek doğasının yalnızca küçük bir parçasıdır. O yalnızca çocukları, aileleri ya da soyları koruyan bir Kadim değildir; daha derinde, yok oluştan sonra bile bir şeylerin devam etmesi gerektiği fikrinin cisimleşmiş hâlidir.\n\nBüyük Savaş’tan sonra Umay, diğer Kadimler gibi herhangi bir safın parçası olmamıştır. Artık ne Aydınlık’a, ne Karanlık’a, ne de Kaos’a bağlıdır. Onun yolu, bütün eski saflaşmaların ötesindedir: korumak, hatırlamak, taşımak ve sürdürmek.\n\nUmay farklı halklar, tarikatlar ve eski Kadim havarileri tarafından farklı adlarla anılır:\n"
                        },
                        {
                          "type": "list",
                          "ordered": false,
                          "items": [
                            "Kadim Ana",
                            "İlk Ana",
                            "Yaşlı Kadim",
                            "Soyların Gözcüsü",
                            "Ocakların Sessiz Eli",
                            "Köklerin Anası",
                            "Gündüz’ün Anası",
                            "Kalbi Yaslı Olan",
                            "Yıkımdan Sonra Kalan",
                            "Adını Unutmayan"
                          ]
                        },
                        {
                          "type": "paragraph",
                          "text": "Bu unvanlar arasında en ağır olanı Gündüz’ün Anasıdır. Çünkü Umay’ın savaş sonrası kimliği artık yalnızca yaratma ve koruma üzerinden değil, kaybetme ve buna rağmen korumaya devam etme üzerinden tanımlanır."
                        },
                        {
                          "type": "heading",
                          "level": 3,
                          "text": "TEMSİL ALANLARI"
                        },
                        {
                          "type": "table",
                          "header": [
                            "ALAN",
                            "AÇIKLAMA"
                          ],
                          "rows": [
                            [
                              "Doğum",
                              "Yeni hayatın dünyaya gelişi, korunması ve kabul edilmesi."
                            ],
                            [
                              "Soy",
                              "Kan bağı, manevi bağ, aile hafızası ve kuşaklar arası aktarım."
                            ],
                            [
                              "Ocak",
                              "Ev, sığınak, aile yeri, yerleşiklik ve korunmuş alan."
                            ],
                            [
                              "Kök",
                              "Geçmişle bağ, aidiyet, gelenek ve unutulmayan hakikat."
                            ],
                            [
                              "Yas",
                              "Kaybın bastırılması değil, taşınabilir hâle getirilmesi."
                            ],
                            [
                              "Devamlılık",
                              "Her şey yıkıldıktan sonra bile yaşamın sürmesi."
                            ],
                            [
                              "Koruma",
                              "Zayıfı saklamak değil, onu hayatta kalabilecek hâle getirmek."
                            ]
                          ]
                        },
                        {
                          "type": "callout",
                          "variant": "info",
                          "title": "",
                          "text": "Umay’ın koruyuculuğu pasif değildir. O, kırılgan olanı fanusun içine koymaz. Onun öğretisine göre gerçek koruma, bir varlığı dünyadan izole etmek değil, onu dünyanın ağırlığını taşıyabilecek hâle getirmektir.",
                          "style": {
                            "css": "font-size: 10pt;"
                          }
                        },
                        {
                          "type": "heading",
                          "level": 2,
                          "text": "MİSYON"
                        },
                        {
                          "type": "paragraph",
                          "text": "Umay doğrudan dünyaya müdahale etmez. Savaş sonrası Kadimler düzeninde, hiçbir Kadim eski çağlardaki gibi dünyayı kendi eliyle biçimlendirme hakkına sahip değildir. Umay da bu ilkeye uyar. Ancak işaretler, rüyalar, havariler, kutsal ocaklar, eski yadigârlar ve soy hafızası aracılığıyla etkisini sürdürür.\n\nUmay’ın savaş sonrası misyonu üç ana hatta toplanır:"
                        },
                        {
                          "type": "heading",
                          "level": 3,
                          "text": "1. Kökleri Korumak"
                        },
                        {
                          "type": "paragraph",
                          "text": "Umay, savaşta ve Kadim iç savaşlarında kopan soyların, kaybolan ailelerin, unutulan halkların ve silinmiş isimlerin tamamen yok olmasına izin vermemeye çalışır. Bu görev yalnızca biyolojik soyla sınırlı değildir. Bir ustanın çırağı, bir köyün son tanığı, bir yıkımın kaydını tutan arşivci veya bir çocuğu kendi kanından olmadığı hâlde büyüten kişi de Umay’ın gözünde soy taşıyıcısı olabilir."
                        },
                        {
                          "type": "heading",
                          "level": 3,
                          "text": "2. Yasın Çürümesini Engellemek"
                        },
                        {
                          "type": "paragraph",
                          "text": "Umay’ın en tehlikeli gördüğü şeylerden biri, yasın kine dönüşmesidir. Çünkü kendi kızı Gündüz’ün öldürülmesi, Kadimler arasında kapanmayan bir yara açmıştır. Umay bu yarayı unutmaz; fakat onu bütün varlığı yutacak bir intikam ateşine de dönüştürmez.\n\nBu yüzden Umay’ın öğretisinde yas kutsaldır, ama sınırsız değildir. Yas hatırlatmalı, derinleştirmeli, ağırlaştırmalı; fakat yaşamı bütünüyle felç etmemelidir."
                        },
                        {
                          "type": "heading",
                          "level": 3,
                          "text": "3. Gelecek Kuşakları Hazırlamak"
                        },
                        {
                          "type": "paragraph",
                          "text": "Umay’ın koruması, karakterleri sürekli güvende tutmaz. Tam tersine, Umay’ın izinden gidenler çoğu zaman zor görevlerle sınanır. Çünkü Umay’a göre korunmaya değer olan her şey, bir gün kendisi de koruyucu olmayı öğrenmelidir.\n\nBu nedenle Umay’ın havarileri yalnızca sığınak kurmaz; eğitim verir, çocukları silah kullanmayı öğrenmeye zorlar, hafıza törenleri düzenler, şehirlerin soy kayıtlarını tutar ve savaş sonrasında dağılmış toplulukları yeniden örgütler."
                        },
                        {
                          "type": "heading",
                          "level": 3,
                          "text": "KARAKTER VE TUTUM"
                        },
                        {
                          "type": "paragraph",
                          "text": "Umay merhametlidir, fakat yumuşak değildir. Onun merhameti sıcak bir kucaklama kadar, ağır bir nasihat veya kaçınılmaz bir sınav şeklinde de gelebilir.\n\nUmay’ın öfkesi nadirdir. Fakat bir kez ortaya çıktığında diğer Kadimlerin bile dikkate aldığı türden bir ağırlık taşır. Çünkü Umay’ın öfkesi ani hiddetten değil, çok uzun süre bastırılmış hakikatten doğar."
                        },
                        {
                          "type": "heading",
                          "level": 2,
                          "text": "ÖĞRETİLER"
                        },
                        {
                          "type": "table",
                          "header": [
                            "ÖĞRETİ",
                            "ANLAMI"
                          ],
                          "rows": [
                            [
                              "Kökünü bilmeyen, gövdesini taşıyamaz.",
                              "Her kişi, topluluk veya krallık neyin devamı olduğunu bilmelidir. Hafızasız güç, yıkıma açık güçtür."
                            ],
                            [
                              "Koruma, saklamak değildir.",
                              "Bir çocuğu, halkı veya emaneti korumak; onu her tehlikeden uzak tutmak anlamına gelmez. Gerçek koruma, zamanı geldiğinde onun kendi ayakları üzerinde durmasını sağlamaktır."
                            ],
                            [
                              "Ölülerin adı ikinci kez öldürülmemelidir.",
                              "Umay’ın inancında unutulmak ikinci ölümdür. Bu yüzden ad anma, soy kaydı, mezar taşı, ağıt, hikâye ve aile yadigârı kutsal kabul edilir."
                            ],
                            [
                              "Yas taşınır; hükmetmesine izin verilmez.",
                              "Yas, geçmişle bağ kurmanın doğal yoludur. Fakat yas intikama, intikam da yeni felaketlere dönüşürse kutsallığını kaybeder."
                            ],
                            [
                              "Her emanet bir gün devredilmelidir.",
                              "Hiçbir koruyucu sonsuza kadar koruyucu kalamaz. Umay’ın yolunda en önemli anlardan biri, korunan kişinin artık başkasını koruyabilecek hâle gelmesidir."
                            ]
                          ]
                        }
                      ]
                    }
                  ]
                }
              ],
              "infobox": {
                "image": "",
                "entries": []
              },
              "tags": [],
              "related": [],
              "creatures": [],
              "table": {
                "columns": [
                  {
                    "id": "isim",
                    "label": "İSİM",
                    "type": "text",
                    "showInTable": true
                  }
                ],
                "rows": []
              }
            }
          ]
        },
        {
          "id": "yaratiklar",
          "title": "YARATIKLAR",
          "blurb": "Vahşi yaratıklar ve canavarlardan oluşan bestiyer.",
          "pages": [
            {
              "id": "giris",
              "title": "BESTİYER",
              "mode": "creature-list",
              "creatures": []
            }
          ]
        },
        {
          "id": "genel-ekonomi",
          "title": "GENEL EKONOMİ",
          "blurb": "",
          "pages": [
            {
              "id": "ekonomi-ecosystem",
              "title": "EKONOMİ EKOSİSTEMİ",
              "body": "",
              "mode": "rich",
              "blocks": [
                {
                  "type": "heading",
                  "level": 2,
                  "text": "GENEL EKONOMİ EKOSİSTEMİ"
                },
                {
                  "type": "table",
                  "header": [
                    "BİRİM",
                    "DENKLİĞİ",
                    "KULLANIM ALANI"
                  ],
                  "rows": [
                    [
                      "Bakır",
                      "1 Bakır",
                      "Günlük küçük harcamalar"
                    ],
                    [
                      "Gümüş",
                      "10 Bakır",
                      "Halkın ana alışveriş birimi"
                    ],
                    [
                      "Altın",
                      "10 Gümüş / 100 Bakır",
                      "Büyük Ödemeler, lonca işleri, silah-zırh-kira-ticaret"
                    ]
                  ]
                },
                {
                  "type": "heading",
                  "level": 3,
                  "text": "PARA BİRİMLERİNİN SOSYAL KARŞILIĞI"
                },
                {
                  "type": "paragraph",
                  "text": "Ekonominin hissini belirleyen asıl şey dönüşüm oranı değil, bu paraların dünyada ne kadar “ağır” hissettirdiğidir. **Bakır**, sıradan insanların günlük küçük ihtiyaçları için kullandığı paradır."
                },
                {
                  "type": "table",
                  "header": [
                    "HARCAMA",
                    "ORTALAMA DEĞER"
                  ],
                  "rows": [
                    [
                      "Bir parça ekmek",
                      "1-2 Bakır"
                    ],
                    [
                      "Bir kupa bayağı bira",
                      "2-4 Bakır"
                    ],
                    [
                      "Pazarda küçük meyve sebze alımı",
                      "2-5 Bakır"
                    ],
                    [
                      "Ucuz yatakhane yatağı",
                      "4-6 Bakır"
                    ]
                  ]
                },
                {
                  "type": "heading",
                  "level": 3,
                  "text": "GÜMÜŞ: GERÇEK ALIŞVERİŞ BİRİMİ"
                },
                {
                  "type": "paragraph",
                  "text": "Gümüş, halkın asıl ticaret parasıdır. Günlük yemek, işçilik, basit hizmetler, küçük ekipmanlar gümüşle döner."
                },
                {
                  "type": "table",
                  "header": [
                    "HARCAMA",
                    "ORTALAMA DEĞER"
                  ],
                  "rows": [
                    [
                      "Basit sıcak yemek",
                      "1 Gümüş"
                    ],
                    [
                      "Doyurucu han yemeği",
                      "2-3 Gümüş"
                    ],
                    [
                      "Basit bıçak / Gündelik alet",
                      "2-5 Gümüş"
                    ],
                    [
                      "Ucuz han odası",
                      "2-4 Gümüş"
                    ]
                  ]
                },
                {
                  "type": "heading",
                  "level": 3,
                  "text": "ALTIN: CİDDİ PARA"
                },
                {
                  "type": "paragraph",
                  "text": "Altın, sıradan halkın her gün cebinde taşıdığı bir para birimi değildir. Altın; tüccarların, loncaların, askerî ödemelerin, soyluların ve maceracıların para birimi olarak yerini almaktadır."
                },
                {
                  "type": "table",
                  "header": [
                    "HARCAMA",
                    "ORTALAMA DEĞER"
                  ],
                  "rows": [
                    [
                      "Handa tek kişilik iyi bir oda",
                      "1 Altın"
                    ],
                    [
                      "Basit silah",
                      "1-5 Altın"
                    ],
                    [
                      "Kaliteli Silah",
                      "5-15 Altın"
                    ],
                    [
                      "Hafif Zırh",
                      "5-20 Altın"
                    ],
                    [
                      "Hafif-Orta Zırh",
                      "20-40 Altın"
                    ],
                    [
                      "Eğitimli binek hayvanı",
                      "20-80 Altın"
                    ],
                    [
                      "Küçük dükkan aylık kirası",
                      "10-30 altın"
                    ]
                  ]
                },
                {
                  "type": "heading",
                  "level": 2,
                  "text": "EKONOMİK YAŞAM KALİTELERİ"
                },
                {
                  "type": "table",
                  "header": [
                    "YAŞAM DÜZEYİ",
                    "GÜNLÜK MASRAF",
                    "AÇIKLAMA"
                  ],
                  "rows": [
                    [
                      "Sefil",
                      "5-10 Bakır",
                      "Açlık sınırı, sokak, dilencilik"
                    ],
                    [
                      "Yoksul",
                      "1-2 Gümüş",
                      "Ekmek, çorba, ortak yatakhane"
                    ],
                    [
                      "Mütevazı",
                      "3-5 Gümüş",
                      "Basit ama düzenli yaşam"
                    ],
                    [
                      "Rahat",
                      "1 Altın",
                      "İyi yemek, özel oda, temiz hizmet"
                    ],
                    [
                      "Varlıklı",
                      "3-5 Altın",
                      "Hizmetâr, kaliteli konaklama"
                    ],
                    [
                      "Soylu / Tüccar",
                      "10+ Altın",
                      "Gösterişli yaşam"
                    ]
                  ]
                },
                {
                  "type": "heading",
                  "level": 2,
                  "text": "MACERACI EKONOMİSİ"
                },
                {
                  "type": "paragraph",
                  "text": "Maceracılar ve paralı askerler gibi işleri tehlike içinde geçen mesleklerin çoğu, atıldıkları tehlikenin karşılığı olarak doğru orantılı ödemeler alabilmektedir. Ancak alınacak ödüller, görev türünden başlayarak maceracının görevdeki performansı, ödeme yapan kişinin davranışı, ücretlendirmeyi etkileyen farklı faktörler vb. etkenlerle değişebilmektedir. Ancak genel olarak şöyle bir liste oluşturulabilir:"
                },
                {
                  "type": "table",
                  "header": [
                    "GÖREV TİPİ",
                    "ÖDÜL"
                  ],
                  "rows": [
                    [
                      "Kayıp Eşya / Küçük Arama",
                      "3-10 Gümüş"
                    ],
                    [
                      "Hayvan Kovma / Basit Koruma",
                      "1-3 Altın"
                    ],
                    [
                      "Kervan Refakati",
                      "5-20 Altın"
                    ],
                    [
                      "Tehlikeli Yaratık Avı",
                      "10-50 Altın"
                    ],
                    [
                      "Sınır Bölgesi Keşfi",
                      "25-100 Altın"
                    ],
                    [
                      "Kadim Kalıntı / Tesir noktası görevleri",
                      "100+ Altın veya özel ödemeler"
                    ]
                  ]
                }
              ]
            },
            {
              "id": "yasam-ekonomisi",
              "title": "YAŞAM EKONOMİSİ",
              "body": "",
              "mode": "rich",
              "table": {
                "columns": [
                  {
                    "id": "isim",
                    "label": "İSİM",
                    "type": "text",
                    "showInTable": true
                  }
                ],
                "rows": []
              },
              "blocks": [
                {
                  "type": "tabs",
                  "tabs": [
                    {
                      "label": "BESİNLER",
                      "blocks": [
                        {
                          "type": "table",
                          "header": [
                            "YEMEK",
                            "FİYAT"
                          ],
                          "rows": [
                            [
                              "EKMEK+ÇORBA",
                              "5 BAKIR"
                            ],
                            [
                              "BASİT SICAK YEMEK",
                              "1 GÜMÜŞ"
                            ],
                            [
                              "DOYURUCU HAN YEMEĞİ",
                              "2 GÜMÜŞ"
                            ],
                            [
                              "ETLİ YEMEK",
                              "3 GÜMÜŞ"
                            ],
                            [
                              "İYİ HAZIRLANMIŞ ETLİ YEMEK",
                              "5 GÜMÜŞ"
                            ],
                            [
                              "BALIK YEMEĞİ",
                              "2-4 GÜMÜŞ"
                            ],
                            [
                              "AV ETİ / ÖZEL TABAK",
                              "5-8 GÜMÜŞ"
                            ],
                            [
                              "BÜYÜK SOFRA, KİŞİ BAŞI",
                              "1 ALTIN"
                            ],
                            [
                              "SOYLU SOFRASI, KİŞİ BAŞI",
                              "3 ALTIN"
                            ]
                          ]
                        }
                      ]
                    },
                    {
                      "label": "İÇECEKLER",
                      "blocks": [
                        {
                          "type": "table",
                          "header": [
                            "İÇECEK",
                            "FİYAT"
                          ],
                          "rows": [
                            [
                              "TEMİZ KUYU SUYU/ MATARA DOLUMU",
                              "1 BAKIR"
                            ],
                            [
                              "KAYNATILMIŞ GÜVENLİ SU",
                              "2 BAKIR"
                            ],
                            [
                              "AYRAN/EKŞİ SÜT/HAFİF İÇECEK",
                              "2-3 BAKIR"
                            ],
                            [
                              "BAYAĞI BİRA",
                              "4 BAKIR"
                            ],
                            [
                              "NORMAL BİRA, 0.5L",
                              "1 GÜMÜŞ"
                            ],
                            [
                              "SERT BİRA, KOYU BİRA",
                              "2 GÜMÜŞ"
                            ],
                            [
                              "BASİT ŞARAP KADEHİ",
                              "2 GÜMÜŞ"
                            ],
                            [
                              "İYİ ŞARAP KADEHİ",
                              "5 GÜMÜŞ"
                            ],
                            [
                              "ŞİŞE ŞARAP",
                              "1 ALTIN"
                            ],
                            [
                              "KALİTELİ ŞİŞE ŞARAP",
                              "3 ALTIN+"
                            ],
                            [
                              "NADİR İÇKİ",
                              "5 ALTIN+"
                            ]
                          ]
                        }
                      ]
                    },
                    {
                      "label": "YOL ERZAKLARI",
                      "blocks": [
                        {
                          "type": "table",
                          "header": [
                            "ERZAK",
                            "FİYAT",
                            "AÇIKLAMA"
                          ],
                          "rows": [
                            [
                              "1 GÜNLÜK KÖTÜ ERZAK",
                              "5 BAKIR",
                              "KARIN DOYURUR AMA UZUN YOLDA MORAL BOZAR"
                            ],
                            [
                              "1 GÜNLÜK BASİT ERZAK",
                              "1 GÜMÜŞ",
                              "STANDART YOLCU MALZEMESİ"
                            ],
                            [
                              "1 GÜNLÜK DÜZGÜN YOL ERZAĞI",
                              "2 GÜMÜŞ",
                              "DAHA DAYANIKLI, BESLEYİCİ"
                            ],
                            [
                              "1 HAFTALIK BASİT ERZAK",
                              "5 GÜMÜŞ",
                              "STANDART YOLCU MALZEMESİ"
                            ],
                            [
                              "1 HAFTALIK KALİTELİ ERZAK",
                              "1 ALTIN",
                              "DAHA DAYANIKLI, BESLEYİCİ"
                            ],
                            [
                              "1 HAFTALIK ASKERİ/KERVAN ERZAĞI",
                              "2 ALTIN",
                              "UZUN YOL İÇİN HAZIRLANMIŞ ERZAK"
                            ]
                          ]
                        }
                      ]
                    },
                    {
                      "label": "KONAKLAMA ",
                      "blocks": [
                        {
                          "type": "table",
                          "header": [
                            "KONAKLAMA",
                            "FİYAT",
                            "AÇIKLAMA"
                          ],
                          "rows": [
                            [
                              "AHIR KÖŞESİ",
                              "2 BAKIR",
                              "HAYVANLARLA AYNI YERDE"
                            ],
                            [
                              "HAN ORTAK ZEMİNİ",
                              "4-5 BAKIR",
                              "KALABALIK"
                            ],
                            [
                              "ORTAK YATAKHANE",
                              "1 GÜMÜŞ",
                              "YOLCULAR, İŞÇİLER, ÇIRAKLAR"
                            ],
                            [
                              "UCUZ ODA",
                              "2-3 GÜMÜŞ",
                              "KÜÇÜK TEK KİŞİLİK ODA"
                            ],
                            [
                              "STANDART ODA",
                              "5 GÜMÜŞ",
                              "TEMİZ YATAK, KAPI, TEMEL GÜVENLİK"
                            ],
                            [
                              "İYİ ODA",
                              "1 ALTIN",
                              "ÖZEL ODA, SICAK YEMEK DAHİL OLABİLİR"
                            ],
                            [
                              "KALİTELİ ODA",
                              "3 ALTIN",
                              "TEMİZ ÇARŞAF, BANYO, HİZMET"
                            ],
                            [
                              "SOYLU SÜİTİ",
                              "10 ALTIN+",
                              "GENİŞ ODA, ÖZEL HİZMET, GÜVENLİK"
                            ]
                          ]
                        }
                      ]
                    },
                    {
                      "label": "HAN PAKETLERİ",
                      "blocks": [
                        {
                          "type": "table",
                          "header": [
                            "PAKET ADI",
                            "İÇERİK",
                            "FİYAT"
                          ],
                          "rows": [
                            [
                              "UCUZ HAN PAKETİ",
                              "ORTAK YATAKHANE, BASİT ÇORBA, SU VE ZAYIF İÇECEK",
                              "1 GÜMÜŞ/GÜN"
                            ],
                            [
                              "YOLCU PAKETİ",
                              "BASİT ODA VEYA İYİ YATAKHANE, 2 BASİT ÖĞÜN, NORMAL İÇECEK",
                              "3 GÜMÜŞ/GÜN"
                            ],
                            [
                              "STANDART MACERACI PAKETİ",
                              "STANDART ODA, DOYURUCU YEMEK, BİRA/İÇECEK, EŞYALAR İÇİN MAKUL GÜVENLİK",
                              "5 GÜMÜŞ/GÜN"
                            ],
                            [
                              "RAHAT MACERACI PAKETİ",
                              "ÖZEL ODA, İYİ YEMEK, TEMİZLENME İMKÂNI, EŞYA GÜVENLİĞİ",
                              "1 ALTIN/GÜN"
                            ],
                            [
                              "VARLIKLI PAKET",
                              "KALİTELİ ODA, BANYO, İYİ İÇKİ, HİZMET, GÜVENLİK, TÜCCAR/LONCA ÇEVRELERİNE ERİŞİM",
                              "3+ ALTIN/GÜN"
                            ]
                          ]
                        }
                      ]
                    },
                    {
                      "label": "HAYVAN VE BİNEK KONAKLAMASI",
                      "blocks": [
                        {
                          "type": "table",
                          "header": [
                            "HİZMET",
                            "FİYAT"
                          ],
                          "rows": [
                            [
                              "HAYVANI DIŞARI BAĞLAMA",
                              "ÜCRETSİZ-1 BAKIR"
                            ],
                            [
                              "AHIRDA YER",
                              "3 BAKIR"
                            ],
                            [
                              "YEM+SU",
                              "5 BAKIR"
                            ],
                            [
                              "BİNEK İÇİN TAM BAKIM",
                              "1 GÜMÜŞ"
                            ],
                            [
                              "DEĞERLİ BİNEK İÇİN GÜVENLİ AHIR",
                              "3 GÜMÜŞ"
                            ],
                            [
                              "EGZOTİK BİNEK BAKIMI",
                              "1+ ALTIN"
                            ]
                          ]
                        }
                      ]
                    }
                  ]
                },
                {
                  "type": "heading",
                  "level": 3,
                  "text": "ŞEHİR TİPİNE GÖRE FİYAT ÇARPANLARI"
                },
                {
                  "type": "table",
                  "header": [
                    "BÖLGE TİPİ",
                    "ÇARPAN",
                    "AÇIKLAMA"
                  ],
                  "rows": [
                    [
                      "Köy",
                      "x0.5",
                      "Yemek ucuz, konaklama basit"
                    ],
                    [
                      "Normal Kasaba",
                      "x1",
                      "Standart Fiyat"
                    ],
                    [
                      "Büyük Şehir",
                      "x1.5",
                      "Kira ve hizmet pahalı"
                    ],
                    [
                      "Başkent / Zengin merkez",
                      "x2",
                      "Kalite yüksek, fiyat yüksek"
                    ],
                    [
                      "Sınır Yerleşimi",
                      "x2",
                      "Malzeme az, tehlike fazla"
                    ],
                    [
                      "Kuşatma / Kıtlık",
                      "x3-x5",
                      "Fiyatlar Bozulur"
                    ]
                  ]
                },
                {
                  "type": "heading",
                  "level": 3,
                  "text": "ORTALAMA SOSYAL TABAKA GELİRLERİ"
                },
                {
                  "type": "table",
                  "header": [
                    "KİŞİ / MESLEK",
                    "GÜNLÜK GELİR"
                  ],
                  "rows": [
                    [
                      "Dilenci",
                      "1-5 Bakır"
                    ],
                    [
                      "Tarla İşçisi",
                      "1-2 Gümüş"
                    ],
                    [
                      "Hamal",
                      "2-3 Gümüş"
                    ],
                    [
                      "Hizmetçi",
                      "2-4 Gümüş"
                    ],
                    [
                      "Çırak Zanaatkâr",
                      "2-5 Gümüş"
                    ],
                    [
                      "Usta Zanaatkâr",
                      "5 Gümüş - 1 Altın"
                    ],
                    [
                      "Sıradan Asker",
                      "3-6 Gümüş"
                    ],
                    [
                      "Deneyimli Muhafız",
                      "1 Altın"
                    ],
                    [
                      "Kervan Koruması",
                      "1-3 Altın"
                    ],
                    [
                      "Lonca Uzmanı",
                      "3-10 Altın"
                    ],
                    [
                      "Soylu Hizmetlisi",
                      "5 Gümüş - 2 Altın"
                    ],
                    [
                      "Küçük Tüccar",
                      "1-5 Altın"
                    ],
                    [
                      "Büyük Tüccar",
                      "10+ Altın"
                    ]
                  ]
                }
              ]
            },
            {
              "id": "yolculuk-lojistik",
              "title": "YOLCULUK-LOJİSTİK",
              "body": "",
              "mode": "rich",
              "blocks": [
                {
                  "type": "heading",
                  "level": 3,
                  "text": "TEMEL YOL BİRİMİ"
                },
                {
                  "type": "table",
                  "header": [
                    "YOLCULUK BİÇİMİ",
                    "GÜNLÜK MESAFE",
                    "AÇIKLAMA"
                  ],
                  "rows": [
                    [
                      "Yaya, Yavaş/güvenli",
                      "15-20km",
                      "Yaralı, yükl, tehlikeli arazi"
                    ],
                    [
                      "Yaya, Normal",
                      "25-30km",
                      "Standart maceracı yürüyüşü"
                    ],
                    [
                      "Yaya, hızlı",
                      "35-40km ",
                      "Yorucu, soluk/dayanıklılık baskısı yaratır"
                    ],
                    [
                      "Binekli, normal",
                      "40-50km",
                      "At, deve, iri binek"
                    ],
                    [
                      "Binekli, hızlı",
                      "60-70km",
                      "Hayvan yıpranır, bakım gerekir"
                    ],
                    [
                      "Yük arabası",
                      "20-30km",
                      "Mal ve yolcu taşıma"
                    ],
                    [
                      "Kervan",
                      "15-25km",
                      "Güvenli ama yavaş"
                    ],
                    [
                      "Nehir teknesi",
                      "40-80km",
                      "Akıntıya göre değişken"
                    ],
                    [
                      "Deniz/kıyı gemisi",
                      "80-150km",
                      "Hava ve rota belirleyici"
                    ]
                  ]
                },
                {
                  "type": "tabs",
                  "tabs": [
                    {
                      "label": "ERZAK VE YOL MALZEMELERİ",
                      "blocks": [
                        {
                          "type": "table",
                          "header": [
                            "ERSAK",
                            "FİYAT",
                            "KULLANIM"
                          ],
                          "rows": [
                            [
                              "1 günlük kötü erzak",
                              "5 Bakır",
                              "Aç bırakmaz, moral düşürür"
                            ],
                            [
                              "1 günlük basit erzak",
                              "1 Gümüş",
                              "Standart yolcu erzağı"
                            ],
                            [
                              "1 günlük kaliteli erzak",
                              "2 Gümüş",
                              "Daha besleyici, uzun yürüyüşe uygun"
                            ],
                            [
                              "1 haftalık basit erzak",
                              "5 Gümüş",
                              "Yaya yolculuk standardı"
                            ],
                            [
                              "1 haftalık kaliteli erzak",
                              "1 Altın",
                              "Maceracı standardı"
                            ],
                            [
                              "1 haftalık askerî/kervan erzağı",
                              "2 Altın",
                              "Zorlu rota, nöbet, keşif"
                            ]
                          ]
                        }
                      ]
                    },
                    {
                      "label": "BİNEK HAYVAN MASRAFLARI",
                      "blocks": [
                        {
                          "type": "table",
                          "header": [
                            "HİZMET",
                            "FİYAT"
                          ],
                          "rows": [
                            [
                              "Sadece su",
                              "1 Bakır"
                            ],
                            [
                              "Basit yem",
                              "3 Bakır"
                            ],
                            [
                              "Yem + su",
                              "5 Bakır"
                            ],
                            [
                              "Normal binek bakımı",
                              "1 Gümüş"
                            ],
                            [
                              "Değerli binek bakımı",
                              "3 Gümüş"
                            ],
                            [
                              "Savaş bineği bakımı",
                              "5 Gümüş"
                            ],
                            [
                              "Egzotik binek bakımı",
                              "1+ altın"
                            ]
                          ]
                        }
                      ]
                    },
                    {
                      "label": "BİNEK KİRALAMA",
                      "blocks": [
                        {
                          "type": "table",
                          "header": [
                            "BİNEK",
                            "GÜNLÜK KİRA",
                            "DEPOZİTO"
                          ],
                          "rows": [
                            [
                              "Katır/Eşek",
                              "2 Gümüş",
                              "1 Altın"
                            ],
                            [
                              "Sıradan At",
                              "5 Gümüş",
                              "5 Altın"
                            ],
                            [
                              "Hızlı At",
                              "1 Altın",
                              "10 Altın"
                            ],
                            [
                              "Dayanıklı Yol Atı",
                              "1 Altın",
                              "15 Altın"
                            ],
                            [
                              "Savaş Atı",
                              "3 Altın",
                              "30 Altın"
                            ],
                            [
                              "Deve / Çöl Bineği",
                              "1 Altın",
                              "10 Altın"
                            ],
                            [
                              "Kızak Hayvanı",
                              "5 Gümüş - 1 Altın",
                              "5 - 10 Altın"
                            ],
                            [
                              "Egzotik Binek",
                              "5+ Altın",
                              "50+ Altın"
                            ]
                          ]
                        }
                      ]
                    },
                    {
                      "label": "BİNEK FİYATLARI",
                      "blocks": [
                        {
                          "type": "table",
                          "header": [
                            "BİNEK",
                            "FİYAT"
                          ],
                          "rows": [
                            [
                              "Eşek",
                              "5 Altın"
                            ],
                            [
                              "Katır",
                              "10 Altın"
                            ],
                            [
                              "Sıradan At",
                              "25 Altın"
                            ],
                            [
                              "Dayanıklı Yol Atı",
                              "40 Altın"
                            ],
                            [
                              "Hızlı At",
                              "60 Altın"
                            ],
                            [
                              "Savaş Atı",
                              "150 Altın"
                            ],
                            [
                              "Deve / Çöl Bineği",
                              "50 Altın"
                            ],
                            [
                              "Eğitimli Savaş Bineği",
                              "250+ Altın"
                            ],
                            [
                              "Egzotik Binek",
                              "500+ veya para dışı bedel"
                            ]
                          ]
                        }
                      ]
                    },
                    {
                      "label": "ARAÇ VE TAŞIMA",
                      "blocks": [
                        {
                          "type": "table",
                          "header": [
                            "ARAÇ",
                            "GÜNLÜK KİRA",
                            "SATIN ALMA",
                            "AÇIKLAMA"
                          ],
                          "rows": [
                            [
                              "El Arabası",
                              "5 Bakır",
                              "1 Altın",
                              "Şehir/Pazar içi"
                            ],
                            [
                              "Küçük Yük Arabası",
                              "2 Gümüş",
                              "5 Altın",
                              "Bir Hayvan Çeker"
                            ],
                            [
                              "Yolcu Arabası",
                              "5 Gümüş",
                              "15 Altın",
                              "2-4 Yolcu"
                            ],
                            [
                              "Büyük Yük Arabası",
                              "1 Altın",
                              "40 Altın",
                              "Kervan Malı"
                            ],
                            [
                              "Kapalı Yolcu Arabası",
                              "2 Altın",
                              "80 Altın",
                              "Rahat ve Güvenli"
                            ],
                            [
                              "Zırhlı / Korumalı Araba",
                              "5+ Altın",
                              "200+ Altın",
                              "Askerî / Lonca kullanımı"
                            ],
                            [
                              "Kızak",
                              "5 Gümüş - 1 Altın",
                              "20 Altın",
                              "Kar, Buz, Çöl kızağı varyantı"
                            ]
                          ]
                        }
                      ]
                    },
                    {
                      "label": "YOLCU TAŞIMA",
                      "blocks": [
                        {
                          "type": "table",
                          "header": [
                            "HİZMET",
                            "FİYAT"
                          ],
                          "rows": [
                            [
                              "Köyler arası kısa yolculuk",
                              "2-5 Gümüş"
                            ],
                            [
                              "Kasabalar arası yolcu arabası",
                              "1 Altın"
                            ],
                            [
                              "Büyük şehirler arası ortak araba",
                              "3-5 Altın"
                            ],
                            [
                              "Özel araba kiralama, günlük",
                              "5 Altın"
                            ],
                            [
                              "Soylu/varlıklı kapalı araba, günlük",
                              "10+ Altın"
                            ],
                            [
                              "Tehlikeli rota yolcu ücreti",
                              "x2-x5"
                            ]
                          ]
                        }
                      ]
                    },
                    {
                      "label": "KERVAN SİSTEMİ",
                      "blocks": [
                        {
                          "type": "table",
                          "header": [
                            "KATILIM TİPİ",
                            "GÜNLÜK FİYAT",
                            "AÇIKLAMA"
                          ],
                          "rows": [
                            [
                              "Yaya eşlikçi",
                              "1 Gümüş",
                              "Kervanla yürür, koruma beklemez"
                            ],
                            [
                              "Sıradan yolcu",
                              "3 Gümüş",
                              "Güvenlikten faydalanır"
                            ],
                            [
                              "Arabada yolcu",
                              "1 Altın",
                              "Daha rahat"
                            ],
                            [
                              "Kapalı arabada yolcu",
                              "3 Altın",
                              "Varlıklı yolcu"
                            ],
                            [
                              "Gizli/özel yolcu",
                              "10+ Altın",
                              "Kimlik saklama, özel güvenlik"
                            ]
                          ]
                        },
                        {
                          "type": "heading",
                          "level": 3,
                          "text": "KERVANA KORUMA OLARAK KATILMAK"
                        },
                        {
                          "type": "table",
                          "header": [
                            "KORUMA SEVİYESİ",
                            "GÜNLÜK ÜCRET"
                          ],
                          "rows": [
                            [
                              "Acemi koruma",
                              "5 Gümüş"
                            ],
                            [
                              "Sıradan koruma",
                              "1 Altın"
                            ],
                            [
                              "Deneyimli koruma",
                              "3 Altın"
                            ],
                            [
                              "Canavar tehlikesi olan rota",
                              "5-10 Altın"
                            ],
                            [
                              "Sınır bölgesi / harabe rota",
                              "10-25 Altın"
                            ],
                            [
                              "Tesir bölgesi yakınları",
                              "25+ Altın veya özel ödeme"
                            ]
                          ]
                        }
                      ]
                    },
                    {
                      "label": "YÜK TAŞIMA",
                      "blocks": [
                        {
                          "type": "table",
                          "header": [
                            "YÜK SINIFI",
                            "ÖRNEK",
                            "GÜNLÜK ÜCRET"
                          ],
                          "rows": [
                            [
                              "Hafif",
                              "Sandık, kişisel eşya",
                              "1 Gümüş"
                            ],
                            [
                              "Orta",
                              "Ticari mal, silah sandığı",
                              "5 Gümüş"
                            ],
                            [
                              "Ağır",
                              "Varıl, maden, tahıl çuvalı",
                              "1 Altın"
                            ],
                            [
                              "Değerli ",
                              "Mücevher, evrak, nadir maden",
                              "3+ Altın"
                            ],
                            [
                              "Tehlikeli",
                              "Lanetli eşya, yaratık kalıntısı",
                              "10+ Altın"
                            ]
                          ]
                        }
                      ]
                    },
                    {
                      "label": "GEÇİŞ ÜCRETLERİ",
                      "blocks": [
                        {
                          "type": "table",
                          "header": [
                            "ÖDEME TÜRÜ",
                            "FİYAT"
                          ],
                          "rows": [
                            [
                              "Köprü Geçişi",
                              "1-5 Bakır"
                            ],
                            [
                              "Şehir Kapısı Giriş Ücreti",
                              "1 Gümüş"
                            ],
                            [
                              "Pazar Malı Giriş Vergisi",
                              "1-5 Gümüş"
                            ],
                            [
                              "Hayvan Başı Geçiş Ücreti",
                              "5 Bakır - 1 Gümüş"
                            ],
                            [
                              "Araba Geçiş Ücreti",
                              "1-3 Gümüş"
                            ],
                            [
                              "Kervan Geçiş Vergisi",
                              "1-10 Altın"
                            ],
                            [
                              "Sınır Karakolu Geçiş İzni",
                              "5+ Altın"
                            ],
                            [
                              "Kaçak Geçiş Rüşveti",
                              "1-20 Altın"
                            ]
                          ]
                        }
                      ]
                    },
                    {
                      "label": "REHBER, İZCİ, YOL BİLGİSİ",
                      "blocks": [
                        {
                          "type": "table",
                          "header": [
                            "HİZMET",
                            "GÜNLÜK FİYAT",
                            "AÇIKLAMA"
                          ],
                          "rows": [
                            [
                              "Yerel Rehber",
                              "5 Gümüş",
                              "Köy, orman, yakın rota"
                            ],
                            [
                              "Deneyimli Yol Rehberi",
                              "1 Altın",
                              "Uzun Yol"
                            ],
                            [
                              "Dağ Rehberi",
                              "2 Altın",
                              "Zorlu Arazi"
                            ],
                            [
                              "Harabe Rehberi",
                              "5 Altın",
                              "Riskli, nadir bulunur"
                            ],
                            [
                              "Sınır İzcisi",
                              "5-10 Altın",
                              "Tehlikeli Bölgeler"
                            ],
                            [
                              "Tesir bölgesi bilen rehber",
                              "25+ Altın",
                              "Para dışında da bedel isteyebilir"
                            ]
                          ]
                        }
                      ]
                    },
                    {
                      "label": "KORUMA VE MUHAFIZ ÜCRETLERİ",
                      "blocks": [
                        {
                          "type": "table",
                          "header": [
                            "KORUMA TİPİ",
                            "GÜNLÜK ÜCRET"
                          ],
                          "rows": [
                            [
                              "Sıradan sopa taşıyan koruma",
                              "5 Gümüş"
                            ],
                            [
                              "Silahlı Muhafız",
                              "1 Altın"
                            ],
                            [
                              "Deneyimli Muhafız",
                              "3 Altın"
                            ],
                            [
                              "Eski Asker",
                              "5 Altın"
                            ],
                            [
                              "Lonca Lisanslı Koruma",
                              "10 Altın"
                            ],
                            [
                              "Canavar Avcısı",
                              "25+ Altın"
                            ]
                          ]
                        }
                      ]
                    },
                    {
                      "label": "DENİZ VE NEHİR TAŞIMACILIĞI",
                      "blocks": [
                        {
                          "type": "heading",
                          "level": 3,
                          "text": "NEHİR YOLCULUĞU"
                        },
                        {
                          "type": "table",
                          "header": [
                            "HİZMET",
                            "FİYAT"
                          ],
                          "rows": [
                            [
                              "Kısa nehir geçisi",
                              "5 Bakır - 1 Gümüş"
                            ],
                            [
                              "Sal / küçük tekneyle geçiş",
                              "1 Gümüş"
                            ],
                            [
                              "Nehir teknesi yolculuğu, günlük",
                              "3 Gümüş"
                            ],
                            [
                              "Nehir yük yaşıma, 100kg/gün",
                              "5 Bakır - 1 Gümüş"
                            ],
                            [
                              "Akıntıya ters yolculuk",
                              "x2"
                            ],
                            [
                              "Tehlikeli nehir hattı",
                              "x3"
                            ]
                          ]
                        },
                        {
                          "type": "heading",
                          "level": 3,
                          "text": "DENİZ / KIYI YOLCULUĞU"
                        },
                        {
                          "type": "table",
                          "header": [
                            "HİZMET",
                            "FİYAT"
                          ],
                          "rows": [
                            [
                              "Kısa kıyı geçişi",
                              "1 Altın"
                            ],
                            [
                              "Şehirler arası gemi yolculuğu",
                              "5-20 Altın"
                            ],
                            [
                              "Güvertede yolcu",
                              "3 Altın"
                            ],
                            [
                              "Ortak kamarada yolcu",
                              "10 Altın"
                            ],
                            [
                              "Özel kamarada yolcu",
                              "30+ Altın"
                            ],
                            [
                              "100kg yük taşıma",
                              "1 - 5 Altın"
                            ],
                            [
                              "Tehlikeli rota",
                              "x2 - x5"
                            ]
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              "id": "ekipman-ekonomisi",
              "title": "EKİPMAN EKONOMİSİ",
              "body": "",
              "mode": "rich",
              "blocks": [
                {
                  "type": "tabs",
                  "tabs": [
                    {
                      "label": "SİLAHLAR",
                      "blocks": [
                        {
                          "type": "table",
                          "header": [
                            "SİLAH",
                            "FİYAT"
                          ],
                          "rows": [
                            [
                              "Sopa",
                              "1-2 Bakır"
                            ],
                            [
                              "Kalın Değnek",
                              "5 Bakır"
                            ],
                            [
                              "Taş/Kurşun sapan",
                              "5 Bakır"
                            ],
                            [
                              "Hançer",
                              "5 Gümüş"
                            ],
                            [
                              "Basit Bıçak",
                              "2 Gümüş"
                            ],
                            [
                              "El Baltası",
                              "5 Gümüş"
                            ],
                            [
                              "Orak / Tarım Aleti",
                              "2 - 5 Gümüş"
                            ],
                            [
                              "Kısa Mızrak",
                              "1 Altın"
                            ],
                            [
                              "Basit Yay",
                              "1 Altın"
                            ],
                            [
                              "Basit Arbalet",
                              "3 Altın"
                            ]
                          ]
                        }
                      ]
                    },
                    {
                      "label": "ASKERİ SİLAHLAR",
                      "blocks": [
                        {
                          "type": "table",
                          "header": [
                            "SİLAH",
                            "FİYAT"
                          ],
                          "rows": [
                            [
                              "Kısa Kılıç",
                              "2 Altın"
                            ],
                            [
                              "Uzun Kılıç",
                              "5 Altın"
                            ],
                            [
                              "Savaş Baltası",
                              "5 Altın"
                            ],
                            [
                              "Topuz",
                              "3 Altın"
                            ],
                            [
                              "Gürz",
                              "6 Altın"
                            ],
                            [
                              "Uzun Mızrak",
                              "3 Altın"
                            ],
                            [
                              "Kargı",
                              "4 Altın"
                            ],
                            [
                              "Halberd",
                              "8 Altın"
                            ],
                            [
                              "Çift Elli Balta",
                              "10 Altın"
                            ],
                            [
                              "Çift Elli Kılıç",
                              "15 Altın"
                            ],
                            [
                              "Kaliteli Savaş Yayı",
                              "5 Altın"
                            ],
                            [
                              "Ağır Arbalet",
                              "10 Altın"
                            ],
                            [
                              "Fırlatma Bıçakları, 5'li",
                              "5 Altın"
                            ],
                            [
                              "Kompozit Yay",
                              "25 Altın"
                            ],
                            [
                              "Mekanik Arbalet",
                              "30 Altın"
                            ],
                            [
                              "Gizli Bilek Bıçağı",
                              "25 Altın"
                            ]
                          ]
                        }
                      ]
                    },
                    {
                      "label": "MÜHİMMAT",
                      "blocks": [
                        {
                          "type": "table",
                          "header": [
                            "MÜHİMMAT",
                            "FİYAT"
                          ],
                          "rows": [
                            [
                              "1 Ok",
                              "1 Bakır"
                            ],
                            [
                              "1 Kaliteli Ok",
                              "3 Bakır"
                            ],
                            [
                              "1 Zırh Delici Ok",
                              "1 Gümüş"
                            ],
                            [
                              "1 Arbalet Oku",
                              "2 Bakır"
                            ],
                            [
                              "1 Ağır Arbalet Oku",
                              "6 Bakır"
                            ],
                            [
                              "Fırlatma Bıçağı",
                              "1 Altın"
                            ]
                          ]
                        }
                      ]
                    },
                    {
                      "label": "KALKAN",
                      "blocks": [
                        {
                          "type": "table",
                          "header": [
                            "KALKAN",
                            "FİYAT"
                          ],
                          "rows": [
                            [
                              "Basit Tahta Kalkan",
                              "5 Gümüş"
                            ],
                            [
                              "Küçük Kalkan",
                              "1 Altın"
                            ],
                            [
                              "Orta Kalkan",
                              "3 Altın"
                            ],
                            [
                              "Güçlendirilmiş Kalkan",
                              "10 Altın"
                            ],
                            [
                              "Büyük Kalkan",
                              "13 Altın"
                            ],
                            [
                              "Kule Kalkan",
                              "25 Altın"
                            ]
                          ]
                        }
                      ]
                    },
                    {
                      "label": "ZIRHLAR",
                      "blocks": [
                        {
                          "type": "table",
                          "header": [
                            "ZIRH",
                            "FİYAT"
                          ],
                          "rows": [
                            [
                              "Kalın giysi / dolgulu kıyafet",
                              "2 Altın"
                            ],
                            [
                              "Deri Zırh",
                              "5 Altın"
                            ],
                            [
                              "Sertleştirilmiş Deri",
                              "15 Altın"
                            ],
                            [
                              "Zincir Gömlek",
                              "25 Altın"
                            ],
                            [
                              "Pul Zırh",
                              "40 Altın"
                            ],
                            [
                              "Ağır Zincir Zırh",
                              "100 Altın"
                            ],
                            [
                              "Parçalı Plaka Zırh",
                              "150 Altın"
                            ],
                            [
                              "Yarım Plaka Zırh",
                              "200 Altın"
                            ],
                            [
                              "Tam Plaka Zırh",
                              "500 Altın"
                            ]
                          ]
                        }
                      ]
                    },
                    {
                      "label": "PARÇA ZIRHLAR",
                      "blocks": [
                        {
                          "type": "table",
                          "header": [
                            "PARÇA",
                            "FİYAT"
                          ],
                          "rows": [
                            [
                              "Deri Eldiven",
                              "5 Gümüş"
                            ],
                            [
                              "Sertleştirilmiş Deri Eldiven",
                              "2 Altın"
                            ],
                            [
                              "Metal Eldiven",
                              "10 Altın"
                            ],
                            [
                              "Deri Bot",
                              "1 Altın"
                            ],
                            [
                              "Sertleştirilmiş Deri Botlar",
                              "5 Altın"
                            ],
                            [
                              "Metal Dizlik",
                              "5 Altın"
                            ],
                            [
                              "Metal Kolluk",
                              "5 Altın"
                            ],
                            [
                              "Basit Miğfer",
                              "3 Altın"
                            ],
                            [
                              "iyi Miğfer",
                              "10 Alın"
                            ],
                            [
                              "Kapalı Savaş Miğferi",
                              "25 Altın"
                            ],
                            [
                              "Göğüs Plakası",
                              "60 Altın"
                            ],
                            [
                              "Omuzluk Seti",
                              "20 Altın"
                            ]
                          ]
                        }
                      ]
                    },
                    {
                      "label": "TAMİR, BAKIM VE UYARLAMA",
                      "blocks": [
                        {
                          "type": "heading",
                          "level": 3,
                          "text": "BAKIM"
                        },
                        {
                          "type": "table",
                          "header": [
                            "HİZMET",
                            "FİYAT"
                          ],
                          "rows": [
                            [
                              "Bileme",
                              "5 Bakır - 1 Gümüş"
                            ],
                            [
                              "Silah Genel Bakım",
                              "2 Gümüş"
                            ],
                            [
                              "Yay Kirişi değiştirme",
                              "1 Gümüş"
                            ],
                            [
                              "Kalkan Tamiri",
                              "1 - 5 Gümüş"
                            ],
                            [
                              "Hafif Zırh Bakımı",
                              "5 Gümüş"
                            ],
                            [
                              "Orta Zırh Bakımı",
                              "1 Altın"
                            ],
                            [
                              "Ağır Zırh Bakımı",
                              "3 Altın"
                            ],
                            [
                              "Tam Plaka Bakımı",
                              "10 Altın"
                            ]
                          ]
                        },
                        {
                          "type": "heading",
                          "level": 3,
                          "text": "TAMİR"
                        },
                        {
                          "type": "table",
                          "header": [
                            "HASAR SEVİYESİ",
                            "FİYAT"
                          ],
                          "rows": [
                            [
                              "Küçük Hasar",
                              "Eşya fiyatının %5'i"
                            ],
                            [
                              "Orta Hasar",
                              "Eşya fiyatının %15'i"
                            ],
                            [
                              "Ağır Hasar",
                              "Eşya fiyatının %30'u"
                            ],
                            [
                              "Neredeyse Kırılmış",
                              "Eşya fiyatının %50'si"
                            ]
                          ]
                        },
                        {
                          "type": "heading",
                          "level": 3,
                          "text": "ÖLÇÜYE UYARLAMA"
                        },
                        {
                          "type": "table",
                          "header": [
                            "İŞLEM",
                            "FİYAT"
                          ],
                          "rows": [
                            [
                              "Deri Zırh Uyarlama",
                              "Zırh Fiyatının %10'u"
                            ],
                            [
                              "Zincir / Pul Zırh uyarlama",
                              "Zırh Fiyaının %20'si"
                            ],
                            [
                              "Yarım Plaka Uyarlama",
                              "Zırh Fiyatının %30'u"
                            ],
                            [
                              "Tam Plaka Uyarlama",
                              "Zırh Fiyatının %40'ı"
                            ]
                          ]
                        }
                      ]
                    },
                    {
                      "label": "AYDINLATMA EKİPMANLARI",
                      "blocks": [
                        {
                          "type": "table",
                          "header": [
                            "EŞYA",
                            "FİYAT",
                            "AÇIKLAMA"
                          ],
                          "rows": [
                            [
                              "Meşale",
                              "1 Bakır",
                              "Kısa süreli ışık"
                            ],
                            [
                              "Kaliteli Meşale ",
                              "7 Bakır",
                              "Daha uzun yanar, rüzgara dayanıklı"
                            ],
                            [
                              "Yağ, küçük şişe",
                              "5 Bakır",
                              "Fener veya ateş için"
                            ],
                            [
                              "Yağ, büyük şişe",
                              "1 Gümüş",
                              "Uzun yol için"
                            ],
                            [
                              "El Feneri",
                              "1 Altın",
                              "Maceracı standardı"
                            ],
                            [
                              "Kapalı Fener",
                              "3 Altın",
                              "Rüzgar ve yağmura dayanıklı"
                            ],
                            [
                              "Sinyal Feneri",
                              "15 Altın",
                              "Uzak mesafeli işaretleme"
                            ]
                          ]
                        }
                      ]
                    },
                    {
                      "label": "KAMP EKİPMANLARI",
                      "blocks": [
                        {
                          "type": "table",
                          "header": [
                            "EŞYA",
                            "FİYAT",
                            "AÇIKLAMA"
                          ],
                          "rows": [
                            [
                              "İnce battaniye",
                              "5 Bakır",
                              "Kötü hava için yetersiz"
                            ],
                            [
                              "Kalın battaniye",
                              "1 Gümüş",
                              "Temel Kamp eşyası"
                            ],
                            [
                              "Uyku tulumu",
                              "5 Gümüş",
                              "Yolcu standardı"
                            ],
                            [
                              "Kaliteli uyku tulumu",
                              "1 Altın",
                              "Soğukta sıcak tutar"
                            ],
                            [
                              "Hasır/deri mat",
                              "5 Bakır",
                              "Zeminden korur"
                            ],
                            [
                              "Kamp Bezi",
                              "1 Gümüş",
                              "Yağmur ve rüzgar için"
                            ],
                            [
                              "Basit çadır, 1 kişilik",
                              "2 Altın",
                              "Ucuz, hafif"
                            ],
                            [
                              "Standart Çadır, 2 kişilik",
                              "5 Altın",
                              "Maceracı Standardı"
                            ],
                            [
                              "Büyük Çadır, 4 kişilik",
                              "12 altın",
                              "Grup kampı"
                            ],
                            [
                              "Kaliteli Kış Çadırı",
                              "25 Altın",
                              "Soğuktan korur"
                            ],
                            [
                              "Askerî Çadır",
                              "50 Altın",
                              "Sağlam, ağır"
                            ],
                            [
                              "Kamp pişirme takımı",
                              "1 Altın",
                              "Tencere, kap, küçük araçlar"
                            ],
                            [
                              "Seyyar ocak, mangal",
                              "3 Altın",
                              "Uzun kamp için"
                            ]
                          ]
                        },
                        {
                          "type": "heading",
                          "level": 3,
                          "text": "KAMP KONFORU"
                        },
                        {
                          "type": "table",
                          "header": [
                            "KAMP KALİTESİ",
                            "GEREKLİ EKİPMAN",
                            "OYUN ETKİSİ"
                          ],
                          "rows": [
                            [
                              "Kötü Kamp",
                              "Battaniye/açık alan",
                              "Dinlenme zayıf, hastalık ve yorgunluk riski"
                            ],
                            [
                              "Basit Kamp",
                              "Uyku tulumu + kamp bezi",
                              "Normal dinlenme"
                            ],
                            [
                              "Standart Kamp",
                              "Çadır + Uyku Tulumu + Pişirme Takımı",
                              "Güvenli Dinlenme"
                            ],
                            [
                              "Kaliteli Kamp",
                              "İyi Çadır + Kaliteli Tulum + Sıcak Yemek",
                              "Uzun yol yorgunluğu azalır"
                            ],
                            [
                              "Askerî Kamp",
                              "Büyük Çadır + Nöbet Düzeni + Araçlar",
                              "Baskın ve hava riski azalır"
                            ]
                          ]
                        }
                      ]
                    },
                    {
                      "label": "TIRMANMA EKİPMANI",
                      "blocks": [
                        {
                          "type": "table",
                          "header": [
                            "EŞYA",
                            "FİYAT",
                            "AÇIKLAMA"
                          ],
                          "rows": [
                            [
                              "Kenevir ip, 10m",
                              "5 Bakır",
                              "Ucuz, Ağır"
                            ],
                            [
                              "Kaliteli ip, 10m ",
                              "2 Gümüş",
                              "Daha sağlam"
                            ],
                            [
                              "Kanca",
                              "5 Gümüş",
                              "Tırmanma, sabitleme"
                            ],
                            [
                              "Katlanır kanca",
                              "1 Altın",
                              "Taşınabilir"
                            ],
                            [
                              "Çivi/kazık seti",
                              "5 Altın",
                              "Kamp ve tırmanış"
                            ],
                            [
                              "Çekiç",
                              "5 Bakır",
                              "Genel kullanım"
                            ],
                            [
                              "Tırmanma takımı",
                              "5 Altın",
                              "Kanca, piton, ip düzeni"
                            ],
                            [
                              "Kaliteli tırmanma takımı",
                              "15 Altın",
                              "Daha güvenli"
                            ],
                            [
                              "Mağara iniş takımı",
                              "20 Altın",
                              "Uzun inişler için"
                            ]
                          ]
                        }
                      ]
                    },
                    {
                      "label": "ÇANTA, KESE, SANDIK VE TAŞIMA",
                      "blocks": [
                        {
                          "type": "table",
                          "header": [
                            "EŞYA",
                            "FİYAT",
                            "AÇIKLAMA"
                          ],
                          "rows": [
                            [
                              "Deri kese",
                              "5 Bakır",
                              "Sağlam taşıma kesesi"
                            ],
                            [
                              "Omuz Çantası",
                              "5 Bakır",
                              "Hafif yük için"
                            ],
                            [
                              "Sırt çantası",
                              "1 Gümüş",
                              "Standart Yolcu Çantası"
                            ],
                            [
                              "Maceracı Sırt Çantası",
                              "2 Altın",
                              "Ekipman bölmeli"
                            ],
                            [
                              "Su geçirmez çanta",
                              "5 Altın",
                              "Nehir, bataklık, yağmur"
                            ],
                            [
                              "Ahşap Sandık",
                              "5 Gümüş",
                              "Depolama"
                            ],
                            [
                              "Kilitli Sandık",
                              "2 Altın",
                              "Güvenli Saklama"
                            ],
                            [
                              "Bel kemeri ekipman askısı",
                              "5 Gümüş",
                              "Küçük araçlara hızlı erişim"
                            ],
                            [
                              "Harita tüpü",
                              "5 Gümüş",
                              "Harita, parşömen"
                            ]
                          ]
                        }
                      ]
                    },
                    {
                      "label": "SU, MATARA VE SIVI KABI",
                      "blocks": [
                        {
                          "type": "table",
                          "header": [
                            "EŞYA",
                            "FİYAT",
                            "AÇIKLAMA"
                          ],
                          "rows": [
                            [
                              "Küçük Matara",
                              "5 Bakır",
                              "1 Litre"
                            ],
                            [
                              "Standart Matara",
                              "1 Gümüş",
                              "3 Litre"
                            ],
                            [
                              "Deri su tulumu",
                              "2 Gümüş",
                              "6 Litre"
                            ],
                            [
                              "Büyük Su Tulumu",
                              "5 Gümüş",
                              "10 Litre"
                            ],
                            [
                              "Seramik Şişe",
                              "5 Bakır",
                              "Kırılgan, 0.5 L"
                            ],
                            [
                              "Metal Şişe",
                              "2 Altın",
                              "Sağlam, 0.5 L"
                            ],
                            [
                              "Su Artıma Bezi",
                              "5 Gümüş",
                              "Basit Süzme"
                            ],
                            [
                              "Varil",
                              "1 Altın",
                              "50 Litre"
                            ]
                          ]
                        }
                      ]
                    },
                    {
                      "label": "KİLİT, TUZAK & HIRSIZ ALETLERİ",
                      "blocks": [
                        {
                          "type": "table",
                          "header": [
                            "EŞYA",
                            "FİYAT",
                            "AÇIKLAMA"
                          ],
                          "rows": [
                            [
                              "Basit Kilit",
                              "5 Gümüş",
                              "Sandık, kapı"
                            ],
                            [
                              "İyi Kilit",
                              "2 Altın",
                              "Daha Zor Açılır"
                            ],
                            [
                              "Kaliteli Kilit",
                              "10 Altın",
                              "Tüccar, Lonca seviyesi"
                            ],
                            [
                              "Basit zincir",
                              "1 Altın",
                              ""
                            ],
                            [
                              "Güçlü zincir",
                              "5 Altın",
                              ""
                            ],
                            [
                              "Pranga",
                              "3 Altın",
                              "Esir taşıma"
                            ],
                            [
                              "Kilit açma takımı",
                              "20 Altın",
                              "Uzman ekipmanı"
                            ],
                            [
                              "Tuzak Kurma, Sökme takımı",
                              "25 Altın",
                              "Mekanik tuzaklar"
                            ],
                            [
                              "İnce tel seti",
                              "5 Altın",
                              "Tuzak, anahtar işi"
                            ],
                            [
                              "Küçük ayna",
                              "2 Gümüş",
                              "Köşe-kapı altı bakma"
                            ]
                          ]
                        }
                      ]
                    },
                    {
                      "label": "ŞİFACI & TIBBİ EKİPMAN",
                      "blocks": [
                        {
                          "type": "table",
                          "header": [
                            "EŞYA",
                            "FİYAT",
                            "AÇIKLAMA"
                          ],
                          "rows": [
                            [
                              "Basit Bandaj",
                              "2 Bakır",
                              "Tek kullanımlık"
                            ],
                            [
                              "Temiz bandaj seti",
                              "1 Gümüş",
                              "5x Bandaj"
                            ],
                            [
                              "Kaliteli Bandaj Seti",
                              "5 Gümüş",
                              "Yaraya Müdahale için 5x"
                            ],
                            [
                              "Bitkisel merhem",
                              "5 Gümüş",
                              "Basit yaraya müdahale 5x"
                            ],
                            [
                              "Ağrı kesici ot karışımı",
                              "1 Altın",
                              "Ağrıyı keserek anlık kısıtlamaları kaldırır"
                            ],
                            [
                              "Ateş Düşürücü Karışım",
                              "1 Altın",
                              "Hastalık tedavisi"
                            ],
                            [
                              "Panzehir, zayıf",
                              "5 Altın",
                              "Basit zehirlere karşı, genel"
                            ],
                            [
                              "Panzehir, standart",
                              "15 Altın",
                              "Tehlikeli zehirlere karşı, genel"
                            ],
                            [
                              "Sıhhiye çantası",
                              "10 Altın",
                              "Temel tıbbi set"
                            ],
                            [
                              "Cerrahi Seti",
                              "50 Altın",
                              "Uzman seti"
                            ]
                          ]
                        }
                      ]
                    },
                    {
                      "label": "YAZI, KAYIT, ARŞİV",
                      "blocks": [
                        {
                          "type": "table",
                          "header": [
                            "EŞYA",
                            "FİYAT",
                            "AÇIKLAMA"
                          ],
                          "rows": [
                            [
                              "Kömür Kalem",
                              "1 Bakır",
                              "Ucuz yazım"
                            ],
                            [
                              "Basit Kalem",
                              "5 Bakır",
                              "Günlük kayıt"
                            ],
                            [
                              "Mürekkep, küçük şişe",
                              "1 Gümüş",
                              "Standart"
                            ],
                            [
                              "Kaliteli mürekkep",
                              "5 Gümüş",
                              "Uzun ömürlü"
                            ],
                            [
                              "Parşömen, tek yaprak",
                              "5 Bakır",
                              "Yazı zemini"
                            ],
                            [
                              "Kağıt, 5 Yaprak",
                              "5 Bakır",
                              "Bölgeye göre değişken"
                            ],
                            [
                              "Defter",
                              "1 Altın",
                              "Günlük vb."
                            ],
                            [
                              "Mühür",
                              "5 Altın",
                              "Kimlik, statü"
                            ],
                            [
                              "Belge tüpü",
                              "5 Gümüş",
                              "Koruma"
                            ],
                            [
                              "Kâtip Seti",
                              "10 Altın",
                              "Kalem, mürekkep, bıçak, cetvel vb."
                            ],
                            [
                              "Arşivci seti",
                              "30 Altın",
                              "Katalog, koruma, kopyalama araçları"
                            ],
                            [
                              "Şifreli kayıt defteri",
                              "25 Altın",
                              "Gizli Yazım"
                            ]
                          ]
                        }
                      ]
                    },
                    {
                      "label": "ZANAAT VE MESLEK TAKIMLARI",
                      "blocks": [
                        {
                          "type": "table",
                          "header": [
                            "TAKIM",
                            "FİYAT",
                            "KULLANIM"
                          ],
                          "rows": [
                            [
                              "Basit alet takımı",
                              "2 Altın",
                              "Genel Tamir"
                            ],
                            [
                              "Marangoz takımı",
                              "10 Altın",
                              "Ahşap işleme"
                            ],
                            [
                              "Demirci el takımı",
                              "25 Altın",
                              "Basit zırh tamiri"
                            ],
                            [
                              "Seyyar Demirci takımı",
                              "100 Altın",
                              "Kervan, ordu"
                            ],
                            [
                              "Derici Takımı",
                              "15 Altın",
                              "Deri onarımı"
                            ],
                            [
                              "Terzi takımı",
                              "5 Altın",
                              "Kıyafet, zırh astarı vb. tamir"
                            ],
                            [
                              "Aşçı Takımı",
                              "5 Altın",
                              "Kamp, han mutfağı"
                            ],
                            [
                              "Simyacı Takımı",
                              "75 Altın",
                              "Nadir, dikkat çeker"
                            ],
                            [
                              "Otacı, toplayıcı takımı",
                              "15 Altın",
                              "Bitki tanıma, kurutma vb."
                            ],
                            [
                              "Haritacı Takımı",
                              "30 Altın",
                              "Ölçüm, çizim vb."
                            ],
                            [
                              "Kuyumcu takımı",
                              "50 Altın",
                              "İnce işçilik"
                            ],
                            [
                              "Avcı takımı",
                              "10 Altın",
                              "Tuzak, kesim, iz"
                            ]
                          ]
                        }
                      ]
                    },
                    {
                      "label": "KEŞİF, GÖZLEM & İŞARET",
                      "blocks": [
                        {
                          "type": "table",
                          "header": [
                            "EŞYA",
                            "FİYAT",
                            "AÇIKLAMA"
                          ],
                          "rows": [
                            [
                              "Metal düdük",
                              "1 Gümüş",
                              "Ses çıkarma"
                            ],
                            [
                              "Basit Büyüteç",
                              "10 Altın",
                              "İnceleme"
                            ],
                            [
                              "Dürbün benzeri optik araç",
                              "100+ Altın",
                              "Nadir, pahalı"
                            ],
                            [
                              "Bayrak, flama seti",
                              "3 Altın",
                              "Görsel sinyal"
                            ]
                          ]
                        }
                      ]
                    },
                    {
                      "label": "AV, TUZAK & HAYATTA KALMA",
                      "blocks": [
                        {
                          "type": "table",
                          "header": [
                            "EŞYA",
                            "FİYAT",
                            "AÇIKLAMA"
                          ],
                          "rows": [
                            [
                              "Basit kapan",
                              "5 Gümüş",
                              "Küçük hayvan için"
                            ],
                            [
                              "Güçlü kapan",
                              "2 altın",
                              "Orta hayvan"
                            ],
                            [
                              "Büyük av kapanı",
                              "10 Altın",
                              "Tehlikeli, ağır"
                            ],
                            [
                              "Balık Ağı",
                              "1 Altın",
                              "Ağır"
                            ],
                            [
                              "Olta takımı",
                              "5 Gümüş",
                              "Hafif"
                            ],
                            [
                              "Deri yüzme bıçağı",
                              "1 Altın",
                              "Kesim, yüzme"
                            ],
                            [
                              "Deri yüzme takımı",
                              "5 Altın",
                              "Avcı işi"
                            ],
                            [
                              "Tuzlama, kurutma seti",
                              "2 Altın",
                              "Et Saklama"
                            ],
                            [
                              "Çakmak Taşı",
                              "5 Bakır",
                              "Temel"
                            ],
                            [
                              "Kaliteli Ateş Başlatma Kiti",
                              "1 Altın",
                              "Yağmurda daha güenilir"
                            ]
                          ]
                        }
                      ]
                    },
                    {
                      "label": "ÖZEL BÖLGE EKİPMANLARI",
                      "blocks": [
                        {
                          "type": "heading",
                          "level": 3,
                          "text": "SOĞUK BÖLGE / SOĞUK ÇÖL"
                        },
                        {
                          "type": "table",
                          "header": [
                            "EŞYA",
                            "FİYAT"
                          ],
                          "rows": [
                            [
                              "Kalın kürk manto",
                              "5 Altın"
                            ],
                            [
                              "Soğuk bölge botu",
                              "3 Altın"
                            ],
                            [
                              "Kürklü eldiven",
                              "1 Altın"
                            ],
                            [
                              "Kar gözlüğü",
                              "2 Altın"
                            ],
                            [
                              "Soğuk Bölge Kamp Seti",
                              "25 Altın"
                            ],
                            [
                              "Soğuk Bölge Yol Seti",
                              "50 Altın"
                            ]
                          ]
                        },
                        {
                          "type": "heading",
                          "level": 3,
                          "text": "KURAK BÖLGE"
                        },
                        {
                          "type": "table",
                          "header": [
                            "EŞYA",
                            "FİYAT"
                          ],
                          "rows": [
                            [
                              "Güneş Örtüsü",
                              "1 Altın"
                            ],
                            [
                              "İnce Çöl Pelerini ",
                              "2 Altın"
                            ],
                            [
                              "Su Filtre Seti",
                              "3 Altın"
                            ],
                            [
                              "Kum gözlüğü",
                              "2 Altın"
                            ],
                            [
                              "Çöl kamp bezi",
                              "5 Altın"
                            ]
                          ]
                        },
                        {
                          "type": "heading",
                          "level": 3,
                          "text": "BATAKLIK, YAĞMUR ORMANI"
                        },
                        {
                          "type": "table",
                          "header": [
                            "EŞYA",
                            "FİYAT"
                          ],
                          "rows": [
                            [
                              "Su geçirmez bot",
                              "5 Altın"
                            ],
                            [
                              "Böcek ağı",
                              "1 Altın"
                            ],
                            [
                              "Su geçirmez çanta",
                              "5 Altın"
                            ],
                            [
                              "Bataklık sırığı",
                              "5 Gümüş"
                            ]
                          ]
                        }
                      ]
                    }
                  ]
                },
                {
                  "type": "heading",
                  "level": 3,
                  "text": "KALİTE SEVİYELERİ"
                },
                {
                  "type": "table",
                  "header": [
                    "KALİTE",
                    "FİYAT ÇARPANI",
                    "ETKİ"
                  ],
                  "rows": [
                    [
                      "Kötü",
                      "x0.5",
                      "Kırılma, pas, ceza ihtimali"
                    ],
                    [
                      "Sıradan",
                      "x1",
                      "Standart"
                    ],
                    [
                      "İyi İşçilik",
                      "x2",
                      "Dayanıklı, dengeli"
                    ],
                    [
                      "Usta İşi",
                      "x5",
                      "Daha hafif, daha sağlam, prestijli"
                    ],
                    [
                      "Nadir Usta İşi",
                      "x10",
                      "Özel Sipariş, İsimli Zanaatkâr"
                    ],
                    [
                      "Antik/Savaş Öncesi",
                      "x20+",
                      "Koleksiyon, sır, kalite veya lanet"
                    ]
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  }
};

window.SLVNZ_VERSIONS = {
  "versions": [
    {
      "id": "ver_mprc997t",
      "label": "v4.0",
      "createdAt": "2026-05-29",
      "content": {
        "meta": {
          "title": "SLVNZ 4.0",
          "brandName": "SLVNZ",
          "brandAccent": "4.0",
          "brandLogo": "",
          "heroLine1": "SLVNZ",
          "heroLine2": "4.0",
          "tagline": "MASAÜSTÜ ROL YAPMA SİSTEMİ",
          "description": "",
          "version": "v4.0",
          "contentSeed": "2026-07-07-mrasku9t"
        },
        "sections": {
          "oyun-kurallari": {
            "label": "OYUN KURALLARI",
            "blurb": "Sistemin çekirdeği — zarlar, nitelikler, savaş ve karakter gelişimi.",
            "items": [
              {
                "id": "oyun-sistemi",
                "title": "OYUN SİSTEMİ",
                "mode": "rich",
                "blocks": [
                  {
                    "type": "heading",
                    "level": 2,
                    "text": "SLVNZ 4.0 SİSTEMİ"
                  },
                  {
                    "type": "paragraph",
                    "text": "SLVNZ 4.0 sistemi, özünde D&D ve FATE sistemlerini baz ve ilham alınarak düşünülmüş, özelleştirilmiş ve detaylandırılmış bir masaüstü rol yapma oyunu sistemidir. 3.0 sistemine kıyasla \"Düşük Fantazya\" atmosferini yaşatmak üzere düzenlenmiştir."
                  },
                  {
                    "type": "paragraph",
                    "text": "Sistem mümkün olduğunca oyun etkisini barındırırken, oyuncunun sistemin ördüğü sınırlara bağlı kalmadan, yaratıcılığını ve rolünü ortaya koyarak oyunun ve savaşın gidişatına yön vermesini amaçlayan esnek gerçekçiliği sunmayı hedeflemektedir."
                  }
                ]
              },
              {
                "id": "zarlar-eylemler",
                "title": "ZARLAR & EYLEMLER",
                "mode": "rich",
                "blocks": [
                  {
                    "type": "heading",
                    "level": 2,
                    "text": "ZARLAR & EYLEMLER"
                  },
                  {
                    "type": "paragraph",
                    "text": "Oyundaki eylemler, karakterinizle gerçekleştirmek isteyeceğiniz herhangi bir girişimi ifade eder. Bazı eylemler bir beceri gerektirmeden doğrudan gerçekleşebilse de bazı eylemlerin gerçekleşmesi için zar kullanılması gerekir. Kullanılacak zarlar 20 yüzlü bir zar (d20) kullanılarak gerçekleştirilebilir."
                  },
                  {
                    "type": "paragraph",
                    "text": "Zar kullanımı ile gerçekleşen herhangi bir eylemin sonucu zarın yansıttığı sayının yüksekliği ile doğru orantılı bir şekilde değişir. Oyun yöneticisi bahsedilen sayı/sayılarla ilgili özelleştirilmiş bir sınır ya da kriter belirtmediyse, sisteme göre zarın yansıttığı sayıların doğuracağı sonuçlar şu şekilde gelişebilmektedir:"
                  },
                  {
                    "type": "table",
                    "header": [
                      "D20",
                      "AÇIKLAMA"
                    ],
                    "rows": [
                      [
                        "1",
                        "Kritik Başarısızlık"
                      ],
                      [
                        "2-5",
                        "Başarısızlık"
                      ],
                      [
                        "6-10",
                        "Şartlı Başarı"
                      ],
                      [
                        "11-19",
                        "Başarı"
                      ],
                      [
                        "20",
                        "Kritik Başarı"
                      ]
                    ]
                  },
                  {
                    "type": "paragraph",
                    "text": "Eylemlerin geneli, oyun yöneticisinin tercihine göre 10 yüzlü ya da 20 yüzlü zar kullanma seçimi yapılırken kurulmak istenilen denge göz önünde bulundurulmalıdır. 10 yüzlü zar daha dar bir yelpazede daha dengeli bir sonuç yelpazesi oluşturabilirken, 20 yüzlü zar seçimi başarıyı daha yüksek bir ihtimale yayarken başarısızlığın denk gelmesi halinde oluşabilecek cezayı daha ağır bir hale getirebilmektedir."
                  },
                  {
                    "type": "heading",
                    "level": 3,
                    "text": "ZARA GÖRE BAŞARI DURUMLARI"
                  },
                  {
                    "type": "paragraph",
                    "text": "Zar kullanımının sonucunu yansıtan sayıların sebep olabilecekleri durumların karşılıkları şu şekildedir:"
                  },
                  {
                    "type": "heading",
                    "level": 3,
                    "text": "Kritik Başarısızlık"
                  },
                  {
                    "type": "paragraph",
                    "text": "Eylem sonucunu belirlemek için nasıl bir zar kullanılırsa kullanılsın, sonucunun 1 gelmesi halinde, gerçekleştirilmeye çalışılan eylem kesin bir şekilde başarısız sonuçlanır. Bu başarısızlığın yanı sıra ortaya çıkan sonuç, eyleme kalkışan karakter ve/veya çevresindeki karakterler için olumsuz durumlara sebebiyet verebilir. Ayrıca, kritik başarısızlık durumlarında, karakterin sahip olduğu herhangi bir artı/fazladan değer bu kritik duruma dahil edilmez."
                  },
                  {
                    "type": "example",
                    "text": "Usta bir hırsız olan Majik, korsan şehri Sulgaran'ın en büyük iskelesindeki \"Sorvalas\" isimli bir yük gemisine sızmaya çalışmaktadır. Geminin kıç tarafına denizden tırmanmayı başaran Majik, yük deposuna açılan bir pencereyi dışarıdan açmaya çalışmak için 20 yüzlü bir zar kullanır. Zarın sonucu 1 gelir. Majik, camı açmaya çalışmakta başarısız olmakla kalmaz, tutunduğu yerde dengesini kaybederek suya düşer ve yüksek bir ses çıkarır. Bu ses, iskele etrafındaki sivillerin ve muhafızların dikkatini çekecektir ki o bölgeye doğru birkaç kişi neler olduğunu görmek üzere yola koyulur."
                  },
                  {
                    "type": "heading",
                    "level": 3,
                    "text": "Başarısızlık"
                  },
                  {
                    "type": "paragraph",
                    "text": "Başarısızlık durumunda da karakter gerçekleştirmeye çalıştığı eylemi gerçekleştiremez. Ancak, diğer iki başarısızlık durumundan da farklı olarak, karakterin gerçekleştirmeye çalıştığı eylem doğrultusunda herhangi bir fazladan değeri bulunuyorsa sayıya eklenerek zarın sonucu değiştirilebilir. Eklenen değer ile bahsedilen sınırlar aşılmıyorsa eylem gerçekleşemez ve başarısız olarak sonuçlanır."
                  },
                  {
                    "type": "heading",
                    "level": 3,
                    "text": "Şartlı Başarı"
                  },
                  {
                    "type": "paragraph",
                    "text": "Gerçekleştirilmeye çalışılan eylemin kısmi olarak başarılı olması ya da gerçekleşmesiyle birlikte karakterin ve/veya etrafındaki karakterlerin başına bir bela açılmasına sebep olan bir olay ile sonuçlanmasıdır."
                  },
                  {
                    "type": "heading",
                    "level": 3,
                    "text": "Başarı"
                  },
                  {
                    "type": "paragraph",
                    "text": "Karakterin gerçekleştirmeye çalıştığı eylemin başarılı bir şekilde sonuçlanmasıdır."
                  },
                  {
                    "type": "heading",
                    "level": 3,
                    "text": "Kritik Başarı"
                  },
                  {
                    "type": "paragraph",
                    "text": "Gerçekleştirilmeye çalışılan eylemin kesin bir şekilde başarılı sonuçlanmasıdır. Bu başarının yanında, kritik başarısızlık sonucunda benzer bir yaklaşımda, eyleme kalkışan karakter ve/veya etrafındaki karakterlere olumlu getirisi olabilecek bir durumun bu sonuca dahil olmasını gerektirir."
                  },
                  {
                    "type": "example",
                    "text": "Usta hırsız Majik, suya düştükten sonra etrafta toplanan insanlar tarafından fark edilmemek üzere geminin ters tarafında gizlenmeye çalışır. Gizlenmeye çalışırken bir GİZLİLİK zarı kullanır. Zar sonucu 20 ile sonuçlanır. Majik, kimse fark etmeden geminin kıç tarafındaki bir çıkıntıya tutunarak kendini sudan çeker ve iskeleye tamamen ters bir noktada gözden kaybolmayı başarır. Bu sırada, geminin depo alanında bulunan bir miço, depo penceresini açıp neyin düştüğüne bakmak üzere dışarıya bakar, bir şey göremeyip pencereyi kapatmayı unutarak içeriye döner. Majik, ortamda yaşanan karışıklığı da kendine avantaj edinerek açılmış olan pencereden içeriye girer."
                  }
                ]
              },
              {
                "id": "nitelikler",
                "title": "NİTELİKLER",
                "mode": "rich",
                "blocks": [
                  {
                    "type": "heading",
                    "level": 2,
                    "text": "NİTELİKLER"
                  },
                  {
                    "type": "paragraph",
                    "text": "Bazı durumlarda karakterlerin spesifik eylemleri gerçekleştirmelerinde onlara fayda sağlayabilecekleri nitelikleri bulunmaktadır. Bu nitelikler, herhangi bir karakterin sahip olduğu en temel özellikleri vurgular."
                  },
                  {
                    "type": "tabs",
                    "tabs": [
                      {
                        "label": "KUVVET (KUV)",
                        "blocks": [
                          {
                            "type": "paragraph",
                            "text": "Kuvvet, karakterin dış dünyaya doğrudan fiziksel güç uygulama kapasitesidir. Kas gücü, itme, çekme, kaldırma, kırma, savurma, zorlama ve fiziksel baskı kurma gibi eylemlerde kullanılır.\n\nKUV yüksek olan karakter, dünyayı bedeniyle zorlayabilen karakterdir. Ağır bir kapıyı omuzlamak, bir yaratığı geri itmek, bir kalkan hattını yarmak, ağır silahı etkili savurmak veya rakibi boğuşmada bastırmak KUV alanına girer.\n\nKUV şunları yönetir:"
                          },
                          {
                            "type": "table",
                            "header": [
                              "ALAN",
                              "AÇIKLAMA"
                            ],
                            "rows": [
                              [
                                "Ham fiziksel güç",
                                "Kırma, kaldırma, itme, çekme, ezme"
                              ],
                              [
                                "Yakın dövüş baskısı",
                                "Ağır silahlar, darbe kuvveti, silah savurma"
                              ],
                              [
                                "Boğuşma ve kontrol",
                                "Rakibi tutma, sürükleme, yere serme"
                              ],
                              [
                                "Taşıma kapasitesi",
                                "Ağır ekipman, yük, zırh toleransı"
                              ],
                              [
                                "Fiziksel engel aşma",
                                "Kapı kırma, zincir koparma, moloz kaldırma"
                              ]
                            ]
                          },
                          {
                            "type": "paragraph",
                            "text": "KUV şunları yapmaz:"
                          },
                          {
                            "type": "list",
                            "ordered": false,
                            "items": [
                              "Uzun süre dayanmayı belirlemez; bu DAY alanıdır.",
                              "Hızlı kaçınmayı veya dengeyi belirlemez; bu ÇEV alanıdır.",
                              "Korkuya, büyüye veya zihinsel baskıya direnmez; bu İRD alanıdır."
                            ]
                          },
                          {
                            "type": "example",
                            "text": "Örnek zar durumları:\n\n“Kapıyı kırıyorum.” → KUV\n“Rakibi omzumla geri itiyorum.” → KUV\n“Büyük baltayı tam güçle indiriyorum.” → KUV + ilgili silah becerisi\n“Çöken kirişi kaldırıp altından birini çıkarıyorum.” → KUV veya KUV + DAY, durumun süresine göre"
                          }
                        ]
                      },
                      {
                        "label": "ÇEVİKLİK (ÇEV)",
                        "blocks": [
                          {
                            "type": "paragraph",
                            "text": "Çeviklik, karakterin bedenini hızlı, dengeli, hassas ve kontrollü biçimde kullanma kapasitesidir. Refleks, kaçınma, denge, ince hareket, ani pozisyon alma, sessiz hareket ve hızlı saldırı koordinasyonu bu niteliğin alanına girer.\n\nÇEV yüksek olan karakter güçlü olmak zorunda değildir; fakat bedenini doğru anda doğru yere koyabilir. Saldırıdan sıyrılmak, dar bir çıkıntıda dengede kalmak, hızlı hamle yapmak, hafif silahla isabetli saldırmak veya düşmeden yuvarlanmak ÇEV ile ilgilidir.\n\nÇEV şunları yönetir:"
                          },
                          {
                            "type": "table",
                            "header": [
                              "ALAN",
                              "AÇIKLAMA"
                            ],
                            "rows": [
                              [
                                "Refleks",
                                "Ani tehlikeye tepki verme"
                              ],
                              [
                                "Kaçınma",
                                "Saldırıdan sıyrılma, yön değiştirme"
                              ],
                              [
                                "Denge",
                                "Dar zemin, kaygan yüzey, düşme riski"
                              ],
                              [
                                "İnce bedensel kontrol",
                                "Sessiz hareket, akrobatik manevra"
                              ],
                              [
                                "Hafif silah kullanımı",
                                "Hançer, kısa kılıç, çevik saldırı stilleri"
                              ],
                              [
                                "Hareket kapasitesi",
                                "Savaş alanında pozisyon alma, temel hareket artışı"
                              ]
                            ]
                          },
                          {
                            "type": "paragraph",
                            "text": "ÇEV şunları yapmaz:"
                          },
                          {
                            "type": "list",
                            "ordered": false,
                            "items": [
                              "Darbenin gücünü belirlemez; bu KUV alanıdır.",
                              "Darbe yedikten sonra ayakta kalmayı belirlemez; bu DAY alanıdır.",
                              "Tehlikeyi önceden hissetmeyi belirlemez; bu SZG alanıdır."
                            ]
                          },
                          {
                            "type": "example",
                            "text": "Örnek zar durumları:\n\n“Okun altından yuvarlanıyorum.” → ÇEV + Kaçınma\n“İnce taş köprüden koşarak geçiyorum.” → ÇEV\n“Sessizce muhafızın arkasından ilerliyorum.” → ÇEV + Gizlilik\n“Hançerle hızlı bir açık yakalamaya çalışıyorum.” → ÇEV + İsabet / ilgili silah becerisi"
                          }
                        ]
                      },
                      {
                        "label": "DAYANIKLILIK (DAY)",
                        "blocks": [
                          {
                            "type": "paragraph",
                            "text": "Dayanıklılık, karakterin bedensel baskıya, hasara, acıya, yorgunluğa, hastalığa, zehre ve uzun süreli fiziksel zorlanmaya direnme kapasitesidir. DAY, yalnızca “can” değildir; karakterin bedensel bütünlüğünü ne kadar süre koruyabildiğini ifade eder.\n\nDAY yüksek olan karakter her zaman iri veya güçlü olmak zorunda değildir; fakat kolay yıkılmaz. Zehre direnmek, kan kaybına rağmen ayakta kalmak, uzun yürüyüşe devam etmek, bloklama sırasında gelen darbeyi bedeniyle taşımak veya acı altında bilincini korumak DAY alanına girer.\n\nDAY şunları yönetir:"
                          },
                          {
                            "type": "table",
                            "header": [
                              "ALAN",
                              "AÇIKLAMA"
                            ],
                            "rows": [
                              [
                                "Fiziksel direnç",
                                "Darbe, düşme, ezilme, yanma, soğuk"
                              ],
                              [
                                "Acı toleransı",
                                "Yaralanmaya rağmen eylemi sürdürme"
                              ],
                              [
                                "Yorgunluk direnci",
                                "Uzun yürüyüş, antrenman, zor koşullar"
                              ],
                              [
                                "Zehir/hastalık direnci",
                                "Bedeni bozan dış etkilere karşı koyma"
                              ],
                              [
                                "Soluk temeli",
                                "Fiziksel kaynak havuzunun ana dayanağı"
                              ],
                              [
                                "Blok baskısı",
                                "Kalkan veya silahla gelen kuvveti taşıma"
                              ]
                            ]
                          },
                          {
                            "type": "paragraph",
                            "text": "DAY şunları yapmaz:"
                          },
                          {
                            "type": "list",
                            "ordered": false,
                            "items": [
                              "Ağır nesne kaldırmayı belirlemez; bu KUV alanıdır.",
                              "Saldırıdan kaçmayı belirlemez; bu ÇEV alanıdır.",
                              "Zihinsel veya ruhsal baskıya direnmez; bu İRD alanıdır."
                            ]
                          },
                          {
                            "type": "example",
                            "text": "Örnek zar durumları:\n\n“Zehre direniyorum.” → DAY\n“Darbe yedim ama ayakta kalmaya çalışıyorum.” → DAY\n“Kalkanıma çarpan devasa darbeyi taşıyorum.” → DAY + Bloklama\n“Saatlerdir çölde yürüyorum, devam edebilir miyim?” → DAY"
                          }
                        ]
                      },
                      {
                        "label": "İRADE (İRD)",
                        "blocks": [
                          {
                            "type": "paragraph",
                            "text": "İrade, karakterin zihinsel, ruhsal ve duygusal baskı altında kendi benliğini koruma kapasitesidir. Korkuya, panik etkisine, zihin manipülasyonuna, acımasız sorguya, büyüsel telkine, lanete, saplantıya, ayartmaya ve konsantrasyon bozucu etkilere karşı kullanılır.\n\nİRD yüksek olan karakter her şeyi bilmek zorunda değildir; fakat kendi zihninin direksiyonunu kolay bırakmaz. Korkunç bir varlığın huzurunda geri çekilmemek, zihinsel büyüye direnmek, işkence altında sır vermemek, karanlık enerjinin fısıltılarını bastırmak veya konsantrasyonunu korumak İRD alanına girer.\n\nİRD şunları yönetir:"
                          },
                          {
                            "type": "table",
                            "header": [
                              "ALAN",
                              "AÇIKLAMA"
                            ],
                            "rows": [
                              [
                                "Zihinsel direnç",
                                "Korku, panik, baskı, yıldırma"
                              ],
                              [
                                "Ruhsal savunma",
                                "Lanet, musallat, karanlık tesir"
                              ],
                              [
                                "Benlik koruma",
                                "Zihin kontrolü, telkin, efsun"
                              ],
                              [
                                "Konsantrasyon",
                                "Büyü veya süreli etkiyi sürdürme"
                              ],
                              [
                                "Kararlılık",
                                "Vazgeçmeme, baskı altında kararını koruma"
                              ],
                              [
                                "Acıya rağmen odak",
                                "Bedensel acının zihni dağıtmasını engelleme"
                              ]
                            ]
                          },
                          {
                            "type": "paragraph",
                            "text": "İRD şunları yapmaz:"
                          },
                          {
                            "type": "list",
                            "ordered": false,
                            "items": [
                              "Bilgi hatırlamayı veya akademik çözümlemeyi doğrudan belirlemez.",
                              "Çevresel detayı fark etmeyi belirlemez; bu çoğunlukla SZG veya ilgili beceridir.",
                              "Sosyal ikna gücü değildir; ikna hâlâ beceri, rol yapma ve bağlama bağlıdır."
                            ]
                          },
                          {
                            "type": "example",
                            "text": "Örnek zar durumları:\n\n“Beni korkutmaya çalışan varlığa direniyorum.” → İRD\n“Zihin kontrolüne karşı koyuyorum.” → İRD\n“Hasar aldım ama büyünün konsantrasyonunu koruyorum.” → İRD + Konsantrasyon\n“Karanlık bir yadigâr zihnime fısıldıyor, etkilenmemeye çalışıyorum.” → İRD"
                          }
                        ]
                      },
                      {
                        "label": "SEZGİ (SZG)",
                        "blocks": [
                          {
                            "type": "paragraph",
                            "text": "Sezgi, karakterin açık bilgiye, ham mantığa veya doğrudan gözleme dayanmadan örüntü, niyet, tehlike, yalan, aura, enerji izi ve durumun görünmeyen tarafını kavrama kapasitesidir. SZG, ZEK’in yerine geçen “akıllılık” niteliği değildir; İRF’in yerine geçen “mistik bilgelik” niteliği de değildir. Daha net biçimde: karakterin dünya ile arasında kurduğu içgüdüsel okuma yeteneğidir.\n\nSZG yüksek olan karakter, bir şeylerin yanlış olduğunu erken fark eder. Birinin yalan söylediğini kesin kanıtla değil davranış boşluğuyla hisseder. Bir odada görünürde hiçbir şey yokken mekânın “ölü” olduğunu anlar. Bir büyünün matematiğini bilmez ama enerjinin nerede yoğunlaştığını sezebilir. Bir haritadaki sembolü akademik olarak çözemeyebilir ama sembolün tehdit, çağrı veya uyarı taşıdığını anlayabilir.\n\nSZG şunları yönetir:"
                          },
                          {
                            "type": "table",
                            "header": [
                              "ALAN",
                              "AÇIKLAMA"
                            ],
                            "rows": [
                              [
                                "Tehlike Hissi",
                                "Pusu, tuzak, takip, yaklaşan tehdit"
                              ],
                              [
                                "Sosyal sezgi",
                                "Yalan, niyet, bastırılmış duygu, sahte tavır"
                              ],
                              [
                                "Örüntü kavrama",
                                "Bağlantı kurma, eksik parçayı hissetme"
                              ],
                              [
                                "Aura/Enerji Algısı",
                                "Enerji yoğunluğu, büyüsel iz, varlık hissi (Enerji yetkinliği ile bağlantılıdır)"
                              ],
                              [
                                "Pasif farkındalık",
                                "Aktif arama yapmadan tersliği sezme"
                              ]
                            ]
                          },
                          {
                            "type": "paragraph",
                            "text": "SZG şunları yapmaz:"
                          },
                          {
                            "type": "list",
                            "ordered": false,
                            "items": [
                              "Kitabi bilgi vermez. “Bu sembol hangi antik dile ait?” sorusu SZG değil, ilgili bilgi/araştırma becerisidir.",
                              "Kesin gelecek bilgisi vermez. Kehanet enerjisi veya özel yetenek olmadan SZG yalnızca his ve ipucu üretir.",
                              "İnsanları otomatik kandırmayı veya ikna etmeyi sağlamaz.",
                              "Her şeyi fark eden pasif radar değildir; GM sezgiyi ipucu, rahatsızlık, yönelim veya şüphe olarak vermelidir."
                            ]
                          },
                          {
                            "type": "example",
                            "text": "Örnek zar durumları:\n\n“Bu adamın yalan söyleyip söylemediğini anlamaya çalışıyorum.” → SZG + sosyal beceri / Farkındalık\n“Bu odada bir terslik var mı?” → SZG veya SZG + Farkındalık\n“Büyüsel bir iz hissedebilir miyim?” → SZG + ilgili enerji bilgisi\n“Hangi tünel daha tehlikeli geliyor?” → SZG\n“Bu yaratığın saldırmadan önceki niyetini okuyabilir miyim?” → SZG + Farkındalık"
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "id": "beceriler",
                "title": "BECERİLER",
                "mode": "rich",
                "blocks": [
                  {
                    "type": "heading",
                    "level": 2,
                    "text": "BECERİLER"
                  },
                  {
                    "type": "paragraph",
                    "text": "Niteliklere benzer olarak karakterlerin bazı özel durumlar için ihtiyaç duyacağı beceriler bulunmaktadır. Beceriler, niteliklere benzese de onlar kadar fazla durumda kullanılmayabilirler. Beceriler, **Temel Beceriler** ve **Özel Beceriler** olmak üzere ikiye ayrılır.\n\nTemel Beceriler, oyunun ortak eylem dilidir; Özel Beceriler ise karakterin bu ortak dili kendi geçmişi, eğitimi ve uzmanlığıyla büktüğü alanlardır."
                  },
                  {
                    "type": "heading",
                    "level": 3,
                    "text": "TEMEL BECERİLER"
                  },
                  {
                    "type": "paragraph",
                    "text": "Temel Beceriler, SLVNZ 4.0’ın varsayılan eylem alanlarıdır. Her karakter bu becerilerin bir kısmını teorik olarak kullanabilir; ancak eğitimli karakterler aynı eylemleri daha güvenilir, daha kontrollü ve daha az riskli yapar."
                  },
                  {
                    "type": "tabs",
                    "tabs": [
                      {
                        "label": "BLOK (SİLAH)",
                        "blocks": [
                          {
                            "type": "paragraph",
                            "text": "Bloklama / Kılıç, karakterin kılıç veya benzeri savunmaya uygun yakın dövüş silahlarıyla gelen saldırıyı kesme, saptırma, karşı hat oluşturma veya rakibin darbe açısını bozma becerisidir.\n\nBu beceri, saldırıyı “bedenle taşımaktan” çok teknikle yön değiştirme üzerine kuruludur. Bu yüzden kalkan bloklamasına göre daha çevik, daha riskli ve daha hassastır.\n\nKullanım alanları:"
                          },
                          {
                            "type": "table",
                            "header": [
                              "DURUM",
                              "AÇIKLAMA"
                            ],
                            "rows": [
                              [
                                "Silahla saldırı savuşturma",
                                "Gelen darbeyi silahla kesmek veya saptırmak"
                              ],
                              [
                                "Rakibin silah hattını bozma",
                                "Darbenin yönünü değiştirerek açık yaratmak"
                              ],
                              [
                                "Karşı hamle hazırlama",
                                "Başarılı bloktan sonra saldırı fırsatı üretme"
                              ]
                            ]
                          },
                          {
                            "type": "paragraph",
                            "text": "Sınırlar:"
                          },
                          {
                            "type": "list",
                            "ordered": false,
                            "items": [
                              "Çok ağır darbelerde kalkan kadar güvenli değildir.",
                              "Büyük yaratıkların ham kuvvet saldırılarına karşı risklidir.",
                              "Başarısızlıkta saldırı doğrudan karaktere geçebilir.",
                              "Silahın dayanıklılığı önemlidir; bloklama hamlesi silahı yıpratabilir veya kırabilir."
                            ]
                          }
                        ]
                      },
                      {
                        "label": "BLOK (KALKAN)",
                        "blocks": [
                          {
                            "type": "paragraph",
                            "text": "Bloklama / Kalkan, karakterin kalkan kullanarak gelen saldırıyı durdurma, emme, yönlendirme veya bedeninden uzak tutma becerisidir.\n\nKılıç bloklamasından farklı olarak kalkan bloklaması daha güvenli ama daha ağırdır. Kalkan, saldırıyı doğrudan yok etmez; darbeyi karakterin koluna, omzuna, duruşuna ve **soluk** kaynağına aktarır.\n\nKullanım alanları:"
                          },
                          {
                            "type": "table",
                            "header": [
                              "DURUM",
                              "AÇIKLAMA"
                            ],
                            "rows": [
                              [
                                "Fiziksel saldırıyı durdurma",
                                "Kılıç, balta, mızrak, ok, pençe vb."
                              ],
                              [
                                "Darbe emme",
                                "Saldırıyı karakter yerine kalkana bindirme"
                              ],
                              [
                                "Hat tutma",
                                "Dar geçitte, kapıda veya cephede savunma"
                              ],
                              [
                                "Müttefik koruma",
                                "Yanındaki veya arkasındaki hedefi kapatma"
                              ],
                              [
                                "Tam blok imkanları",
                                "Kapsamlı korunma olanağı"
                              ]
                            ]
                          },
                          {
                            "type": "paragraph",
                            "text": "Sınırlar:"
                          },
                          {
                            "type": "list",
                            "ordered": false,
                            "items": [
                              "Bloklanan her güçlü darbe soluk baskısı yaratabilir.",
                              "Yan, eşik ve kör alanlardan gelen saldırılara karşı pozisyon önemlidir.",
                              "Büyük kalkanlar hareketi ve kaçınmayı azaltır.",
                              "Kalkan kırılabilir, düşebilir veya karakterin gardını bozabilir."
                            ]
                          }
                        ]
                      },
                      {
                        "label": "KAÇINMA",
                        "blocks": [
                          {
                            "type": "paragraph",
                            "text": "Kaçınma, karakterin saldırıdan, çökmeden, patlamadan, düşen nesneden veya ani tehlikeden bedensel hareketle sıyrılma becerisidir.\n\nKaçınma, her zaman geriye zıplamak anlamına gelmez. Eğilmek, yana kaymak, yuvarlanmak, ağırlık merkezini değiştirmek, darbenin içinden çıkmak veya saldırının hedef noktasını bozmak da kaçınmadır.\n\nKullanım alanları:"
                          },
                          {
                            "type": "table",
                            "header": [
                              "DURUM",
                              "AÇIKLAMA"
                            ],
                            "rows": [
                              [
                                "Yakın saldırılardan sıyrılma",
                                "Kılıç, mızrak, pençe, yumruk vb."
                              ],
                              [
                                "Menzilli saldırıdan kaçma",
                                "Ok, taş, enerjisel mermi"
                              ],
                              [
                                "Alan etkisinden kaçınma veya sığınma tepkisi verme",
                                "Patlama, çökme, itme vb."
                              ]
                            ]
                          },
                          {
                            "type": "paragraph",
                            "text": "Sınırlar:"
                          },
                          {
                            "type": "list",
                            "ordered": false,
                            "items": [
                              "Görülmeyen veya sezilmeyen saldırıya karşı kullanımı sınırlıdır.",
                              "Dar alanda esnek şekilde kaçınmak zorlaşır.",
                              "Ağır zırh, yük veya çevresel engel eksiler doğurabilir."
                            ]
                          }
                        ]
                      },
                      {
                        "label": "ATICILIK",
                        "blocks": [
                          {
                            "type": "paragraph",
                            "text": "Atıcılık, karakterin elle fırlatılan silahları veya nesneleri hedefe yönlendirme becerisidir.\n\nCirit, bıçak, balta, taş, el sapanı, şişe, bomba benzeri fırlatılan nesneler bu beceri kapsamına girer. Atıcılık, nişancılık ve okçuluktan ayrıdır; çünkü burada bedenin savurma hareketi, ağırlık hissi ve mesafe sezgisi daha önemlidir."
                          }
                        ]
                      },
                      {
                        "label": "NİŞANCILIK",
                        "blocks": [
                          {
                            "type": "paragraph",
                            "text": "Nişancılık, mekanik veya nişan hattı kullanan menzilli silahları kullanma becerisidir.\n\nTatar yayı, musket, tabanca, tüfek, arbalet, mekanik fırlatıcılar veya nişangâhlı özel silahlar bu becerinin alanına girer. Nişancılık, okçuluktan farklı olarak bedensel çekiş gücünden ziyade hedefleme, sabitleme, nefes kontrolü ve zamanlama gerektirir."
                          }
                        ]
                      },
                      {
                        "label": "OKÇULUK",
                        "blocks": [
                          {
                            "type": "paragraph",
                            "text": "Okçuluk, yay ve ok kullanarak hedefe isabetli saldırı yapma becerisidir.\n\nOkçuluk, nişancılıktan ayrıdır çünkü karakterin bedeni silahın doğrudan parçasıdır. Yay çekişi, nefes, duruş, salım anı, mesafe sezgisi ve hedef takibi birlikte çalışır."
                          }
                        ]
                      },
                      {
                        "label": "İSABET",
                        "blocks": [
                          {
                            "type": "paragraph",
                            "text": "İsabet, karakterin hedefe yöneltilmiş hassas eylemlerinde kullandığı genel hedefleme becerisidir.\n\nBu beceri, özellikle silah kategorisine girmeyen veya özel hedefleme gerektiren durumlarda kullanılır. Enerjisel odak, asa, işaret ederek büyü yönlendirme, küçük hedefe dokunma, hassas hamle veya belirli bir noktayı vurma bu becerinin alanına girer."
                          }
                        ]
                      },
                      {
                        "label": "FARKINDALIK",
                        "blocks": [
                          {
                            "type": "paragraph",
                            "text": "Farkındalık, karakterin çevresindeki duyusal ve sezgisel detayları fark etme becerisidir.\n\nGörmek, duymak, koklamak, hareket algılamak, ortamda terslik hissetmek, takip edildiğini anlamak, gizlenen birini seçmek veya yaklaşan tehlikeyi fark etmek bu becerinin alanına girer.\n\nKullanım alanları:"
                          },
                          {
                            "type": "table",
                            "header": [
                              "DURUM",
                              "AÇIKLAMA"
                            ],
                            "rows": [
                              [
                                "Gizlenen varlığı fark etme",
                                "Gizliliğe karşı test"
                              ],
                              [
                                "Ses veya hareket algılama",
                                "Fısıltı, ayak sesi, kapı gıcırtısı vb."
                              ],
                              [
                                "Görsel detay seçme",
                                "Kalabalıkta kişi, yerde iz, duvarda çatlak vb."
                              ],
                              [
                                "Savaş alanı takibi",
                                "Eşik veya kör alandaki hareketi fark etme vb."
                              ]
                            ]
                          }
                        ]
                      },
                      {
                        "label": "GİZLİLİK",
                        "blocks": [
                          {
                            "type": "paragraph",
                            "text": "Gizlilik, karakterin görünmeden, duyulmadan, iz bırakmadan veya dikkat çekmeden hareket etme becerisidir.\n\nSadece sessiz yürümek değildir. Kalabalıkta sıradan görünmek, gölgede beklemek, zırh sesini bastırmak, izini saklamak, saklanacak doğru anı seçmek ve dikkat dağıtıcı unsurları kullanmak da Gizlilik kapsamındadır.\n\nKullanım alanları:"
                          },
                          {
                            "type": "table",
                            "header": [
                              "DURUM",
                              "AÇIKLAMA"
                            ],
                            "rows": [
                              [
                                "Sessiz hareket",
                                "Duyulmadan ilerleme"
                              ],
                              [
                                "Saklanma",
                                "Görüş hattından çekilme"
                              ],
                              [
                                "İz bırakmama",
                                "Takip edilmeyi zorlaştırma"
                              ],
                              [
                                "Kalabalığa karışma",
                                "Dikkat çekmeden hareket etme"
                              ],
                              [
                                "Pusu hazırlığı",
                                "Uygun konumda fark edilmeden bekleme"
                              ]
                            ]
                          }
                        ]
                      },
                      {
                        "label": "ARAŞTIRMA",
                        "blocks": [
                          {
                            "type": "paragraph",
                            "text": "Araştırma, karakterin aktif şekilde bilgi, ipucu, nesne, bağlantı veya anlam arama becerisidir.\n\nFarkındalıktan farkı şudur: Farkındalık pasif veya anlık algıdır; Araştırma bilinçli inceleme, kurcalama, karşılaştırma, soru sorma, belge okuma, izleri takip etme ve çıkarım yapma sürecidir.\n\nKullanım alanları:"
                          },
                          {
                            "type": "table",
                            "header": [
                              "DURUM",
                              "AÇIKLAMA"
                            ],
                            "rows": [
                              [
                                "Oda inceleme",
                                "Çekmece, duvar, zemin, gizli bölme arama vb."
                              ],
                              [
                                "Belge tarama",
                                "Kayıt, mektup, mühür, arşiv"
                              ],
                              [
                                "İpucu bulma",
                                "Suç mahalli, kamp alanı, savaş sonrası vb."
                              ]
                            ]
                          }
                        ]
                      },
                      {
                        "label": "İZCİLİK",
                        "blocks": [
                          {
                            "type": "paragraph",
                            "text": "İzcilik, karakterin doğada yön bulma, iz sürme, kamp kurma, çevre okuma ve hayatta kalma becerisidir.\n\nBu beceri yalnızca “orman bilgisi” değildir. Çöl, dağ, bataklık, tundra, mağara, harabe çevresi ve sınır bölgelerinde hayatta kalma yöntemlerini kapsar.\n\nAncak izcilik, karakterin bu bölgelerin hepsinde hayatta kalma ve yön bulma yöntemlerini içermez. Bir karakter, hangi biyomlarda yetkinse, bu biyomlara yönelik özel izcilik bilgilerine sahiptir.\n\nKullanım alanları:"
                          },
                          {
                            "type": "table",
                            "header": [
                              "DURUM",
                              "AÇIKLAMA"
                            ],
                            "rows": [
                              [
                                "İz sürme",
                                "Ayak izi, kırık dal, kamp kalıntısı"
                              ],
                              [
                                "Yön bulma",
                                "Haritasız veya kötü görüşte ilerleme"
                              ],
                              [
                                "Kamp kurma",
                                "Güvenli dinlenme alanı seçme"
                              ],
                              [
                                "Biyom okuma",
                                "Hava, zemin, hayvan hareketleri vb."
                              ],
                              [
                                "Tehlike tanıma",
                                "Yırtıcı, bataklık, zehirli bitki vb."
                              ],
                              [
                                "Temel doğa üretimi",
                                "Ateş yakma, düğüm, barınak, su bulma vb."
                              ]
                            ]
                          }
                        ]
                      },
                      {
                        "label": "PERFORMANS",
                        "blocks": [
                          {
                            "type": "paragraph",
                            "text": "Performans, karakterin bedenini, sesini, tavrını, sahne hâkimiyetini veya sosyal varlığını etkileyici biçimde kullanma becerisidir.\n\nBu beceri yalnızca sanat yapmak değildir. Kalabalığı etkilemek, dikkat çekmek, rol kesmek, yalanı daha inandırıcı sunmak, bir ritüeli görkemli icra etmek veya sosyal baskı kurmak da Performans kapsamına girebilir."
                          }
                        ]
                      },
                      {
                        "label": "SAĞALTIM",
                        "blocks": [
                          {
                            "type": "paragraph",
                            "text": "Sağaltım, karakterin yara, hastalık, kanama, kırık, zehir, enfeksiyon ve bedensel bozulmalara müdahale etme becerisidir.\n\nBu beceri hem savaş sonrası ilk yardım hem de uzun süreli bakım için kullanılır. Cerrahi, dikiş, bandaj, zehir temizleme, hastalık teşhisi ve bitkisel/ilaçsal müdahaleler Sağaltım kapsamına girebilir."
                          }
                        ]
                      },
                      {
                        "label": "TERBİYE",
                        "blocks": [
                          {
                            "type": "paragraph",
                            "text": "Terbiye, karakterin hayvanları, binekleri veya yarı-vahşi canlıları sakinleştirme, yönlendirme, eğitme ve onlarla güven ilişkisi kurma becerisidir.\n\nTerbiye, hayvan üzerinde mutlak kontrol sağlamaz. Canlının doğası, korkusu, açlığı, eğitimi, türü ve karakterle ilişkisi sonucu belirler."
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "type": "heading",
                    "level": 3,
                    "text": "ÖZEL BECERİLER"
                  },
                  {
                    "type": "paragraph",
                    "text": "Özel beceriler, temel becerilerin dışında kalan ve karakterin kendisini geliştirmek istediği herhangi bir beceriyi içerir. Bu beceriler tamamen oyuncunun yaratıcılığına ve karakterini kişiselleştirme kapsamında nasıl ilerletmek istediğine bağlıdır. Özel becerilere şu şekilde bazı örnekler verilebilir:"
                  },
                  {
                    "type": "list",
                    "ordered": false,
                    "items": [
                      "**Aşçılık:** Bir karakterin yemek yapma konusundaki ustalığını belirler.",
                      "**Simyacılık:** Bir karakterin simya malzemeleri hakkında bilgisini ve bu malzemeleri kullanarak iksir oluşturabilme becerisini belirler.",
                      "**Yüzücülük:** Bir karakterin suda yüzme becerisini belirler."
                    ]
                  }
                ]
              },
              {
                "id": "enerjiler",
                "title": "ENERJİLER VE ENERJİ KAYNAKLARI",
                "body": "",
                "mode": "rich",
                "blocks": [
                  {
                    "type": "heading",
                    "level": 2,
                    "text": "BÜYÜNÜN TEMEL MANTIĞI"
                  },
                  {
                    "type": "paragraph",
                    "text": "SLVNZ 4.0’da büyü, doğrudan “ateş atmak” veya “mana harcamak” değildir. Bir büyünün oluşması için dört ayrı katman bir araya gelir:"
                  },
                  {
                    "type": "table",
                    "header": [
                      "KATMAN",
                      "İŞLEV"
                    ],
                    "rows": [
                      [
                        "Kaynak",
                        "Büyünün bedelini ve yakıtını sağlar"
                      ],
                      [
                        "Kanal",
                        "Kaynağın kullanıcıdan veya çevreden büyüye aktarılmasını sağlar"
                      ],
                      [
                        "Enerji",
                        "Büyünün temel işlevini belirler"
                      ],
                      [
                        "Element",
                        "Büyünün dünyada hangi biçimde görüneceğini belirler"
                      ]
                    ]
                  },
                  {
                    "type": "example",
                    "text": "Bir karakter düşmana alevli bir mızrak fırlatıyorsa, büyünün elementi Ateş, enerjisi büyük ihtimalle Yıkım, kaynağı Mana, kanalı ise asa, kalıntı, ritüel, içsel yetenek veya dışsal bir odak olabilir."
                  },
                  {
                    "type": "paragraph",
                    "text": "Bu ayrım oldukça önemlidir. Çünkü aynı element, farklı enerjilerle tamamen farklı büyülere dönüşebilir."
                  },
                  {
                    "type": "table",
                    "header": [
                      "BÜYÜ",
                      "ELEMENT",
                      "ENERJİ",
                      "SONUÇ"
                    ],
                    "rows": [
                      [
                        "Ateş Oku",
                        "Ateş",
                        "Yıkım",
                        "Hasar verir"
                      ],
                      [
                        "Ateş Duvarı",
                        "Ateş",
                        "Koruma",
                        "Alanı kapatır"
                      ],
                      [
                        "Ateş Sureti",
                        "Ateş",
                        "İllüzyon",
                        "Görsel yanılsama oluşturur"
                      ],
                      [
                        "Ateşten Elementali",
                        "Ateş",
                        "Oluşturma",
                        "Geçici varlık/şekil oluşturur"
                      ],
                      [
                        "Ateşi Söndürme",
                        "Ateş",
                        "Dönüştürme",
                        "Var olan ateşi dağıtır"
                      ]
                    ]
                  },
                  {
                    "type": "heading",
                    "level": 2,
                    "text": "ELEMENTLER"
                  },
                  {
                    "type": "paragraph",
                    "text": "Elementler, büyünün dünyada hangi doğal veya maddesel biçimde açığa çıktığını gösterir. Element, büyünün “ne yaptığı” değil, “nasıl göründüğü / hangi doğa kuvvetiyle tezahür ettiği” sorusunun cevabıdır."
                  },
                  {
                    "type": "tabs",
                    "tabs": [
                      {
                        "label": "ATEŞ",
                        "blocks": [
                          {
                            "type": "paragraph",
                            "text": "Ateş, ısı, yanma, köz, alev, patlama, kavurma ve tüketimle ilişkili elementtir.\n\nAteş elementi hızlı, saldırgan ve görünürdür. Gizlenmesi zordur, çevreye yayılma riski taşır ve kontrolsüz kullanıldığında büyünün hedefinden fazlasını etkileyebilir."
                          }
                        ]
                      },
                      {
                        "label": "SU",
                        "blocks": [
                          {
                            "type": "paragraph",
                            "text": "Su, akış, soğutma, basınç, arındırma, sis, buz, sıvı hareketi ve yaşam ortamlarıyla ilişkili elementtir.\n\nSu elementi doğrudan hasardan çok kontrol, yönlendirme, boğma, temizleme, soğutma ve form değiştirme alanında güçlüdür."
                          }
                        ]
                      },
                      {
                        "label": "TOPRAK",
                        "blocks": [
                          {
                            "type": "paragraph",
                            "text": "Toprak, taş, kum, metal cevheri, kil, kristal, maden, ağırlık, yapı ve sabitlikle ilişkili elementtir.\n\nToprak elementi yavaş ama güvenilirdir. Savunma, engel, yapı, sıkıştırma, alan kontrolü ve fiziksel biçimlendirme için uygundur."
                          }
                        ]
                      },
                      {
                        "label": "HAVA",
                        "blocks": [
                          {
                            "type": "paragraph",
                            "text": "Hava, rüzgâr, basınç, ses, nefes, uçuş, itme, savurma ve görünmez hareketle ilişkili elementtir.\n\nHava elementi hızlı, esnek ve taktiksel bir elementtir. Doğrudan hasardan çok hareket, konum, denge bozma, ses taşıma ve alan dağıtma üzerinde etkilidir."
                          }
                        ]
                      },
                      {
                        "label": "YILDIRIM",
                        "blocks": [
                          {
                            "type": "paragraph",
                            "text": "Yıldırım, elektrik, ani boşalma, sinirsel şok, manyetik tepki, iletkenlik ve hızlı enerji patlamasıyla ilişkili elementtir.\n\nYıldırım elementi yüksek riskli ve yüksek etkili bir elementtir. Ani hasar, sersemletme, refleks bozma ve iletken hatlardan yayılma potansiyeli taşır."
                          }
                        ]
                      },
                      {
                        "label": "IŞIK",
                        "blocks": [
                          {
                            "type": "paragraph",
                            "text": "Işık, görünürlük, parlama, yansıma, gölge bastırma, renk, sıcaklık, aydınlatma ve algı yönlendirme ile ilişkili elementtir.\n\nIşık elementi burada Aydınlık Enerjisi ile karıştırılmamalıdır. Işık bir elementtir; Aydınlık ise yasak/üst düzey bir enerjidir. Işık elementi sıradan büyülerde kullanılabilir. Aydınlık enerjisi ise varoluşsal ve kutsal düzeyde tehlikeli bir güçtür."
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "type": "heading",
                    "level": 2,
                    "text": "TEMEL ENERJİLER"
                  },
                  {
                    "type": "paragraph",
                    "text": "Temel Enerjiler, büyünün işlevsel omurgasıdır. Bunlar büyünün dünyada ne yaptığına karar verir."
                  },
                  {
                    "type": "tabs",
                    "tabs": [
                      {
                        "label": "YIKIM",
                        "blocks": [
                          {
                            "type": "paragraph",
                            "text": "Yıkım, var olan yapıyı bozma, parçalama, yakma, kırma, kesme, patlatma, zayıflatma veya doğrudan hasar verme enerjisidir.\n\nYıkım enerjisi en anlaşılır ama en riskli temel enerjilerden biridir. Çünkü etkisi genellikle dışa taşar. Basit bir ateş kıvılcımı bile yanlış kullanılırsa yangına, taş patlaması çökmeye, yıldırım saldırısı zincirleme sekmeye dönüşebilir."
                          }
                        ]
                      },
                      {
                        "label": "KORUMA",
                        "blocks": [
                          {
                            "type": "paragraph",
                            "text": "Koruma, bir varlığı, alanı, nesneyi veya sınırı dış etkilerden muhafaza etme enerjisidir.\n\nKoruma yalnızca “kalkan basmak” değildir. Bir şeyi saklamak, bastırmak, ayırmak, zararı dağıtmak, saldırının şiddetini azaltmak veya belirli bir sınır çizmek de Koruma kapsamına girer."
                          }
                        ]
                      },
                      {
                        "label": "OLUŞTURMA",
                        "blocks": [
                          {
                            "type": "paragraph",
                            "text": "Oluşturma, enerjiyi geçici veya yarı-kalıcı biçime sokarak madde, şekil, araç, varlık benzeri form veya çevresel etki meydana getirme enerjisidir.\n\nOluşturma, yoktan mutlak madde yaratmak değildir. SLVNZ 4.0’da özellikle Büyük Savaş sonrası dönemde Oluşturma daha sınırlı ve bedellidir. Çoğu oluşturma etkisi geçici, kırılgan, kaynak bağımlı veya çevredeki malzemeyi kullanarak çalışır."
                          }
                        ]
                      },
                      {
                        "label": "DÖNÜŞTÜRME",
                        "blocks": [
                          {
                            "type": "paragraph",
                            "text": "Dönüştürme, var olan bir şeyin formunu, halini, yoğunluğunu, yüzeyini, hareketini veya niteliğini değiştirme enerjisidir.\n\nDönüştürme, Oluşturma’dan ayrıdır. Oluşturma yeni bir biçim meydana getirir; Dönüştürme mevcut bir varlığı veya maddeyi başka bir duruma sokar."
                          }
                        ]
                      },
                      {
                        "label": "EFSUN",
                        "blocks": [
                          {
                            "type": "paragraph",
                            "text": "Efsun, zihin, duygu, arzu, korku, yönelim ve karar süreçleri üzerinde etki kuran enerjidir.\n\nEfsun mutlak zihin kontrolü değildir. En sağlıklı kullanım biçimi; duygu eğilimi yaratma, dikkati başka yöne çekme, korkuyu büyütme, güven hissi verme, öfkeyi kışkırtma, anlık tereddüt yaratma veya bir düşünceyi daha cazip hale getirme şeklindedir. Ancak üst seviyelerde varlıkları süreli kontrol eğilimine kadar gidebilmektedir."
                          }
                        ]
                      },
                      {
                        "label": "İLLÜZYON",
                        "blocks": [
                          {
                            "type": "paragraph",
                            "text": "İllüzyon, duyulara yönelik yanılsama, görüntü, ses, koku, hareket, parıltı, gölge veya enerjisel sahte iz oluşturma enerjisidir.\n\nİllüzyon, gerçekliği değiştirmez; algıyı değiştirir. Bu yüzden İllüzyon ile oluşturulan bir köprü üstünden yürünemez, ama hedef köprünün var olduğuna inandırılabilir. Fiziksel temas, dikkatli inceleme veya güçlü sezgi illüzyonu bozabilir."
                          }
                        ]
                      },
                      {
                        "label": "KEHANET",
                        "blocks": [
                          {
                            "type": "paragraph",
                            "text": "Kehanet, iz, olasılık, geçmiş yankısı, yön, gizli bağ, enerji izi ve muhtemel sonuçları sezme enerjisidir.\n\nKehanet kesin gelecek bilgisi vermemektedir. SLVNZ 4.0 için Kehanet’in en iyi kullanımı “bilgiye doğrudan sahip olmak” değil, eksik bilgiyi yön, sembol, rüya, titreşim veya olasılık olarak almaktır."
                          }
                        ]
                      },
                      {
                        "label": "ÇÜRÜME",
                        "blocks": [
                          {
                            "type": "paragraph",
                            "text": "Çürüme, canlı, ölü, ruhsal, bedensel veya maddesel bütünlüğün bozulmasıyla ilişkili enerjidir.\n\nÇürüme yalnızca nekromansi değildir. Paslanma, hastalık, çürüme, bedensel zayıflama, ruhsal yıpranma, ölü dokuyla etkileşim, canlılık bozumu ve eski kalıntıları uyandırma gibi alanları kapsar."
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "type": "heading",
                    "level": 2,
                    "text": "ÖZEL ENERJİLER"
                  },
                  {
                    "type": "paragraph",
                    "text": "Özel Enerjiler, doğanın sıradan mana düzeniyle kolayca yönlendirilemeyen, ilişki, anlaşma, inanç, kozmik dengesizlik veya üst varlık teması gerektiren enerji türleridir.\n\nBunlar yasak değildir; fakat herkesin erişebileceği genel büyücülük alanının dışında kalırlar."
                  },
                  {
                    "type": "tabs",
                    "tabs": [
                      {
                        "label": "İNANÇ",
                        "blocks": [
                          {
                            "type": "paragraph",
                            "text": "İnanç, bir Kadim, kutsal ilke, yemin, tarikat, ocak veya manevi bağ üzerinden yönlendirilen enerjidir.\n\nİnanç enerjisi kullanıcının yalnızca teknik bilgisine bağlı değildir. Bağın gücü, sadakat, ritüel düzen, yemin ihlali, Kadim’in tavrı ve karakterin manevi konumu bu enerjiyi etkiler."
                          }
                        ]
                      },
                      {
                        "label": "PAKT",
                        "blocks": [
                          {
                            "type": "paragraph",
                            "text": "Pakt, bir patron, üstün varlık, kadim dışı güç, iblisvari figür, eski varlık, ejderha, gölge varlık veya bilinmeyen entiteyle yapılan anlaşmadan doğan enerjidir.\n\nPakt enerjisi öğrenilmiş bir teknikten çok, ilişkiye ve borca dayanır. Kullanıcı enerjiye sahip değildir; enerjiye erişim hakkı kazanmıştır."
                          }
                        ]
                      },
                      {
                        "label": "KAOS",
                        "blocks": [
                          {
                            "type": "paragraph",
                            "text": "Kaos, denge dışına taşmış, düzenlenmemiş, ihtimal yüklü ve sonuçları tam öngörülemeyen enerjidir.\n\nKaos enerjisi en güçlü özgürlük alanlarından biridir; fakat kontrol edildiğinde bile tamamen itaat etmez. Kullanıcı istediği etkinin yönünü belirleyebilir, ama etkinin nasıl açığa çıkacağı değişebilir."
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "type": "heading",
                    "level": 2,
                    "text": "YASAK ENERJİLER"
                  },
                  {
                    "type": "paragraph",
                    "text": "Yasak Enerjiler, varlığı bilinen fakat büyüyü öğreten gelenekler tarafından kullanılmaması öğütlenen enerji türleridir.\n\nBu yasak yalnızca ahlaki değildir; pratik ve varoluşsaldır. Bu enerjiler kullanıcının bedenini, ruhunu, çevresini, yaşam alanını veya kozmik düzenle ilişkisini bozabilir."
                  },
                  {
                    "type": "tabs",
                    "tabs": [
                      {
                        "label": "KAN",
                        "blocks": [
                          {
                            "type": "paragraph",
                            "text": "Kan, canlı bedenin taşıdığı soy, hafıza, bedensel bağ, hastalık, ritim ve yaşam izleriyle ilişkili yasak enerjidir.\n\nKan enerjisi yalnızca kanı hareket ettirmek değildir. Kan üzerinden soy bağına, bedensel zayıflığa, hastalığa, ritüel mülkiyete, yeminlere ve bedensel kontrol alanlarına uzanabilir."
                          }
                        ]
                      },
                      {
                        "label": "AYDINLIK",
                        "blocks": [
                          {
                            "type": "paragraph",
                            "text": "Aydınlık, Işık elementinden farklıdır. Işık görünen, fiziksel veya algısal bir elementtir. Aydınlık, varoluşsal düzeyde arındırma, açığa çıkarma, hüküm verme, kutsal yakıcılık ve karanlığı reddetme enerjisidir.\n\nAydınlık, güvenli değildir. Kullanıcıya zarar vermiyor gibi görünse bile çevresindeki karanlık, çürüme, gizli bağ, gölge varlık ve mühürleri kışkırtabilir. Ayrıca Aydınlık, sıradan canlıların taşıyamayacağı kadar mutlak bir yönelim taşıyabilir."
                          }
                        ]
                      },
                      {
                        "label": "KARANLIK",
                        "blocks": [
                          {
                            "type": "paragraph",
                            "text": "Karanlık, ışığın yokluğu değildir. Enerjinin doğasını bozan, yaşamı tüketen, varoluşu içe çökerten, canlı çevreyi kurutan ve büyünün sınırlarını kirleten yasak enerjidir.\n\nKaranlık enerjisi özellikle cadı, kara ritüel, bozulmuş kalıntı, savaş sonrası yarıklar ve yasak dillerle ilişkili olabilir."
                          }
                        ]
                      },
                      {
                        "label": "RUH",
                        "blocks": [
                          {
                            "type": "paragraph",
                            "text": "Ruh Enerjisi, ölüler, hayaletler, benlik izleri, hatıra yankıları, musallatlar, ruhsal bağlar ve varlığın maddi beden dışındaki özüyle ilişkili yasak enerjidir.\n\nRuh enerjisi ile çalışmak, yalnızca ölülerle konuşmak değildir. Bir varlığın benliğine, hatırasına, ölüm sonrası izine veya ruhsal bütünlüğüne temas etmektir."
                          }
                        ]
                      },
                      {
                        "label": "YAŞAM",
                        "blocks": [
                          {
                            "type": "paragraph",
                            "text": "Yaşam Enerjisi, canlılığın büyüme, çoğalma, yenilenme, taşma, mutasyon ve varoluş gücüyle ilişkili yasak enerjidir.\n\nİlk bakışta iyileştirici gibi görünür; fakat SLVNZ 4.0’da Yaşam enerjisinin asıl tehlikesi eksikliği kadar fazlalığının da yıkıcı olmasıdır. Yaşam, kontrolsüz kaldığında iyileştirmez; sarar, büyütür, çoğaltır, ele geçirir."
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "type": "heading",
                    "level": 2,
                    "text": "ENERJİSEL KAYNAKLAR"
                  },
                  {
                    "type": "paragraph",
                    "text": "Enerjisel Kaynaklar, büyünün çalışması için harcanan yakıttır. Enerji büyünün türünü, kaynak ise büyünün bedelini belirler."
                  },
                  {
                    "type": "table",
                    "header": [
                      "KAYNAK",
                      "GÜVENLİK",
                      "YENİLENME",
                      "ANA RİSK"
                    ],
                    "rows": [
                      [
                        "Mana",
                        "En güvenli",
                        "Çevreden/kalıntıdan/kanaldan",
                        "Vahşi tepki"
                      ],
                      [
                        "Ki",
                        "Görece güvenli ama sınırlı",
                        "Dinlenme, meditasyon",
                        "Beden-ruh yorgunluğu"
                      ],
                      [
                        "Ruh",
                        "Çok riskli",
                        "Çok yavaş veya dış ruh kaynağıyla",
                        "Ruhsal çöküş"
                      ],
                      [
                        "Yaşam",
                        "En tehlikeli",
                        "Doğal varoluşsal dengeye bağlı",
                        "Eksiklik/fazlalık felaketi"
                      ]
                    ]
                  },
                  {
                    "type": "tabs",
                    "tabs": [
                      {
                        "label": "MANA",
                        "blocks": [
                          {
                            "type": "paragraph",
                            "text": "Mana, evrende vahşi biçimde akan temel büyüsel yakıttır.\n\nBüyük Savaş öncesinde mana daha erişilebilirken, 4.0 döneminde sıradan canlıların manayı doğrudan bedenlerinde kanalize etmesi çok daha zordur. Mana artık çoğunlukla dış kanallar, kalıntılar, eski büyü döneminden kalmış nesneler, özel bölgeler, nadir doğuştan yetenekliler veya kanal kurabilen kişiler aracılığıyla kullanılabilir.\n\nMana'nın güçlü yönleri:"
                          },
                          {
                            "type": "list",
                            "ordered": false,
                            "items": [
                              "En yaygın ve en güvenli kaynaktır.",
                              "Temel enerjilerle en uyumlu kaynaktır.",
                              "Eğitimli kullanıcı için kontrol edilebilir.",
                              "Büyü üretimi ve standart büyücülük için ana yakıttır."
                            ]
                          },
                          {
                            "type": "paragraph",
                            "text": "Riskleri:"
                          },
                          {
                            "type": "list",
                            "ordered": false,
                            "items": [
                              "Vahşi ve dizginsizdir.",
                              "Dış kanal aracılığıyla kullanıldığında beklenmeyen tepki verebilir.",
                              "Aynı sahnede ardışık ve yoğun kullanımda taşma riski artar.",
                              "Kalıntı veya bozuk odak üzerinden kullanılırsa büyü sapabilir."
                            ]
                          },
                          {
                            "type": "table",
                            "header": [
                              "KULLANIM DURUMU",
                              "MANA TEPKİ RİSKİ"
                            ],
                            "rows": [
                              [
                                "Basit büyü",
                                "Düşük"
                              ],
                              [
                                "Aynı enerjiyle ardışık kullanım",
                                "Orta"
                              ],
                              [
                                "Yüksek kaynak harcaması",
                                "Orta/Yüksek"
                              ],
                              [
                                "Bozuk kalıntı veya odak",
                                "Yüksek"
                              ],
                              [
                                "Yasak enerjiyle birlikte mana kullanımı",
                                "Çok Yüksek"
                              ]
                            ]
                          }
                        ]
                      },
                      {
                        "label": "Kİ",
                        "blocks": [
                          {
                            "type": "paragraph",
                            "text": "Ki, varlığın beden-ruh disipliniyle açığa çıkardığı içsel enerji kaynağıdır.\n\nMana gibi vahşi değildir; fakat erişimi çok daha zordur. Ki, doğuştan sahip olunan bir havuzdan ziyade disiplin, meditasyon, nefes, çakra yönlendirme, dövüş talimi ve uzun süreli bedensel farkındalıkla kullanılabilir hale gelir.\n\nKi’nin güçlü yönleri:"
                          },
                          {
                            "type": "list",
                            "ordered": false,
                            "items": [
                              "Dış mana kanalına ihtiyaç duymaz.",
                              "Daha kontrollüdür.",
                              "Savaş sanatlarıyla çok iyi birleşir.",
                              "Sessiz, sade ve düşük görünürlüklü etkiler için uygundur.",
                              "Kullanıcının beden tekniğiyle doğrudan ilişkilidir."
                            ]
                          },
                          {
                            "type": "paragraph",
                            "text": "Sınırları:"
                          },
                          {
                            "type": "list",
                            "ordered": false,
                            "items": [
                              "Miktarı azdır.",
                              "Geliştirmesi zordur.",
                              "Patlayıcı büyük büyüler için uygun değildir.",
                              "Tükendiğinde karakter bedensel ve ruhsal yorgunluğa girer."
                            ]
                          },
                          {
                            "type": "paragraph",
                            "text": "Ki Tükenme Sonuçları:"
                          },
                          {
                            "type": "table",
                            "header": [
                              "SEVİYE",
                              "SONUÇ"
                            ],
                            "rows": [
                              [
                                "Azalma",
                                "Halsizlik, refleks düşüşü"
                              ],
                              [
                                "Kritik Azalma",
                                "Titreme, nefes bozulması, odak kaybı"
                              ],
                              [
                                "Tükenme",
                                "Bayılma, ruhsal boşalma, ağır yorgunluk"
                              ],
                              [
                                "Aşırı zorlama",
                                "Kalıcı hasar veya ölüm riski"
                              ]
                            ]
                          }
                        ]
                      },
                      {
                        "label": "RUH",
                        "blocks": [
                          {
                            "type": "paragraph",
                            "text": "Ruh Kaynağı, varlığın benlik özü, ruhsal bütünlüğü ve maddi bedenin ötesindeki varoluş bağından harcanan kaynaktır.\n\nKi’den daha derindir ve daha tehlikelidir. Ki dinlenme ve meditasyonla toparlanabilirken, Ruh kaynağı hızlı yenilenmez. Ruh kullanımı uzun süreli bekleme, özel ritüeller, dış ruh kaynağı veya çok nadir manevi onarım gerektirir.\n\nRuh kaynağının güçlü yönleri:"
                          },
                          {
                            "type": "list",
                            "ordered": false,
                            "items": [
                              "Ruhsal varlıklar, musallatlar, ölüler ve benlik izleri üzerinde etkilidir.",
                              "Mana çalışmadığında bile bazı eşiklerde iş görebilir.",
                              "Çok derin ve kalıcı etkiler yaratabilir.",
                              "Beden dışı varlıklarla temas kurabilir."
                            ]
                          },
                          {
                            "type": "paragraph",
                            "text": "Riskleri:"
                          },
                          {
                            "type": "list",
                            "ordered": false,
                            "items": [
                              "Kullanıcının özünü eksiltir.",
                              "Ruh seviyesi düştükçe karakter yorulur, donuklaşır, çöker.",
                              "Aşırı kullanım karakterin benliğinde çatlak yaratabilir.",
                              "Tükenirse geride boş beden kalabilir."
                            ]
                          },
                          {
                            "type": "paragraph",
                            "text": "Ruh Kaynağı Kullanım Tablosu:"
                          },
                          {
                            "type": "table",
                            "header": [
                              "DURUM",
                              "SONUÇ"
                            ],
                            "rows": [
                              [
                                "Hafif kullanım",
                                "Ruhsal yorgunluk, soğuma, huzursuzluk"
                              ],
                              [
                                "Orta kullanım",
                                "Duygu silikleşmesi, anı bulanıklığı"
                              ],
                              [
                                "Ağır kullanım",
                                "Benlik çatlağı, musallatlara açıklık"
                              ],
                              [
                                "Kritik kullanım",
                                "Ruh kopması, bedenin boşalması"
                              ],
                              [
                                "Tükenme",
                                "Ölüm"
                              ]
                            ]
                          }
                        ]
                      },
                      {
                        "label": "YAŞAM",
                        "blocks": [
                          {
                            "type": "paragraph",
                            "text": "Yaşam Kaynağı, varlığın doğrudan varoluşsal canlılık gücüdür.\n\nBu kaynak en tehlikeli kaynaktır. Çünkü hem eksikliği hem fazlalığı ölümcül olabilir. Mana taşabilir, Ki tükenebilir, Ruh aşınabilir; fakat Yaşam kaynağı doğrudan “varlığın var olma dengesi” ile ilgilidir.\n\nYaşam kaynağının güçlü yönleri:"
                          },
                          {
                            "type": "list",
                            "ordered": false,
                            "items": [
                              "Çok güçlü iyileştirme, büyütme ve canlılık etkileri yaratabilir.",
                              "Ölüm eşiğindeki varlıklara müdahale edebilir.",
                              "Bitki, et, kemik, organik madde ve canlı formlar üzerinde olağanüstü etkilidir.",
                              "Bazı yasak ritüellerde başka kaynakların yerine geçebilir."
                            ]
                          },
                          {
                            "type": "paragraph",
                            "text": "Riskleri:"
                          },
                          {
                            "type": "list",
                            "ordered": false,
                            "items": [
                              "Azalırsa varlık çöker.",
                              "Fazlalaşırsa varlık kontrolsüz biçimde sarılır.",
                              "Canlı formlara tutunup yayılabilir.",
                              "Bilinci bastırabilir.",
                              "Bedeni mutasyona, aşırı büyümeye veya varlık kaymasına sürükleyebilir."
                            ]
                          },
                          {
                            "type": "paragraph",
                            "text": "Yaşam Kaynağı Dengesizliği:"
                          },
                          {
                            "type": "table",
                            "header": [
                              "DURUM",
                              "SONUÇ"
                            ],
                            "rows": [
                              [
                                "Hafif eksilme",
                                "Solgunluk, halsizlik, iyileşme yavaşlığı"
                              ],
                              [
                                "Orta eksilme",
                                "Organik zayıflama, bilinç bulanıklığı"
                              ],
                              [
                                "Ağır eksilme",
                                "Yaşamsal çöküş, ölüm riski"
                              ],
                              [
                                "Hafif fazlalık",
                                "Aşırı canlılık, ateş, büyüme sancısı"
                              ],
                              [
                                "Orta fazlalık",
                                "Doku taşması, bitkisel/organik yayılma ve yoğun acı/ağrı"
                              ],
                              [
                                "Yarıya yaklaşan sarılma",
                                "Bilinç kaybı, kontrolden çıkma"
                              ],
                              [
                                "Tam sarılma",
                                "Varlık dönüşümü veya kaybı"
                              ]
                            ]
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "type": "heading",
                    "level": 2,
                    "text": "KANALLAR"
                  },
                  {
                    "type": "paragraph",
                    "text": "4.0’da kaynak tek başına büyüye dönüşmez. Kaynağın büyüye aktarılması için bir **kanal** gerekir."
                  },
                  {
                    "type": "table",
                    "header": [
                      "KANAL",
                      "AÇIKLAMA"
                    ],
                    "rows": [
                      [
                        "Odaklayıcı",
                        "Asa, tılsım, kristal, mühür, yüzük"
                      ],
                      [
                        "Kalıntı",
                        "Büyük savaş öncesinden kalmış enerjisel nesne"
                      ],
                      [
                        "Ritüel",
                        "Söz, hareket, malzeme ve zamanla kurulan geçici kanal"
                      ],
                      [
                        "İçsel kanal",
                        "Nadir doğuştan yetenek, Sahir/Sahire benzeri yapı"
                      ],
                      [
                        "Dışsal kanal kurucu",
                        "Kanal açabilen kişi, varlık veya eşya"
                      ],
                      [
                        "Mekân kanalı",
                        "Eski enerjisel bölgeler, enerjisel tesir noktaları, kadim izler"
                      ],
                      [
                        "İlişki kanalı",
                        "Pakt veya inanç gibi ilişki temelli erişim"
                      ]
                    ]
                  }
                ]
              },
              {
                "id": "yetenekler",
                "title": "YETENEKLER",
                "mode": "rich",
                "blocks": [
                  {
                    "type": "heading",
                    "level": 2,
                    "text": "YETENEKLER"
                  },
                  {
                    "type": "paragraph",
                    "text": "Karakterlerin nitelikleri, becerileri ve enerjilerinin yanı sıra bunları da dâhil ederek kullanabileceği yetenekleri bulunmaktadır. Bu yetenekler oyuncunun karakterinin yürümesini istediği yola göre şekillenmektedir. Karakter yetenekleri, fiziksel ve enerjisel olmak üzere iki ayrı dalda oluşmaktadır."
                  },
                  {
                    "type": "paragraph",
                    "text": "Fiziksel yetenekler, kaynak olarak karakterde SOLUK tüketirken, enerjisel yetenekler MANA, RUH, Kİ ve YAŞAM enerjisi tüketebilirler. Ancak, bazı fiziksel yeteneklerin de enerjisel kaynaklar tüketmesi mümkün olabilir."
                  },
                  {
                    "type": "tabs",
                    "tabs": [
                      {
                        "label": "FİZİKSEL YETENEKLER",
                        "blocks": [
                          {
                            "type": "paragraph",
                            "text": "Fiziksel yetenekler, çoğunlukla yakın dövüş konusunda ustalaşan ya da menzilli araçlar kullanan karakterlerin ihtiyaç duyduğu yeteneklerdir. Genellikle kas gücü gerektirdiği için karakterlerin SOLUK değerlerini tüketen fiziksel yetenekler, kimi zaman enerji ile harmanlanarak farklı etkiler doğurabilen yeteneklere dönüşebilmektedir. Fiziksel yeteneklerin bu şekli Savaş Sanatı olarak adlandırılmaktadır."
                          },
                          {
                            "type": "paragraph",
                            "text": "SLVNZ 4.0 sisteminde fiziksel yetenekler, genel yetenekler ve yetkinlik yetenekleri olarak ikiye ayrılır. Genel yetenekler, karakterlerin herhangi bir yetkinlik şartı gerektirmeksizin mücadelede kullanabileceği yetenekleri nitelendirirken, yetkinlik yetenekleri, yetkinlik sahibi oldukları silahlar ve beceriler çerçevesinde gerçekleştirebilecekleri daha özel yetenekleri belirtir. Her fiziksel silah yetkinliğinin kendine özgü bir yetenek ağacı ve dalları bulunmaktadır. Karakterler, bu dala giriş yapmak üzere 500 DP. toplayacakları bir sürece girerek, ağaca giriş yaptıktan sonra farklı dallara yönelebilirler."
                          }
                        ]
                      },
                      {
                        "label": "ENERJİSEL YETENEKLER",
                        "blocks": [
                          {
                            "type": "paragraph",
                            "text": "Enerjisel yetenekler (Büyüler), doğada bulunan kaotik enerjinin farklı kanallarca çevreye veya kalıntılara sinmiş, belirli sembollerce nesnesel veya doğal akıştan geçirilerek meydana getirilebilen veya tamamen serbest bir biçimde olağan dışı meydana gelebilen sıradışı yeteneklerdir. Evrende herhangi bir insansı karakterin enerjisel yetenek kullanması sıradan bir durum değildir."
                          },
                          {
                            "type": "heading",
                            "level": 3,
                            "text": "ENERJİSEL YETENEK KULLANIMI"
                          },
                          {
                            "type": "paragraph",
                            "text": "Karakterler, istisnai durumlarda basit sayılabilecek enerjisel etkileri meydana getirebilirler. Bu durumlar, kalıntılar gibi karakterlerin üstünde taşıdığı nesneler aracılığıyla gerçekleşmiyorsa, çoğunlukla karakterin belirli vücut hareketleri beraberinde fonetik biçimde uyum sağlayacağı sözler ile birleştirerek gerçekleştireceği bir zincirleme yapı olarak karşılaşılır. Karakterler, bu şekilde enerjisel yetenekleri gerçekleştirebilmek için beraberlerinde MANA rezervi bulundurmalıdır. Aksi halde enerjisel yetenekleri bu şekilde kendi başlarına gerçekleştiremezler."
                          }
                        ]
                      },
                      {
                        "label": "SAVAŞ SANATI",
                        "blocks": [
                          {
                            "type": "paragraph",
                            "text": "Savaş sanatları, özellikle fiziksel yetenekler gibi kas gücüne dayanan ancak bu gücü enerjisel yönlendirmelerle harmanlayan özel savaş manevralarının ortaya çıkarttığı etkilere sahiptir. Bu etkiler, çoğunlukla karakterlerin savaştıkları silahların üstünden uyandırılabilecek veya yaptıkları hamleler ile birlikte meydana gelecek çevresel tepkiler şeklinde yorumlanabilir."
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "type": "heading",
                    "level": 3,
                    "text": "ODAK VE KONSANTRASYON"
                  },
                  {
                    "type": "paragraph",
                    "text": "İki yetenek türünde de anlık gerçekleşen ya da bir süre boyunca mevcut kalan etkiler bulunabilmektedir. Bir süre boyunca etkin kalan bazı yeteneklerin sürdürülebilmesi için odak ya da konsantrasyon gereklidir ve karakterlerin odaklanma/konsantre olma konusunda sınırlılıkları bulunmaktadır. Odak, fiziksel yetenekler için kullanılırken; konsantrasyon, enerjisel yetenekler için kullanılmaktadır."
                  },
                  {
                    "type": "paragraph",
                    "text": "Bir yetenek üstünde odaklanırken ya da konsantre olurken, eğer karakter bu konuda yetkin değilse birden fazla yetenek üstünde bu yoğunlaşmayı gerçekleştiremez.\n\nKonsantrasyon gerektiren yeteneklerde, karakter zihnini ortaya çıkardığı enerjinin dağılmadan dışarıda kalabilmesi için kendini odaklamış olur. Odak gerektiren yeteneklerde ise karakter, algılarını yeteneğin akışına odaklayarak duruşunu korur. Karakterlerin odaklanma ya da konsantrasyon sırasında alacağı herhangi bir hasar, odaklanmayı/konsantrasyonu bozulma tehlikesine sokar. Karaktere isabet eden saldırının türüne ve kuvvetine göre GM bir sınır belirlemekle yükümlüdür. Eğer belirlenmek istenmezse Sayfa 1 üstünde bulunan başarı tablosu baz alınabilir. Ancak, bu durumda konsantrasyon/odağın sadece bozulma ve korunma durumu bulunmaktadır. Kritik başarısızlık, şartlı başarı ve kritik başarı durumları böyle bir senaryoda devre dışı bırakılmalıdır.\n\nKarakterler odak ya da konsantrasyon yapabilme kapasitelerini geliştirebilirler. Bu durum, karakterlerin odak yuvası ve konsantrasyon yuvası sayılarını artırması demektir. Aktif bulunan her konsantrasyon ve odak gerektiren yetenek için bir yuva doldurulur, yetenek sona erdikten sonra boşaltılır. Konsantrasyon ve odak yuvalarının nasıl geliştirildiğine Karakter Gelişimi bölümünden bakabilirsiniz."
                  }
                ]
              },
              {
                "id": "savas-mucadele",
                "title": "SAVAŞ & MÜCADELE",
                "mode": "rich",
                "blocks": [
                  {
                    "type": "heading",
                    "level": 2,
                    "text": "SAVAŞ & MÜCADELE"
                  },
                  {
                    "type": "paragraph",
                    "text": "Karakterler tek başlarına kalkıştıkları eylemlerde başarı düzeyini belirlemek için kullandıkları zar sistemini karşılıklı girdikleri savaşlar veya mücadeleler için de kullanırlar. İki karakterin birbirine kılıç savurması, belirli enerjilerin etkisi altında bırakması, güreş tutması vb. durumlarda savaş ve mücadele sistemi devreye girer.\n\nEn basit hali ile bunun gibi durumlarda iki taraf da birer zar kullanır. Sayısal değeri yüksek gelen taraf karşılaşmadan galip çıkar. Ancak, silahlı mücadeleler, enerji yönlendirmenin kullanıldığı durumlar gibi özel anlarda, gerçekleştirilen eylemin niteliğine göre kullanılacak zar sayıları değişmektedir."
                  },
                  {
                    "type": "example",
                    "text": "Örneğin, birbirine karşı çift elli kılıçlarla savaşan iki karakterin mücadelesinde; kılıcı savuran taraf, kılıcın isabetini belirlemek için bir zar, kılıcı savurma kuvvetini belirlemek için ise ikinci bir zar kullanır. **Fiziksel zarlar ile oynanan bir ortamda bu zarların sırayla atılması tavsiye edilir.** Dijital çevrimiçi bir ortamda ise topluca atılabilir, ancak gelen sonuçlar soldan sağa sıralanacak şekilde önce isabet, ardından kuvvet şeklinde olmalıdır."
                  },
                  {
                    "type": "paragraph",
                    "text": "Yukarıdaki anlatım ışığında, savaş ve mücadele durumlarında takip edilebilecek durumlar şu şekilde birbirinden ayrılabilir:"
                  },
                  {
                    "type": "heading",
                    "level": 3,
                    "text": "SIRADAN MÜCADELE"
                  },
                  {
                    "type": "paragraph",
                    "text": "Sıradan mücadeleler; güreş tutma, birbirini engelleme, yalan söyleme, ikna etme gibi karşılıklı başarma ve kaybetme durumları değerlendirilir. Bu durumlarda genellikle iki taraf da birer adet zar kullanır. Yardımcı puanlarla birlikte sayısal üstünlüğe sahip olan taraf mücadelenin galibi olur."
                  },
                  {
                    "type": "example",
                    "text": "Majik, kalabalık bir sokakta dolaşırken dalgın yürüyen bir adamın cebinden altın kesesini almaya çalışmak için El Çabukluğu özel becerisini kullanır. Buna karşılık dalgın adam için bu durumu zamanında fark edip etmeyeceğini belirlemek için FARKINDALIK beceri zarı kullanılır."
                  },
                  {
                    "type": "heading",
                    "level": 3,
                    "text": "SAVAŞ"
                  },
                  {
                    "type": "paragraph",
                    "text": "Savaş anında karakterler genellikle saldırı eylemlerini belirlemek üzere birden fazla zar kullanırlar. Bu durumlar genellikle **ÇEVİKLİK, KUVVET, İSABET, KAYNAK KULLANIMI, ENERJİ** gibi nitelikler üzerinden belirlenir. Bir savaş anında gelişebilecek eylemler ve bu eylemler için kullanılabilecek zar sıfatları sınıflandırılabilir."
                  },
                  {
                    "type": "tabs",
                    "tabs": [
                      {
                        "label": "YAKIN MENZİLLİ SALDIRILAR",
                        "blocks": [
                          {
                            "type": "paragraph",
                            "text": "Yakın menzilli herhangi bir silah ile saldırıda bulunan bir karakter, özel ya da ekleme bir durum olmadığı sürece iki adet zar kullanır. Bu zarlar sırayla atılmalı ya da dijital bir ortamda kullanılıyorsa gelen sonuç soldan sağa sıralanacak şekilde, ilk olarak İSABET, ikinci olarak HASAR/KUVVET olmak üzere sayısal değerlere dökülür."
                          }
                        ]
                      },
                      {
                        "label": "UZAK MENZİLLİ SALDIRILAR",
                        "blocks": [
                          {
                            "type": "paragraph",
                            "text": "Yakın menzilli saldırılara benzer olarak, uzun menzilli saldırılarda da genel olarak iki zar kullanılır. Ancak, bahsedilen menzilli saldırı enerji yönlendirmeyi içeriyorsa, bu durumda kullanılacak zarların sayısı ikiden fazla olacak şekilde enerjisel yeteneğin özelliklerine göre değişebilmektedir. Enerjisel yetenekler dışında sıradan olarak bahsedilebilecek menzilli saldırılarda (Yay kullanımı gibi) MENZİLLİ İSABET ve KUVVET zarı kullanılır. Ancak, kuvvet gerektirmeyen bazı menzilli araçlar kullanılırken (Tatar Yayı, Musket gibi) sadece atışı isabet ettirmek için bir zar kullanılır. Bunun sebebi bu tarz menzilli silahların kendilerine özgü sabit bir hasarının bulunmasıdır."
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "type": "heading",
                    "level": 3,
                    "text": "Savunma"
                  },
                  {
                    "type": "paragraph",
                    "text": "Karakterler kendilerine yönelmiş herhangi bir saldırıdan kaçınmak ya da korunmak üzere bir savunma zarı kullanabilirler. Bu tür zarlar genellikle **KAÇINMA, BLOKLAMA** ya da **DAYANIKLILIK** kullanılarak atılır."
                  },
                  {
                    "type": "tabs",
                    "tabs": [
                      {
                        "label": "KAÇINMA",
                        "blocks": [
                          {
                            "type": "paragraph",
                            "text": "Kaçınma durumlarında gelen saldırının isabet zarının sayısal değerini kaçınma zarı ile geçmek yeterlidir. Ancak rakibin isabet değeri ile karakterin kaçınma değeri arasındaki fark ne kadar fazla ise, karşı tarafın gerçekleştirdiği saldırının isabet ettiği nokta, rakibin saldırmak istediği noktaya o kadar yakın olmaktadır."
                          }
                        ]
                      },
                      {
                        "label": "BLOKLAMA",
                        "blocks": [
                          {
                            "type": "paragraph",
                            "text": "Savaşta bloklama iki farklı temele dayanır: Silahla Bloklama & Kalkanla bloklama"
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "type": "tabs",
                    "tabs": [
                      {
                        "label": "SİLAHLA BLOKLAMA",
                        "blocks": [
                          {
                            "type": "paragraph",
                            "text": "Karakterler kendilerine yönelen yakın menzilli saldırıları silahlarıyla bloklamayı tercih edebilirler. Bir karakterin silahla bloklama yapabilmesi için bu beceri konusunda yetkinlik sahibi olması gerekir. \n\nSilahla gerçekleştirilecek bloklama hamleleri, karakterlerin **çeviklik** ve ilgili silaha yönelik **blok becerisi** üzerinden hesaplanır. Bir karakter, silahıyla bir saldırıyı bloklayabilmesi durumunda *soluk* tüketir."
                          }
                        ]
                      },
                      {
                        "label": "KALKANLA BLOKLAMA",
                        "blocks": [
                          {
                            "type": "paragraph",
                            "text": "Bir karakter, kuşanmış olduğu kalkan türüne göre farklı şekillerde bloklama gerçekleştirebilir. Buckler ve küçük boyutta karakteri tamamen kapatmayan hafif kalkanlar, karakterin *çeviklik* niteliği ve *kalkan blok* becerilerinin toplamıyla belirlenir. Bu kalkan türlerinde mevcut blok zarının aşılması durumunda darbe doğrudan karaktere ulaşır.\n\nAncak Orta, Büyük ve Kule Kalkan gibi daha büyük kalkan türlerinde, çeviklik değeri alınmadan sadece ilgili kalkanın blok becerisi ile bir hesaplama gerçekleştirilir. Bloklama durumunda, bloklayan karakter *soluk tüketir* ancak saldırının kendisine ulaşmasını engellemiş olur. Bloklama yapan karakterin blok zarının aşılması durumunda, 6 puanlık farka kadar karakter bloklamayı gerçekleştirebilir, uygulanan kuvvetten bağımsız olarak aşılan fark sebebiyle fazladan soluk tüketir."
                          },
                          {
                            "type": "heading",
                            "level": 3,
                            "text": "TAM BLOK POZU"
                          },
                          {
                            "type": "paragraph",
                            "text": "Karakterler, Orta ve daha büyük kalkan türleri ile *tam blok* pozuna geçiş yapabilirler. Bu poza geçiş yapmak bir eylemdir. Bir karakter tam blok pozundayken,\n\n- Hareket mesafesi yarıya düşer.\n- Çevresel farkındalığı azalır.\n- Soluğunu toparlayamaz.\n- Gerçekleştireceği yakın mesafeli fiziksel saldırılar dezavantajlı kuvvet ve isabet alır.\n- Uzak menzilli enerjisel veya fiziksel saldırı gerçekleştiremez.\n+ Kalkanıyla baktığı yönden gelecek bütün fiziksel saldırıları garanti bir şekilde bloklar.\n\nKarakter, soluğu kesilene veya kendisi bozana kadar turlar boyunca tam blok pozunu koruyabilir. Ancak kendi isteğiyle tam blok pozundan çıkması durumunda, bir sonraki turuna kadar tam blok pozuna tekrar giremez (Pozdan çıkmak ek eylemdir)."
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "type": "heading",
                    "level": 3,
                    "text": "ENERJİSEL YETENEK KULLANIMI"
                  },
                  {
                    "type": "paragraph",
                    "text": "Enerjinin yönlendirilmesi ve kullanımı basit formlarda başlasa da geliştikçe karmaşıklaşan, dolayısıyla zar kullanımı açısından da farklı yaklaşımlar isteyebilen bir durumdur. Çoğu enerji kullanımı için iki ya da üç zar kullanılsa da büyünün tanımı ya da işlevi özelleştikçe, bu işleve uyum sağlamak adına enerji kullanımına farklı türde zarlar eklenebilir."
                  },
                  {
                    "type": "paragraph",
                    "text": "*Enerji kullanımı iki farklı temele dayandırılır. Bu temeller, İsabet temelli ve yoğunluk temelli enerjiler olarak nitelendirilir.*"
                  },
                  {
                    "type": "tabs",
                    "tabs": [
                      {
                        "label": "İSABET TEMELLİ ENERJİLER",
                        "blocks": [
                          {
                            "type": "paragraph",
                            "text": "Tekil bir hedef belirlenerek, bu hedefe isabet ettirilmeye çalışılan enerjileri ifade eden yetenek tipleridir. Bu tip enerjilerde her zaman ilk olarak **İSABET** becerisi baz alınarak bir zar kullanılır. Sonrasında enerjiye yönelik yoğunluk ve duruma yönelik element, etki süresi vb. etkenler için ayrı zarlar kullanılabilir."
                          }
                        ]
                      },
                      {
                        "label": "YOĞUNLUK TEMELLİ ENERJİLER",
                        "blocks": [
                          {
                            "type": "paragraph",
                            "text": "Genel olarak isabet gerektirmeksizin bir varlığa ya da bir bölgeye yoğunlaşarak belirli bir etkinin oluşturulmaya çalışıldığı enerjilerdir. Bu tür enerjiler, zihinsel saldırılar, bir alanda patlama, yanma, erime vb. etkiler oluşturma, bir madde üstünde farklı etkilere sebep olma gibi durumları içermektedir. İsabet temelli enerjilerde olduğu gibi yoğunluk temelli enerjilerde de duruma göre alan, etki süresi, mesafe gibi farklı etkenler göz önünde bulundurularak farklı zar kullanımları eklenebilir."
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "type": "heading",
                    "level": 3,
                    "text": "MÜCADELEDE ODAK & KONSANTRASYON"
                  },
                  {
                    "type": "paragraph",
                    "text": "Fiziksel ya da enerjisel bir yeteneğini odak/konsantrasyon durumunda bulundurmak, karakterlerin bu durumlara yönelik yuvalarını dolduran eylemlerdir. İki durum da birbirine süreç olarak benzerlik gösterebilse de bu durumların korunması konusu birbirinden farklılık gösterebilir."
                  }
                ]
              },
              {
                "id": "savas-sistemi",
                "title": "SAVAŞ SİSTEMİ",
                "mode": "rich",
                "blocks": [
                  {
                    "type": "heading",
                    "level": 2,
                    "text": "SAVAŞ SİSTEMİ"
                  },
                  {
                    "type": "heading",
                    "level": 3,
                    "text": "SAVAŞ DÜZENİ"
                  },
                  {
                    "type": "tabs",
                    "tabs": [
                      {
                        "label": "KARE SAVAŞ DÜZENİ",
                        "blocks": [
                          {
                            "type": "image",
                            "src": "https://slvnz.github.io/resources/webpage/svg/square-battle.svg",
                            "alt": "",
                            "caption": "Kare savaş düzeni",
                            "width": "300"
                          },
                          {
                            "type": "paragraph",
                            "text": "Kare savaş sistemi, SLVNZ 4.0'ın mücadele eylemlerinin ve hareketlerinin işlenmesi için temeli oluşturur. Savaş sisteminde varlıkların her biri bir Kare içinde yer alırlar ve birimlerin hareketleri, gerçekleşecek eylemlerin mesafeleri ve kapsayacakları alanlar birim olarak belirlenmiş tekil kare yuvalar üzerinden hesaplanır.\n\nSavaş düzeninde, karakterin baktığı yöndeki ve bu yönün içerdiği birimin sağ ve sol bitişiğindeki birimler **net alan** olarak isimlendirilir."
                          },
                          {
                            "type": "list",
                            "ordered": false,
                            "items": [
                              "Karakter, net alandaki varlıklara normal şekilde fiziksel saldırıda bulunabilir.",
                              "Karakter, net alandan alacağı saldırılara karşı normal şekilde savunma & kaçınma hamleleri yapabilir."
                            ]
                          },
                          {
                            "type": "paragraph",
                            "text": "Savaş düzeninde net alan, net alanlardan karakterin çevresine doğru dolaşırken **SOL** ve **SAĞ** birimler bulunur."
                          },
                          {
                            "type": "list",
                            "ordered": false,
                            "items": [
                              "Karakter, **BU ALANLARDAN** gelen fiziksel saldırılara karşı savunma yapmak için herhangi bir eksi puan almaz. Ancak saldırıyı savuşturma veya saldırıdan kaçınma süreçleri koşullara bağlı olarak değişiklik gösterir.",
                              "Karakter, elinin boş bulunduğu taraftan gelen bir saldırıya karşı kaçınma yapmak zorundadır. Saldırının geldiği taraftaki elinde en az orta boy kalkan bulunduruyorsa, bloklamayı avantajlı gerçekleştirir.",
                              "Karakter, altıgen sisteminde olduğu gibi sadece net alan sınırlarında bulunan varlıklara herhangi bir şekilde bakış yönünü değiştirmeden saldırıda bulunabilir. Ancak, silah bulundurduğu elinin olduğu tarafa da bakış açısını değiştirmeden saldırıda bulunabilir (Sol elinde silah bulunduran biri sol tarafa saldırabilir, ancak sağ tarafa saldırmak için o bölgeye net alan olacak şekilde yüzünü dönmelidir).",
                              "Karakter, bu alanlardan gelecek menzilli fiziksel saldırıların farkındadır ve yukarıdaki kuralları gözeterek savunma & kaçınma yapabilir."
                            ]
                          },
                          {
                            "type": "paragraph",
                            "text": "Karakterin baktığı yönün sağ ve sol arkasındaki birimler **eşik alan** olarak isimlendirilir."
                          },
                          {
                            "type": "list",
                            "ordered": false,
                            "items": [
                              "Karakter, eşik alandan gelen yakın mesafeli fiziksel saldırılara karşı -2 negatif değer alarak savunma gerçekleştirir.",
                              "Karakter, eşik alan tarafından gelecek uzun menzilli fiziksel saldırıyı yapacak kişinin orada olduğunun farkındaysa, gelen saldırıya karşı farkındalık zarı kullanır. Farkındalık 10'dan yüksek gelirse gelen fiziksel menzilli saldırıyı fark ederek kaçınmaya çalışabilir. Saldıranın okçuluk/atıcılık/isabet/nişancılık ve kuvvet yüksekliğine bağlı olarak saldırının başarı düzeyi belirlenir."
                            ]
                          },
                          {
                            "type": "paragraph",
                            "text": "Karakterin baktığı yönün tam tersinde — yani arkasında — kalan birim **kör alan** olarak isimlendirilir."
                          },
                          {
                            "type": "list",
                            "ordered": false,
                            "items": [
                              "Karakter, kör alandan gelen yakın mesafeli fiziksel saldırılara karşı, eğer saldırıyı yapan kişinin arkasında olduğunun farkındaysa dezavantaj ile kaçınma gerçekleştirmeye çalışır. **Bloklama** şeklinde bir savunma bu pozisyona karşı gerçekleştirilemez.",
                              "Karakter, kör alandan gelecek fiziksel bir uzak menzilli saldırıya karşı başka bir varlık tarafından tepki olarak uyarılmıyor veya buna özel bir sistemi yoksa savunma veya kaçınma gerçekleştiremez."
                            ]
                          }
                        ]
                      },
                      {
                        "label": "BLOK SİSTEMİ",
                        "blocks": [
                          {
                            "type": "image",
                            "src": "https://slvnz.github.io/resources/webpage/svg/square-block.svg",
                            "alt": "",
                            "caption": "Kare blok sistemi",
                            "width": "300"
                          },
                          {
                            "type": "paragraph",
                            "text": "Fiziksel mücadelelerde kaçınma genel bir standarda sahip basit bir yapıda olsa da bir kalkanla bloklamanın koşullara bağlı değişkenlikleri bulunmaktadır. Bu değişkenler dahilinde, bloklama sistemi kare ve altıgen sistem üzerinde farklılıklarıyla incelenebilir. Kalkanlar genel kullanım şekilleriyle sol elde kuşanıldıkları için, şemalar sol kullanım üzerinden bir görsellik sunmaktadır. Kalkanın diğer tarafta kullanım durumunda, aynı sistem karakterin sağ tarafı için geçerlidir."
                          },
                          {
                            "type": "heading",
                            "level": 3,
                            "text": "KÜÇÜK KALKANLAR & SİLAHLAR"
                          },
                          {
                            "type": "paragraph",
                            "text": "Küçük kalkanlar, karakteri önemli ölçüde kapatma özelliğine sahip olmadıkları için çoğunlukla bireysel ölçekte fiziksel saldırıları engellemek ve savuşturmak üzere kullanılır. Sonuçları bire bir aynı olmasa da silahlar ve küçük kalkanlar aynı sistem yapısına tabidir."
                          },
                          {
                            "type": "list",
                            "ordered": false,
                            "items": [
                              "Küçük kalkanlar bloklamak için ek puanlarını karakterin **ÇEV** niteliğinden edinirler.",
                              "Silahlar bu ek puanı kendilerine ait özel **BLOK** niteliğinden edinirler.",
                              "Daha büyük boyutta kalkanlarda bloklama eyleminin zarı düşük kalsa bile arada oluşacak puan farkına bağlı olarak kısmi başarı sağlanabilirken, silahlar ve küçük kalkanlarda kaçınma durumundaki gibi başarısız olunur."
                            ]
                          },
                          {
                            "type": "heading",
                            "level": 3,
                            "text": "ORTA KALKANLAR"
                          },
                          {
                            "type": "paragraph",
                            "text": "Orta kalkanlar, karakteri önemli ölçüde kapatma özelliğine sahiptir. Bu özellikler hem ağırlıkları hem de büyüklükleri sebebiyle karakterin hareket kabiliyeti üzerinde olumsuz etkilere sebep olmaktadır. Ancak, bu duruma karşılık karaktere gelecek fiziksel hamlelere karşı korunak sağlamaktadır."
                          },
                          {
                            "type": "list",
                            "ordered": false,
                            "items": [
                              "Orta kalkan kullanan bir karakter, **NORMAL ALANLAR** tarafından gelecek yakın menzilli fiziksel saldırılara karşı normal şekilde **BLOK BONUSU** edinerek bloklama yapabilir (Kalkandan gelecek blok aşırtma sınırı).",
                              "Eğer karaktere gelecek saldırı **NET ALAN** tarafından geliyorsa, karakter bloklama eylemine **AVANTAJ** alır.",
                              "Eğer karaktere gelecek saldırı zor alan tarafından geliyorsa, karakter bloklama eylemine **DEZAVANTAJ** alır."
                            ]
                          },
                          {
                            "type": "heading",
                            "level": 3,
                            "text": "KULE KALKANLAR"
                          },
                          {
                            "type": "paragraph",
                            "text": "Kule kalkanlar, karakterlerin hareketlerini ve **ÇEV** niteliklerini önemli ölçüde düşürürken korunak durumunu aynı ölçüde yükselten yapıya sahiptir. Bir karakter, orta kalkanlarda olduğu gibi kule kalkanlarda da blok bonusu becerisi üzerinden bloklama gerçekleştirir, ancak kule kalkanı tam blok pozuna geçirdiği zaman stamina değeri tükenene ya da kalkan işlev görmez hale gelene kadar saldırıları kesinlikle bloklar."
                          },
                          {
                            "type": "heading",
                            "level": 3,
                            "text": "BLOKLAMADA DAYANIKLILIK"
                          },
                          {
                            "type": "paragraph",
                            "text": "Bloklama, karaktere üstün korunak sağlasa da karakter tarafından kaynak kullanımı denetimi gerektiren bir süreçtir. Bir karakter, saldırı blokladıkça kalkanı üzerinde hasar alır. Kalkanın materyalinin zarar görmesinin yanı sıra, karakter arka arkaya kuvvetli saldırılar bloklamaya başlarsa DAY niteliği üzerinden bir mücadeleye girer. Bu mücadelede, bloklanan her kuvvetli saldırı sonrasında karakterin bir miktar soluk kaynağı geçici olarak tükenmeye başlar.\n\nKarakter bu kaynağı tüketene kadar bloklama yapmayı tercih ederse, soluk kaynağı 0'a düştüğü veya dengesi bozulduğu zaman karakterin gardı kırılır ve kırılgan pozuna girer. Bu pozdayken alacağı sonraki ilk yakın menzilli saldırı kritik bir isabetle gerçekleşir. Eğer karakter stamina kaynağı tükenmeden blok yapmaya ara verirse, ara verdiği turlar boyunca sabit bir şekilde kaynağın eriyen miktarı yenilenmeye başlar."
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "type": "heading",
                    "level": 3,
                    "text": "SAVAŞ EYLEMLERİ"
                  },
                  {
                    "type": "paragraph",
                    "text": "Bu savaş düzenine göre karakterler varsayılan olarak şunları gerçekleştirebilir:"
                  },
                  {
                    "type": "list",
                    "ordered": false,
                    "items": [
                      "İnsansı varlıkların temel hareket sınırı 4 birimdir. Niteliklerden her **+2 ÇEV** başına insansı varlıklar karasal hareketlerine **+1 birim hareket mesafesi** kazanır.",
                      "Çevresinde kendine gelen bir saldırıya karşı **TEPKİ EYLEM** kullanarak bakış yönünü saldırıya yönlendirebilir. Eğer **KÖR NOKTADAN** gelen bir saldırıya karşı yapıyorsa, sadece kaçınma hareketi gerçekleştirebilir. Bu durumda kaçınma eylemine dezavantaj alır.",
                      "Belirli bir yöne bakan bir varlık, görüş mesafesinde hareket eden bir varlığın turu boyunca gerçekleştireceği hareketi takip edecek şekilde tepki eylem olarak bakış yönünü değiştirebilir. Eğer eşik veya kör alandan yakın mesafesinde hareket eden bir varlık varsa (3-6 birim mesafe), pasif olarak kullanılacak bir **FARKINDALIK** zarı ile fark etmesi durumunda bu alanda hareket eden varlığa karşı da bakış yönünü tepki eylemle değiştirebilir.",
                      "Karakter, turunda **NET ALANDA** ve **silah tuttan elinin tarafında** (Eşik alan hariç) bulunan hedeflere saldırabilir. Karakterin kendi turunda yüzünü bir yöne dönmesi herhangi bir eylem türü ya da hareket puanı gerektirmez.",
                      "Karakter, **NET ALAN** sınırlarının dışına ayrılacak bir varlığa **TEPKİ EYLEM** olarak **FIRSAT SALDIRISI** gerçekleştirebilir. Karakter, fırsat saldırısı gerçekleştirirken yüzünü saldırdığı birim tarafına dönüp dönmeme konusunda seçim yapabilir. Fırsat saldırısı isabet eden hedefin hareketi iptal olur. Net alan dışındaki alanlarda hareket eden varlıklar fırsat saldırısını tetiklemez."
                    ]
                  },
                  {
                    "type": "heading",
                    "level": 3,
                    "text": "ENERJİSEL SAVAŞ"
                  },
                  {
                    "type": "paragraph",
                    "text": "Enerjisel savaş, karakterlerin enerjisel yetenekler ile gerçekleştireceği savaş sürecidir. Enerjisel savaş süreci fiziksel yakın savaş sürecine kıyasla daha basittir ancak kendi incelikleri bulunmaktadır."
                  },
                  {
                    "type": "heading",
                    "level": 3,
                    "text": "Kaynak Kullanımı"
                  },
                  {
                    "type": "paragraph",
                    "text": "Enerjisel savaşta kısa sürede pek çok yetenek seri olarak sıralanarak kullanılmaktadır. Bu süreçte şu kurallar izlenmektedir:"
                  },
                  {
                    "type": "list",
                    "ordered": false,
                    "items": [
                      "Eğer kaynak tüketimi olan, aynı enerji türüne ait bir yetenek arka arkaya 2 seferden fazla kullanılırsa harcadığı kaynak değeri **X2** olacak şekilde katlanmaya başlar. Karakter, bu katlanmayı araya aynı enerjiyi kullanan bir **BAZBÜYÜ** ile karıştırır veya **FARKLI ENERJİ TÜRÜNDE** bir yetenek kullanırsa **SIFIRLAR**.",
                      "Karakterlerin **GÖREBİLDİKLERİ** hedefler bulunmaktadır. Görebildikleri hedefler üstünde **İSABET** ve **ODAKLANMA** gerektiren enerjisel yetenekler kullanılabilir.",
                      "Bir karakter, **FARKINDA** olduğu ancak **GÖREMEDİĞİ** bir hedef üstünde — eğer arada bir fiziksel/enerjisel engel yoksa — sadece **İSABET** becerisini kullanabileceği tipte yetenekler kullanabilir.",
                      "Bir karakter, ancak **GÖREBİLDİĞİ** bir hedef üstünde **ETKİ OLUŞTURAN** enerjisel yetenekler kullanabilir."
                    ]
                  },
                  {
                    "type": "heading",
                    "level": 3,
                    "text": "Konsantrasyon"
                  },
                  {
                    "type": "paragraph",
                    "text": "Karakterlerin uygulayacağı yeteneklerin bir kısmı, anında gerçekleşen etkiler haricinde **SÜREKLİ ETKİ** meydana getirebilir. Bu şekilde etki oluşturan yeteneklerde karakterin **KONSANTRASYON** sürecine girmesi gerekir. Konsantrasyon, bir karakterin mental olarak enerjisel etkinin varlığını sürdürmesi için ona odağını koruma sürecidir."
                  },
                  {
                    "type": "paragraph",
                    "text": "Bu süreçte karakter farklı eylemler gerçekleştirebilir, enerjisel veya fiziksel yetenekler kullanabilir. Ancak farklı bir konsantrasyon sürecine girecek olursa, mevcut konsantrasyonu **BOZULUR**. Aynı şekilde, bir karakter konsantrasyon sürecindeyken herhangi bir şekilde hasar alırsa **KONSANTRASYON TESTİ** zarı kullanır. Zarın **10 DEĞERİNİN ALTINDA** gelmesi durumunda, konsantrasyon bozulur. Bir karakterin **BİRDEN FAZLA KONSANTRASYON YUVASI** bulunabilir. Bir konsantrasyon yuvasını geliştirme konusunda gerekli deneyim puanını hesaplamak için \"**500** x **KONSANTRASYON SEVİYESİ**\" şeklinde bir formül kullanılır."
                  }
                ]
              },
              {
                "id": "ekipman",
                "title": "EKİPMAN",
                "mode": "rich",
                "blocks": [
                  {
                    "type": "heading",
                    "level": 2,
                    "text": "EKİPMAN"
                  },
                  {
                    "type": "paragraph",
                    "text": "SLVNZ 4.0'da karakterlerin ekipman kullanımlarının ayrı bir yeri bulunmaktadır. Karakterlerin sahip olduğu ekipmanlar, karakter niteliklerini doğrudan etkileyebilmektedir. Karakterler, kuşandıkları ekipmanlar aracılığıyla kendilerini korunaklı veya işlevsel hallere getirebilirken, kuşandıkları ekipmanların ağırlıksal niteliklerine bağlı olarak bazı kısıntılar yaşarlar. Bu sistem, ekipman yükü ile Yük Puanı (YP) üzerinden hesaplanır."
                  },
                  {
                    "type": "heading",
                    "level": 3,
                    "text": "YÜK PUANININ HESAPLANMASI"
                  },
                  {
                    "type": "paragraph",
                    "text": "Karakterin savaş sırasında üzerinde taşıdığı zırh, kalkan, silah ve erişilebilir ekipmanlar Kuşanım Yükü oluşturur. Bu yük, yalnızca ekipmanın gerçek ağırlığını değil; ekipmanın bedene yayılışını, hareketi ne kadar kısıtladığını, savaş sırasında ne kadar yer kapladığını ve karakterin beden ritmini ne ölçüde bozduğunu temsil eder.\n\nBu nedenle Yük Puanı — YP, doğrudan kilogram karşılığı değildir. Bir tam plaka zırh, bütün bedene yayılan sürekli bir yük oluşturduğu için yüksek YP’ye sahiptir. Buna karşılık büyük bir kılıç ağır ve hantal olsa da, tam plaka zırh kadar sürekli bedensel kısıtlama yaratmaz.\n\nToplam Kuşanım Yükü = Zırh YP + Kalkan YP + Kuşanılmış Silah YP + Üstte Taşınan Ekipman YP + Modifikasyon YP\n\nHesaba katılanlar:\n\nGiyilen zırh\nKuşanılmış kalkan\nElde, belde, sırtta veya hızlı çekilebilir konumda taşınan silahlar\nSavaş sırasında üstte taşınmaya devam eden çanta, mühimmat, ağır alet, iksir çantası, kamp ekipmanı\nZırha, kalkana veya silaha sonradan eklenmiş ağır parçalar\nMetal kaplama, ek plaka, miğfer, omuzluk, zırh eteği, ikinci katman gibi modifikasyonlar"
                  },
                  {
                    "type": "heading",
                    "level": 3,
                    "text": "KUVVET İLE YÜK AZALTIMI"
                  },
                  {
                    "type": "paragraph",
                    "text": "Karakterin KUVVET niteliği, kuşanım yükünün karakter üzerindeki etkisini azaltır.\n\nKuvvet Yük Azaltımı = KUV x 3\n\nSonrasında karakterin asıl yük seviyesi şu formülle bulunur:\n\nEtkili Yük = Toplam Kuşanım Yükü - Kuvvet Yük Azaltımı\n\nEtkili Yük hiçbir zaman 0’ın altına düşmez."
                  },
                  {
                    "type": "example",
                    "text": "Karakterin toplam kuşanım yükü 32 YP olsun.\nKarakterin KUV değeri +4 ise:\nKUV x 3 = 12\n32 - 12 = 20\nKarakterin Etkili Yük değeri 20 olur."
                  },
                  {
                    "type": "heading",
                    "level": 3,
                    "text": "EKİPMAN YÜKÜ EŞİKLERİ VE ETKİLERİ"
                  },
                  {
                    "type": "table",
                    "header": [
                      "ETKİN YÜK PUANI MARJI",
                      "YÜK SEVİYESİ",
                      "ETKİLERİ"
                    ],
                    "rows": [
                      [
                        "0-8",
                        "Hafif Kuşanım",
                        "Yok"
                      ],
                      [
                        "9-16",
                        "Orta Kuşanım",
                        "-1 Hareket, -1 Kaçınma, -1 Atletik Eylemler"
                      ],
                      [
                        "17-24",
                        "Ağır Kuşanım",
                        "-2 Hareket, -2 Kaçınma, -2 Atletik Eylemler, Atik eylemlerde STAMINA kesintisi"
                      ],
                      [
                        "25-32",
                        "Çok Ağır Kuşanım",
                        "-3 Hareket, -3 Kaçınma, -5 Atletik Eylemler, Fiziksel Eylemlerde STAMINA kesintisi"
                      ],
                      [
                        "33+",
                        "Aşırı Yük",
                        "-4 Hareket, -5 Kaçınma, Dezavantajlı -5 Atletik Eylemler, Her Fiziksel Eylemde daha fazla STAMINA kesintisi"
                      ]
                    ]
                  },
                  {
                    "type": "tabs",
                    "tabs": [
                      {
                        "label": "ZIRHLAR",
                        "blocks": [
                          {
                            "type": "table",
                            "header": [
                              "ZIRH TİPİ",
                              "YÜK PUANI"
                            ],
                            "rows": [
                              [
                                "ZIRHSIZ",
                                "0"
                              ],
                              [
                                "DERİ",
                                "3"
                              ],
                              [
                                "SERTLEŞTİRİLMİŞ DERİ",
                                "5"
                              ],
                              [
                                "YARIM PLAKA",
                                "12"
                              ],
                              [
                                "ZİNCİR",
                                "14"
                              ],
                              [
                                "PULLU",
                                "16"
                              ],
                              [
                                "TAM PLAKA",
                                "24"
                              ]
                            ]
                          },
                          {
                            "type": "paragraph",
                            "text": "Zırhlar, karakterlerin fiziksel saldırılardan ve birçok enerjisel saldırıdan korunmasına olanak sağlar. Ancak koruma seviyesi yükseldikçe, donanımlı korunma beraberinde bazı dezavantajları getirir. Bu dezavantajlar, yük puanının getireceği etkilerle sınırlı kalmayabilir. Örneğin, oyun yöneticisinin tercihine bağlı olarak, bir karakter giydiği miğferden dolayı farkındalık becerisine eksi değer alabilir."
                          }
                        ]
                      },
                      {
                        "label": "SİLAHLAR",
                        "blocks": [
                          {
                            "type": "table",
                            "header": [
                              "SİLAH TİPİ",
                              "YÜK PUANI"
                            ],
                            "rows": [
                              [
                                "HANÇER",
                                "1"
                              ],
                              [
                                "SATIR",
                                "2"
                              ],
                              [
                                "KISA KILIÇ",
                                "2"
                              ],
                              [
                                "NORMAL KILIÇ",
                                "3"
                              ],
                              [
                                "UZUN KILIÇ",
                                "3"
                              ],
                              [
                                "BÜYÜK KILIÇ",
                                "4"
                              ],
                              [
                                "SAVAŞ BALTASI",
                                "3"
                              ],
                              [
                                "BÜYÜK SAVAŞ BALTASI",
                                "4"
                              ],
                              [
                                "TOPUZ / ÇEKİÇ",
                                "3"
                              ],
                              [
                                "BÜYÜK TOPUZ / ÇEKİÇ",
                                "5"
                              ],
                              [
                                "ZİNCİRLİ GÜRZ",
                                "4"
                              ],
                              [
                                "BÜYÜK ZİNCİRLİ GÜRZ",
                                "6"
                              ],
                              [
                                "MIZRAK",
                                "3"
                              ],
                              [
                                "UZUN MIZRAK",
                                "4"
                              ],
                              [
                                "PIKE",
                                "5"
                              ],
                              [
                                "YAY",
                                "3"
                              ],
                              [
                                "UZUN YAY",
                                "4"
                              ],
                              [
                                "TATAR YAYI",
                                "5"
                              ],
                              [
                                "MUSKET / TÜFEK",
                                "5"
                              ]
                            ]
                          },
                          {
                            "type": "paragraph",
                            "text": "Her silah tipinin kendine özgü niteliklerinin bulunmasının yanı sıra karakterler bu silah tipleri üzerinde antrenman yaparak kendilerini geliştirebilir, silahları daha isabetli savurma konusunda ve ileride silah tiplerine özgü farklı yeteneklere sahip olmak için ilerleyebilirler."
                          }
                        ]
                      },
                      {
                        "label": "KALKANLAR",
                        "blocks": [
                          {
                            "type": "table",
                            "header": [
                              "KALKAN TİPİ",
                              "BLOK PAYI",
                              "YÜK PUANI"
                            ],
                            "rows": [
                              [
                                "KALKANSIZ",
                                "0",
                                "0"
                              ],
                              [
                                "BUCKLER",
                                "ÇEV",
                                "1"
                              ],
                              [
                                "UFAK KALKAN",
                                "ÇEV",
                                "2"
                              ],
                              [
                                "NORMAL KALKAN*",
                                "3",
                                "5"
                              ],
                              [
                                "KULE KALKAN",
                                "6",
                                "10"
                              ]
                            ]
                          },
                          {
                            "type": "paragraph",
                            "text": "(*) Tam Blok Pozu yapabilen kalkan tipi."
                          },
                          {
                            "type": "paragraph",
                            "text": "Kalkanlar, zırhların yanı sıra karakterlere ekstra korunma imkânı tanıyan ekipman türüdür. Bir karakter kalkanla kullanım tarzını şekillendirerek iki farklı şekilde korunabilir. Kalkanda ve birçok yetenek içeriğinde kullanılabilecek bu ve buna benzer durumlara Poz ismi verilir. Kalkan için kullanılabilen pozlar Savaş Pozu ve Tam Blok Pozudur. Bu pozların kullanılabileceği kalkan tipleri Normal Kalkan ve Kule Kalkan tipleridir. Bunların dışında kalan diğer kalkan türleri blok için karakterin çeviklik niteliğini baz alır."
                          },
                          {
                            "type": "heading",
                            "level": 3,
                            "text": "SAVAŞ POZU"
                          },
                          {
                            "type": "paragraph",
                            "text": "Karakterin kalkanı tuttuğu normal savaş duruşudur. Bu duruşta karakter gelen saldırıyı bloke etmek için kuşanmış olduğu kalkanın blok niteliğini ve kendi sahip olduğu blok becerisini birleştirerek kullanır."
                          },
                          {
                            "type": "heading",
                            "level": 3,
                            "text": "TAM BLOK POZU"
                          },
                          {
                            "type": "paragraph",
                            "text": "Tam blok pozunda karakter, kalkanını önünü kapatacak biçimde tutacak şekilde bir duruşa geçer. Bu şekilde karakterin vücudunun dönük olduğu yönden gelen saldırılar NET BLOK gerçekleştirir. NET BLOK, karakterin bütün fiziksel saldırılardan zarar görmemesine, kalkanın hasar alması ve kolun baskı altında kalmasına sebep olur. Aşağıdan gelebilecek saldırılara karşı yine de bir savunma refleksi gerektirir.\n\nTAM BLOK pozundayken karakterin hareket kabiliyeti yarıya iner, gerçekleştireceği fiziksel saldırılara alacağı KUVVET BONUSU yok sayılır. TAM BLOK pozundayken karakter önüne, sağ çaprazına ve sağına fiziksel saldırı gerçekleştirebilir."
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "id": "karakter-gelisimi",
                "title": "KARAKTER GELİŞİMİ",
                "mode": "rich",
                "blocks": [
                  {
                    "type": "heading",
                    "level": 2,
                    "text": "KARAKTER GELİŞİMİ"
                  },
                  {
                    "type": "paragraph",
                    "text": "Oyuncular oyun boyunca karakterlerinin niteliklerini, becerilerini ve yeteneklerini geliştirebilirler. Bu geliştirme süreci, karakterin uygun antrenmanları gerçekleştirmesi sonucu toplayabileceği deneyim puanları ile mümkündür. Deneyim puanları, oyunun kaç yüzlü zar ile oynanmaya karar verildiği gözetilmeksizin, 20 yüzlü zar kullanılarak toplanır.\n\nAncak gelişim yönünde atılan zarlarda, karakterler tecrübesiz oldukları bir üst alanda antrenman gerçekleştirirken d20 zarın **1-5 değerleri gerileme**, **6-20 değerleri ilerleme** olarak sayılır.\n\nBu gerileme/ilerleme aralığında sıfır noktası olarak 5-6 kısmı belirlenir.\n\nEğer karakterler antrenman alanlarıyla ilgili bir yol gösterici edinebilirse (tekniği anlatacak birisi, temel bilgileri anlatacak dökümanlar vb.), yol göstericinin niteliğine göre karakterin antrenman zarındaki gerileme aralığı azalır."
                  },
                  {
                    "type": "example",
                    "text": "Bir karakter bir silah için yetkinlik antrenmanı yapmaktadır. \nBu karakter, silahta yetkin olmadığı için gerileme/ilerleme marjına tabiidir. Yani, d20 antrenman zarıyla gelecek 7 değeri için, +2 deneyim puanı kazanır. Eğer gelen zar 2 ise, -4 deneyim puanı azaltır.\nAncak antrenman yapacak karakter, bu temel konusunda kendisini yönlendirecek bir kaynak bulur ve bir süre bu kaynak doğrultusunda ilerlerse, gerileme marjını giderek azaltacak şekilde antrenman zarının getirisini azami 20 değere yaklaştırır."
                  },
                  {
                    "type": "paragraph",
                    "text": "Karakterin gerçekleştirmek istediği antrenman türü GM tarafına önerilir ve kabul edilirse, karakter oyun süresince 3 saatlik bir çalışma süresine girer. Bu çalışma süresi boyunca arada verilen molalar haricinde bir kesinti yaşanması durumunda GM inisiyatifi ile deneyim puanı için kullanılacak zar türü değişebilir.\n\nKarakterler girdikleri antrenman sonucunda +1 Yorgunluk Durumu puanı alırlar. Karakter yorgunken bir antrenman daha yapacak olursa bu durum karaktere +1 Yorgun Durumu puanı daha ekler. Bir karakterin yorgunluk durumu 2 puan veya daha fazla ise, antrenman yapamaz.\n\nKarakterler zihinsel ve fiziksel olarak yorgunluk durumuna girebilirler. Meditasyon gibi eylemler dışında, bir karakterin enerjisel yetenekleri üstünde çalışması da vücuttaki enerji akışından dolayı karakteri fiziksel bir yorgunluğa sürükleyebilir. Bundan dolayı GM ile anlaşılarak belirlenen belirli antrenman türleri dışında enerjisel ve fiziksel yetenekler üstünde geliştirme çalışmaları karakteri 6 saat sonunda yoracaktır.\n\nKarakterlerin gelişim süreçleri iki farklı kolda ve formüle ayrılmıştır. Bunlar Temel Gelişim ve Özel Gelişimdir."
                  },
                  {
                    "type": "tabs",
                    "tabs": [
                      {
                        "label": "TEMEL GELİŞİM",
                        "blocks": [
                          {
                            "type": "paragraph",
                            "text": "Temel gelişim, karakterlerin temel becerilerini, ekipman yetkinliklerini, enerjisel yetkinliklerini ve kaynak havuzlarını geliştirebileceği süreçleri kapsamaktadır. Bu süreç, karakterin gireceği en az 1 en çok 4 saatlik antrenman ya da meditasyon süreci sonunda atılan farklı yüzlü zarlar ile, belirlenmiş deneyim puanına erişmeye çalışarak seviye atlayabileceği bir sistemdir.\n\n**TEMEL NİTELİKLER**, temel gelişimin bu sistemi ile aynı biçimde ilerlese de gerektirdiği deneyim puanı bakımından çok daha ağırdır. Temel niteliklerde **KUV**, **ÇEV** ve **DAY**, sözü edilen antrenmanlarla geliştirilebilir. Ancak **İRD** ve **SZG** nitelikleri daha özel yöntemler veya antrenmanlarla gelişir. Temel niteliklerin gelişmesi için gerekli deneyim puanı formülü **SEVİYE x 500** olarak işlenir.\n\nTemel Nitelikler nezdinde, istikrarlı bir antrenman süreci takip edilmezse, antrenman gerçekleştirilmeyen günlere bağlı olarak periyodik bir gerileme süreci başlar. Karakter, bu nitelik antrenman sürecinde ne kadar deneyim puanı biriktirdiyse, periyodik gerileme miktarı o kadar azalır. Yani KUV niteliğini geliştirmeye çalışan bir karakter, 1 haftalık antrenman sonucunda 120 puan elde etmişse, 3 gün antrenmanını devam ettirmemesi durumunda, sonraki her antrenmansız gün başına d10 gerileme yaşar. Ancak bu puan miktarı 300 civarındayken, periyodik gerileme d5 civarındadır. Bu durum, sadece temel nitelikler için geçerlidir.\n\nÖzellikle temel niteliklerin geliştirilmesi oldukça uzun bir süreç alabilmektedir. Bu durum göz önünde bulundurulduğunda, bir karakterin asıl özgünlüğünü diğer becerileri ve yeteneklerinin gelişimi ile gösterebileceği belirtilebilir. Özellikle yeni bir oyuna başlanırken veya yeni bir karakter oluşturulurken, GM'in temel nitelikler için ayrı bir Deneyim Puanı havuzu belirlemesi veya oyunculara doğrudan seviye sayısıyla nitelik sınırı vermesi (2 adet +1 nitelik ve 1 adet +2 nitelik, ya da niteliklere özel 2000 Deneyim Puanı gibi...) tavsiye edilir."
                          }
                        ]
                      },
                      {
                        "label": "ÖZEL GELİŞİM",
                        "blocks": [
                          {
                            "type": "paragraph",
                            "text": "Özel gelişim, karakterlerin özel becerilerini geliştirebilecekleri bir gelişim sürecini kapsamaktadır. Bu süreç, temel gelişimdeki özel antrenmanlardan farklı olarak yaptıkça öğrenme ve gelişme modeli üstüne kuruludur. Yani, bir karakter özel becerisini kullandığı zaman attığı zar ile deneyim puanı kazanır. Bu bağlamda, temel olarak özel becerileri geliştirmek için gerekli deneyim formülü ise SEVİYE x 100 Deneyim Puanı şeklindedir. Ancak bütün özel beceriler karmaşıklık ve özellik bakımından eş olamayacağı üzere, üst seviyeler için gereken çarpan sayısı değişkendir."
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "id": "huner-kusurlar",
                "title": "HÜNER & KUSURLAR",
                "mode": "rich",
                "blocks": [
                  {
                    "type": "heading",
                    "level": 2,
                    "text": "HÜNER & KUSURLAR"
                  },
                  {
                    "type": "paragraph",
                    "text": "Karakterlerin arka plan hikâyelerinden, bazı yeteneklerinden, taşıdıkları eşyalardan ya da oyun içinde gelişebilecek başka durumlardan dolayı karakterlerin üstünde özel etkiler oluşabilir. Bu etkiler geçici, şartlı ya da kalıcı bir şekilde karakterin üstünde bulunabilir."
                  },
                  {
                    "type": "paragraph",
                    "text": "Bu durumlar, niteliklere, becerilere, yeteneklere ya da doğrudan oyuncunun rolsel durumuna etki edebilecek şeyler olabilir. Örneğin, bir gözü kör olan bir karakterin üstünde bulunan bir KUSUR durumu, karakterin görmeye yönelik FARKINDALIK beceri değerine -3 almasına sebep olabilir."
                  },
                  {
                    "type": "paragraph",
                    "text": "Bir diğer örnekte, karanlıkta görme yetisine sahip bir karakterin edinmiş olduğu avantaj durumu, karakterin soluk ışıkla aydınlanan bir ortamda görmeye dayalı FARKINDALIK zarlarına artı değer almasını sağlayacaktır."
                  },
                  {
                    "type": "paragraph",
                    "text": "Bunların dışında rolsel ya da durumsal olarak, karakterlerin hastalık durumları ve bu durumlardan zaman zaman yaşayabilecekleri sıkıntılar, bazı durumlara duyarlı oluşları sebebiyle daha etkin olabilme durumları vb. olaylar hüner, avantaj ve kusurlara dahil edilebilir."
                  }
                ]
              }
            ]
          },
          "yetenekler": {
            "label": "YETENEKLER",
            "blurb": "Karakterlerin sahip olabileceği güçlerin ve uzmanlıkların kataloğu.",
            "items": [
              {
                "id": "enerjisel-yetenekler",
                "title": "ENERJİSEL YETENEKLER",
                "mode": "table",
                "table": {
                  "columns": [
                    {
                      "id": "isim",
                      "label": "İSİM",
                      "type": "text",
                      "showInTable": true,
                      "snapZone": "none"
                    },
                    {
                      "id": "tur",
                      "label": "SEVİYE",
                      "type": "number",
                      "showInTable": true,
                      "snapZone": "top"
                    },
                    {
                      "id": "seviye",
                      "label": "ELEMENT",
                      "type": "text",
                      "showInTable": true,
                      "snapZone": "top"
                    },
                    {
                      "id": "maliyet",
                      "label": "KAYNAK",
                      "type": "text",
                      "showInTable": true,
                      "snapZone": "top"
                    },
                    {
                      "id": "yeni-alan",
                      "label": "ENERJİ",
                      "type": "text",
                      "showInTable": true,
                      "snapZone": "top"
                    },
                    {
                      "id": "yeni-alan-2",
                      "label": "Kaynak Bedeli",
                      "type": "number",
                      "showInTable": true,
                      "snapZone": "top"
                    },
                    {
                      "id": "yeni-alan-3",
                      "label": "MENZİL",
                      "type": "text",
                      "showInTable": false,
                      "snapZone": "top"
                    },
                    {
                      "id": "aciklama",
                      "label": "AÇIKLAMA",
                      "type": "textarea",
                      "showInTable": false,
                      "snapZone": "bottom"
                    }
                  ],
                  "rows": [
                    {
                      "_id": "r1",
                      "isim": "Ateş Oku",
                      "tur": 0,
                      "seviye": "Ateş",
                      "maliyet": "Mana",
                      "aciklama": "Menzilde görebildiğin bir hedefe elinden fırlayan bir ateş oku fırlatırsın. İsabet halinde hedef basınç ve yanma hasarı alır.",
                      "yeni-alan": "Yıkım",
                      "yeni-alan-2": 0,
                      "yeni-alan-3": "12 Birim"
                    },
                    {
                      "_id": "r2",
                      "isim": "Akı Kalkanı",
                      "tur": "Savunma",
                      "seviye": 1,
                      "maliyet": 8,
                      "aciklama": "Vücudun çevresinde enerji bir kalkan oluşturur ve gelen ilk darbeyi emer."
                    },
                    {
                      "_id": "r3",
                      "isim": "Boşluk Adımı",
                      "tur": "Hareket",
                      "seviye": 3,
                      "maliyet": 22,
                      "aciklama": "Kısa mesafeli anlık ışınlanma. Görüş hattındaki bir noktaya sıçrar."
                    }
                  ]
                }
              },
              {
                "id": "fiziksel-yetenekler",
                "title": "FİZİKSEL YETENEKLER",
                "mode": "table",
                "table": {
                  "columns": [
                    {
                      "id": "isim",
                      "label": "İSİM",
                      "type": "text",
                      "showInTable": true,
                      "snapZone": "none"
                    },
                    {
                      "id": "tur",
                      "label": "TÜR",
                      "type": "text",
                      "showInTable": true,
                      "snapZone": "top"
                    },
                    {
                      "id": "seviye",
                      "label": "SEVİYE",
                      "type": "number",
                      "showInTable": true,
                      "snapZone": "top"
                    },
                    {
                      "id": "maliyet",
                      "label": "MALİYET",
                      "type": "number",
                      "showInTable": true,
                      "snapZone": "top"
                    },
                    {
                      "id": "aciklama",
                      "label": "AÇIKLAMA",
                      "type": "textarea",
                      "showInTable": false,
                      "snapZone": "bottom"
                    }
                  ],
                  "rows": []
                }
              },
              {
                "id": "savas-sanatlari",
                "title": "SAVAŞ SANATLARI",
                "mode": "table",
                "table": {
                  "columns": [
                    {
                      "id": "isim",
                      "label": "İSİM",
                      "type": "text",
                      "showInTable": true,
                      "snapZone": "none"
                    },
                    {
                      "id": "tur",
                      "label": "TÜR",
                      "type": "text",
                      "showInTable": true,
                      "snapZone": "top"
                    },
                    {
                      "id": "seviye",
                      "label": "SEVİYE",
                      "type": "number",
                      "showInTable": true,
                      "snapZone": "top"
                    },
                    {
                      "id": "maliyet",
                      "label": "MALİYET",
                      "type": "number",
                      "showInTable": true,
                      "snapZone": "top"
                    },
                    {
                      "id": "aciklama",
                      "label": "AÇIKLAMA",
                      "type": "textarea",
                      "showInTable": false,
                      "snapZone": "bottom"
                    }
                  ],
                  "rows": []
                }
              },
              {
                "id": "ozel-beceriler",
                "title": "ÖZEL BECERİLER",
                "mode": "table",
                "table": {
                  "columns": [
                    {
                      "id": "isim",
                      "label": "İSİM",
                      "type": "text",
                      "showInTable": true,
                      "snapZone": "none"
                    },
                    {
                      "id": "tur",
                      "label": "TÜR",
                      "type": "text",
                      "showInTable": true,
                      "snapZone": "top"
                    },
                    {
                      "id": "seviye",
                      "label": "SEVİYE",
                      "type": "number",
                      "showInTable": true,
                      "snapZone": "top"
                    },
                    {
                      "id": "maliyet",
                      "label": "MALİYET",
                      "type": "number",
                      "showInTable": true,
                      "snapZone": "top"
                    },
                    {
                      "id": "aciklama",
                      "label": "AÇIKLAMA",
                      "type": "textarea",
                      "showInTable": false,
                      "snapZone": "bottom"
                    }
                  ],
                  "rows": []
                }
              },
              {
                "id": "hunerler",
                "title": "HÜNERLER",
                "mode": "table",
                "table": {
                  "columns": [
                    {
                      "id": "isim",
                      "label": "İSİM",
                      "type": "text",
                      "showInTable": true,
                      "snapZone": "none"
                    },
                    {
                      "id": "tur",
                      "label": "TÜR",
                      "type": "text",
                      "showInTable": true,
                      "snapZone": "top"
                    },
                    {
                      "id": "seviye",
                      "label": "SEVİYE",
                      "type": "number",
                      "showInTable": true,
                      "snapZone": "top"
                    },
                    {
                      "id": "maliyet",
                      "label": "MALİYET",
                      "type": "number",
                      "showInTable": true,
                      "snapZone": "top"
                    },
                    {
                      "id": "aciklama",
                      "label": "AÇIKLAMA",
                      "type": "textarea",
                      "showInTable": false,
                      "snapZone": "bottom"
                    }
                  ],
                  "rows": []
                }
              }
            ]
          },
          "evren-rehberi": {
            "label": "EVREN REHBERİ",
            "blurb": "Diyarlar, varlıklar ve yaratıklarla SLVNZ evreninin atlası.",
            "type": "hub",
            "items": [
              {
                "id": "genel-evren",
                "title": "GENEL EVREN",
                "blurb": "Evrenin genel işleyişi, kozmolojisi ve temel kavramları.",
                "pages": [
                  {
                    "id": "giris",
                    "title": "GİRİŞ",
                    "mode": "text",
                    "body": "Bu bölümün açıklaması henüz yazılmadı. Buraya ilgili kuralların, tanımların ve örneklerin geleceği yer tutucu bir metindir.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.\n\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident."
                  }
                ]
              },
              {
                "id": "diyarlar",
                "title": "DİYARLAR",
                "blurb": "Evreni oluşturan diyarlar, katmanlar ve düzlemler.",
                "pages": [
                  {
                    "id": "giris",
                    "title": "GİRİŞ",
                    "mode": "text",
                    "body": "Bu bölümün açıklaması henüz yazılmadı. Buraya ilgili kuralların, tanımların ve örneklerin geleceği yer tutucu bir metindir.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.\n\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident."
                  }
                ]
              },
              {
                "id": "varliklar",
                "title": "VARLIKLAR",
                "blurb": "Evrende yaşayan akıllı ırklar, halklar ve varlıklar.",
                "pages": [
                  {
                    "id": "kadimler",
                    "title": "KADİMLER",
                    "mode": "rich",
                    "body": "Bu bölümün açıklaması henüz yazılmadı. Buraya ilgili kuralların, tanımların ve örneklerin geleceği yer tutucu bir metindir.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.\n\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
                    "blocks": [
                      {
                        "type": "tabs",
                        "tabs": [
                          {
                            "label": "UMAY",
                            "blocks": [
                              {
                                "type": "paragraph",
                                "text": "Umay, savaş sonrası dönemde varlığını sürdüren Kadimler arasında en yaşlısı ve en ağır hafıza taşıyıcısıdır. Diğer Kadimlerden farklı olarak yalnızca bir doğa, zaman, ışık ya da karanlık ilkesinin temsilcisi değildir; o, varlığın devam etme iradesini temsil eder.\n\nHalk anlatılarında Umay çoğu zaman ana, ata, ocak koruyucusu, soyların gözeticisi ve doğumun sessiz tanığı olarak bilinir. Fakat bu sade anlatı, Umay’ın gerçek doğasının yalnızca küçük bir parçasıdır. O yalnızca çocukları, aileleri ya da soyları koruyan bir Kadim değildir; daha derinde, yok oluştan sonra bile bir şeylerin devam etmesi gerektiği fikrinin cisimleşmiş hâlidir.\n\nBüyük Savaş’tan sonra Umay, diğer Kadimler gibi herhangi bir safın parçası olmamıştır. Artık ne Aydınlık’a, ne Karanlık’a, ne de Kaos’a bağlıdır. Onun yolu, bütün eski saflaşmaların ötesindedir: korumak, hatırlamak, taşımak ve sürdürmek.\n\nUmay farklı halklar, tarikatlar ve eski Kadim havarileri tarafından farklı adlarla anılır:\n"
                              },
                              {
                                "type": "list",
                                "ordered": false,
                                "items": [
                                  "Kadim Ana",
                                  "İlk Ana",
                                  "Yaşlı Kadim",
                                  "Soyların Gözcüsü",
                                  "Ocakların Sessiz Eli",
                                  "Köklerin Anası",
                                  "Gündüz’ün Anası",
                                  "Kalbi Yaslı Olan",
                                  "Yıkımdan Sonra Kalan",
                                  "Adını Unutmayan"
                                ]
                              },
                              {
                                "type": "paragraph",
                                "text": "Bu unvanlar arasında en ağır olanı Gündüz’ün Anasıdır. Çünkü Umay’ın savaş sonrası kimliği artık yalnızca yaratma ve koruma üzerinden değil, kaybetme ve buna rağmen korumaya devam etme üzerinden tanımlanır."
                              },
                              {
                                "type": "heading",
                                "level": 3,
                                "text": "TEMSİL ALANLARI"
                              },
                              {
                                "type": "table",
                                "header": [
                                  "ALAN",
                                  "AÇIKLAMA"
                                ],
                                "rows": [
                                  [
                                    "Doğum",
                                    "Yeni hayatın dünyaya gelişi, korunması ve kabul edilmesi."
                                  ],
                                  [
                                    "Soy",
                                    "Kan bağı, manevi bağ, aile hafızası ve kuşaklar arası aktarım."
                                  ],
                                  [
                                    "Ocak",
                                    "Ev, sığınak, aile yeri, yerleşiklik ve korunmuş alan."
                                  ],
                                  [
                                    "Kök",
                                    "Geçmişle bağ, aidiyet, gelenek ve unutulmayan hakikat."
                                  ],
                                  [
                                    "Yas",
                                    "Kaybın bastırılması değil, taşınabilir hâle getirilmesi."
                                  ],
                                  [
                                    "Devamlılık",
                                    "Her şey yıkıldıktan sonra bile yaşamın sürmesi."
                                  ],
                                  [
                                    "Koruma",
                                    "Zayıfı saklamak değil, onu hayatta kalabilecek hâle getirmek."
                                  ]
                                ]
                              },
                              {
                                "type": "callout",
                                "variant": "info",
                                "title": "",
                                "text": "Umay’ın koruyuculuğu pasif değildir. O, kırılgan olanı fanusun içine koymaz. Onun öğretisine göre gerçek koruma, bir varlığı dünyadan izole etmek değil, onu dünyanın ağırlığını taşıyabilecek hâle getirmektir.",
                                "style": {
                                  "css": "font-size: 10pt;"
                                }
                              },
                              {
                                "type": "heading",
                                "level": 2,
                                "text": "MİSYON"
                              },
                              {
                                "type": "paragraph",
                                "text": "Umay doğrudan dünyaya müdahale etmez. Savaş sonrası Kadimler düzeninde, hiçbir Kadim eski çağlardaki gibi dünyayı kendi eliyle biçimlendirme hakkına sahip değildir. Umay da bu ilkeye uyar. Ancak işaretler, rüyalar, havariler, kutsal ocaklar, eski yadigârlar ve soy hafızası aracılığıyla etkisini sürdürür.\n\nUmay’ın savaş sonrası misyonu üç ana hatta toplanır:"
                              },
                              {
                                "type": "heading",
                                "level": 3,
                                "text": "1. Kökleri Korumak"
                              },
                              {
                                "type": "paragraph",
                                "text": "Umay, savaşta ve Kadim iç savaşlarında kopan soyların, kaybolan ailelerin, unutulan halkların ve silinmiş isimlerin tamamen yok olmasına izin vermemeye çalışır. Bu görev yalnızca biyolojik soyla sınırlı değildir. Bir ustanın çırağı, bir köyün son tanığı, bir yıkımın kaydını tutan arşivci veya bir çocuğu kendi kanından olmadığı hâlde büyüten kişi de Umay’ın gözünde soy taşıyıcısı olabilir."
                              },
                              {
                                "type": "heading",
                                "level": 3,
                                "text": "2. Yasın Çürümesini Engellemek"
                              },
                              {
                                "type": "paragraph",
                                "text": "Umay’ın en tehlikeli gördüğü şeylerden biri, yasın kine dönüşmesidir. Çünkü kendi kızı Gündüz’ün öldürülmesi, Kadimler arasında kapanmayan bir yara açmıştır. Umay bu yarayı unutmaz; fakat onu bütün varlığı yutacak bir intikam ateşine de dönüştürmez.\n\nBu yüzden Umay’ın öğretisinde yas kutsaldır, ama sınırsız değildir. Yas hatırlatmalı, derinleştirmeli, ağırlaştırmalı; fakat yaşamı bütünüyle felç etmemelidir."
                              },
                              {
                                "type": "heading",
                                "level": 3,
                                "text": "3. Gelecek Kuşakları Hazırlamak"
                              },
                              {
                                "type": "paragraph",
                                "text": "Umay’ın koruması, karakterleri sürekli güvende tutmaz. Tam tersine, Umay’ın izinden gidenler çoğu zaman zor görevlerle sınanır. Çünkü Umay’a göre korunmaya değer olan her şey, bir gün kendisi de koruyucu olmayı öğrenmelidir.\n\nBu nedenle Umay’ın havarileri yalnızca sığınak kurmaz; eğitim verir, çocukları silah kullanmayı öğrenmeye zorlar, hafıza törenleri düzenler, şehirlerin soy kayıtlarını tutar ve savaş sonrasında dağılmış toplulukları yeniden örgütler."
                              },
                              {
                                "type": "heading",
                                "level": 3,
                                "text": "KARAKTER VE TUTUM"
                              },
                              {
                                "type": "paragraph",
                                "text": "Umay merhametlidir, fakat yumuşak değildir. Onun merhameti sıcak bir kucaklama kadar, ağır bir nasihat veya kaçınılmaz bir sınav şeklinde de gelebilir.\n\nUmay’ın öfkesi nadirdir. Fakat bir kez ortaya çıktığında diğer Kadimlerin bile dikkate aldığı türden bir ağırlık taşır. Çünkü Umay’ın öfkesi ani hiddetten değil, çok uzun süre bastırılmış hakikatten doğar."
                              },
                              {
                                "type": "heading",
                                "level": 2,
                                "text": "ÖĞRETİLER"
                              },
                              {
                                "type": "table",
                                "header": [
                                  "ÖĞRETİ",
                                  "ANLAMI"
                                ],
                                "rows": [
                                  [
                                    "Kökünü bilmeyen, gövdesini taşıyamaz.",
                                    "Her kişi, topluluk veya krallık neyin devamı olduğunu bilmelidir. Hafızasız güç, yıkıma açık güçtür."
                                  ],
                                  [
                                    "Koruma, saklamak değildir.",
                                    "Bir çocuğu, halkı veya emaneti korumak; onu her tehlikeden uzak tutmak anlamına gelmez. Gerçek koruma, zamanı geldiğinde onun kendi ayakları üzerinde durmasını sağlamaktır."
                                  ],
                                  [
                                    "Ölülerin adı ikinci kez öldürülmemelidir.",
                                    "Umay’ın inancında unutulmak ikinci ölümdür. Bu yüzden ad anma, soy kaydı, mezar taşı, ağıt, hikâye ve aile yadigârı kutsal kabul edilir."
                                  ],
                                  [
                                    "Yas taşınır; hükmetmesine izin verilmez.",
                                    "Yas, geçmişle bağ kurmanın doğal yoludur. Fakat yas intikama, intikam da yeni felaketlere dönüşürse kutsallığını kaybeder."
                                  ],
                                  [
                                    "Her emanet bir gün devredilmelidir.",
                                    "Hiçbir koruyucu sonsuza kadar koruyucu kalamaz. Umay’ın yolunda en önemli anlardan biri, korunan kişinin artık başkasını koruyabilecek hâle gelmesidir."
                                  ]
                                ]
                              }
                            ]
                          }
                        ]
                      }
                    ],
                    "infobox": {
                      "image": "",
                      "entries": []
                    },
                    "tags": [],
                    "related": [],
                    "creatures": [],
                    "table": {
                      "columns": [
                        {
                          "id": "isim",
                          "label": "İSİM",
                          "type": "text",
                          "showInTable": true
                        }
                      ],
                      "rows": []
                    }
                  }
                ]
              },
              {
                "id": "yaratiklar",
                "title": "YARATIKLAR",
                "blurb": "Vahşi yaratıklar ve canavarlardan oluşan bestiyer.",
                "pages": [
                  {
                    "id": "giris",
                    "title": "BESTİYER",
                    "mode": "creature-list",
                    "creatures": []
                  }
                ]
              },
              {
                "id": "genel-ekonomi",
                "title": "GENEL EKONOMİ",
                "blurb": "",
                "pages": [
                  {
                    "id": "ekonomi-ecosystem",
                    "title": "EKONOMİ EKOSİSTEMİ",
                    "body": "",
                    "mode": "rich",
                    "blocks": [
                      {
                        "type": "heading",
                        "level": 2,
                        "text": "GENEL EKONOMİ EKOSİSTEMİ"
                      },
                      {
                        "type": "table",
                        "header": [
                          "BİRİM",
                          "DENKLİĞİ",
                          "KULLANIM ALANI"
                        ],
                        "rows": [
                          [
                            "Bakır",
                            "1 Bakır",
                            "Günlük küçük harcamalar"
                          ],
                          [
                            "Gümüş",
                            "10 Bakır",
                            "Halkın ana alışveriş birimi"
                          ],
                          [
                            "Altın",
                            "10 Gümüş / 100 Bakır",
                            "Büyük Ödemeler, lonca işleri, silah-zırh-kira-ticaret"
                          ]
                        ]
                      },
                      {
                        "type": "heading",
                        "level": 3,
                        "text": "PARA BİRİMLERİNİN SOSYAL KARŞILIĞI"
                      },
                      {
                        "type": "paragraph",
                        "text": "Ekonominin hissini belirleyen asıl şey dönüşüm oranı değil, bu paraların dünyada ne kadar “ağır” hissettirdiğidir. **Bakır**, sıradan insanların günlük küçük ihtiyaçları için kullandığı paradır."
                      },
                      {
                        "type": "table",
                        "header": [
                          "HARCAMA",
                          "ORTALAMA DEĞER"
                        ],
                        "rows": [
                          [
                            "Bir parça ekmek",
                            "1-2 Bakır"
                          ],
                          [
                            "Bir kupa bayağı bira",
                            "2-4 Bakır"
                          ],
                          [
                            "Pazarda küçük meyve sebze alımı",
                            "2-5 Bakır"
                          ],
                          [
                            "Ucuz yatakhane yatağı",
                            "4-6 Bakır"
                          ]
                        ]
                      },
                      {
                        "type": "heading",
                        "level": 3,
                        "text": "GÜMÜŞ: GERÇEK ALIŞVERİŞ BİRİMİ"
                      },
                      {
                        "type": "paragraph",
                        "text": "Gümüş, halkın asıl ticaret parasıdır. Günlük yemek, işçilik, basit hizmetler, küçük ekipmanlar gümüşle döner."
                      },
                      {
                        "type": "table",
                        "header": [
                          "HARCAMA",
                          "ORTALAMA DEĞER"
                        ],
                        "rows": [
                          [
                            "Basit sıcak yemek",
                            "1 Gümüş"
                          ],
                          [
                            "Doyurucu han yemeği",
                            "2-3 Gümüş"
                          ],
                          [
                            "Basit bıçak / Gündelik alet",
                            "2-5 Gümüş"
                          ],
                          [
                            "Ucuz han odası",
                            "2-4 Gümüş"
                          ]
                        ]
                      },
                      {
                        "type": "heading",
                        "level": 3,
                        "text": "ALTIN: CİDDİ PARA"
                      },
                      {
                        "type": "paragraph",
                        "text": "Altın, sıradan halkın her gün cebinde taşıdığı bir para birimi değildir. Altın; tüccarların, loncaların, askerî ödemelerin, soyluların ve maceracıların para birimi olarak yerini almaktadır."
                      },
                      {
                        "type": "table",
                        "header": [
                          "HARCAMA",
                          "ORTALAMA DEĞER"
                        ],
                        "rows": [
                          [
                            "Handa tek kişilik iyi bir oda",
                            "1 Altın"
                          ],
                          [
                            "Basit silah",
                            "1-5 Altın"
                          ],
                          [
                            "Kaliteli Silah",
                            "5-15 Altın"
                          ],
                          [
                            "Hafif Zırh",
                            "5-20 Altın"
                          ],
                          [
                            "Hafif-Orta Zırh",
                            "20-40 Altın"
                          ],
                          [
                            "Eğitimli binek hayvanı",
                            "20-80 Altın"
                          ],
                          [
                            "Küçük dükkan aylık kirası",
                            "10-30 altın"
                          ]
                        ]
                      },
                      {
                        "type": "heading",
                        "level": 2,
                        "text": "EKONOMİK YAŞAM KALİTELERİ"
                      },
                      {
                        "type": "table",
                        "header": [
                          "YAŞAM DÜZEYİ",
                          "GÜNLÜK MASRAF",
                          "AÇIKLAMA"
                        ],
                        "rows": [
                          [
                            "Sefil",
                            "5-10 Bakır",
                            "Açlık sınırı, sokak, dilencilik"
                          ],
                          [
                            "Yoksul",
                            "1-2 Gümüş",
                            "Ekmek, çorba, ortak yatakhane"
                          ],
                          [
                            "Mütevazı",
                            "3-5 Gümüş",
                            "Basit ama düzenli yaşam"
                          ],
                          [
                            "Rahat",
                            "1 Altın",
                            "İyi yemek, özel oda, temiz hizmet"
                          ],
                          [
                            "Varlıklı",
                            "3-5 Altın",
                            "Hizmetâr, kaliteli konaklama"
                          ],
                          [
                            "Soylu / Tüccar",
                            "10+ Altın",
                            "Gösterişli yaşam"
                          ]
                        ]
                      },
                      {
                        "type": "heading",
                        "level": 2,
                        "text": "MACERACI EKONOMİSİ"
                      },
                      {
                        "type": "paragraph",
                        "text": "Maceracılar ve paralı askerler gibi işleri tehlike içinde geçen mesleklerin çoğu, atıldıkları tehlikenin karşılığı olarak doğru orantılı ödemeler alabilmektedir. Ancak alınacak ödüller, görev türünden başlayarak maceracının görevdeki performansı, ödeme yapan kişinin davranışı, ücretlendirmeyi etkileyen farklı faktörler vb. etkenlerle değişebilmektedir. Ancak genel olarak şöyle bir liste oluşturulabilir:"
                      },
                      {
                        "type": "table",
                        "header": [
                          "GÖREV TİPİ",
                          "ÖDÜL"
                        ],
                        "rows": [
                          [
                            "Kayıp Eşya / Küçük Arama",
                            "3-10 Gümüş"
                          ],
                          [
                            "Hayvan Kovma / Basit Koruma",
                            "1-3 Altın"
                          ],
                          [
                            "Kervan Refakati",
                            "5-20 Altın"
                          ],
                          [
                            "Tehlikeli Yaratık Avı",
                            "10-50 Altın"
                          ],
                          [
                            "Sınır Bölgesi Keşfi",
                            "25-100 Altın"
                          ],
                          [
                            "Kadim Kalıntı / Tesir noktası görevleri",
                            "100+ Altın veya özel ödemeler"
                          ]
                        ]
                      }
                    ]
                  },
                  {
                    "id": "yasam-ekonomisi",
                    "title": "YAŞAM EKONOMİSİ",
                    "body": "",
                    "mode": "rich",
                    "table": {
                      "columns": [
                        {
                          "id": "isim",
                          "label": "İSİM",
                          "type": "text",
                          "showInTable": true
                        }
                      ],
                      "rows": []
                    },
                    "blocks": [
                      {
                        "type": "tabs",
                        "tabs": [
                          {
                            "label": "BESİNLER",
                            "blocks": [
                              {
                                "type": "table",
                                "header": [
                                  "YEMEK",
                                  "FİYAT"
                                ],
                                "rows": [
                                  [
                                    "EKMEK+ÇORBA",
                                    "5 BAKIR"
                                  ],
                                  [
                                    "BASİT SICAK YEMEK",
                                    "1 GÜMÜŞ"
                                  ],
                                  [
                                    "DOYURUCU HAN YEMEĞİ",
                                    "2 GÜMÜŞ"
                                  ],
                                  [
                                    "ETLİ YEMEK",
                                    "3 GÜMÜŞ"
                                  ],
                                  [
                                    "İYİ HAZIRLANMIŞ ETLİ YEMEK",
                                    "5 GÜMÜŞ"
                                  ],
                                  [
                                    "BALIK YEMEĞİ",
                                    "2-4 GÜMÜŞ"
                                  ],
                                  [
                                    "AV ETİ / ÖZEL TABAK",
                                    "5-8 GÜMÜŞ"
                                  ],
                                  [
                                    "BÜYÜK SOFRA, KİŞİ BAŞI",
                                    "1 ALTIN"
                                  ],
                                  [
                                    "SOYLU SOFRASI, KİŞİ BAŞI",
                                    "3 ALTIN"
                                  ]
                                ]
                              }
                            ]
                          },
                          {
                            "label": "İÇECEKLER",
                            "blocks": [
                              {
                                "type": "table",
                                "header": [
                                  "İÇECEK",
                                  "FİYAT"
                                ],
                                "rows": [
                                  [
                                    "TEMİZ KUYU SUYU/ MATARA DOLUMU",
                                    "1 BAKIR"
                                  ],
                                  [
                                    "KAYNATILMIŞ GÜVENLİ SU",
                                    "2 BAKIR"
                                  ],
                                  [
                                    "AYRAN/EKŞİ SÜT/HAFİF İÇECEK",
                                    "2-3 BAKIR"
                                  ],
                                  [
                                    "BAYAĞI BİRA",
                                    "4 BAKIR"
                                  ],
                                  [
                                    "NORMAL BİRA, 0.5L",
                                    "1 GÜMÜŞ"
                                  ],
                                  [
                                    "SERT BİRA, KOYU BİRA",
                                    "2 GÜMÜŞ"
                                  ],
                                  [
                                    "BASİT ŞARAP KADEHİ",
                                    "2 GÜMÜŞ"
                                  ],
                                  [
                                    "İYİ ŞARAP KADEHİ",
                                    "5 GÜMÜŞ"
                                  ],
                                  [
                                    "ŞİŞE ŞARAP",
                                    "1 ALTIN"
                                  ],
                                  [
                                    "KALİTELİ ŞİŞE ŞARAP",
                                    "3 ALTIN+"
                                  ],
                                  [
                                    "NADİR İÇKİ",
                                    "5 ALTIN+"
                                  ]
                                ]
                              }
                            ]
                          },
                          {
                            "label": "YOL ERZAKLARI",
                            "blocks": [
                              {
                                "type": "table",
                                "header": [
                                  "ERZAK",
                                  "FİYAT",
                                  "AÇIKLAMA"
                                ],
                                "rows": [
                                  [
                                    "1 GÜNLÜK KÖTÜ ERZAK",
                                    "5 BAKIR",
                                    "KARIN DOYURUR AMA UZUN YOLDA MORAL BOZAR"
                                  ],
                                  [
                                    "1 GÜNLÜK BASİT ERZAK",
                                    "1 GÜMÜŞ",
                                    "STANDART YOLCU MALZEMESİ"
                                  ],
                                  [
                                    "1 GÜNLÜK DÜZGÜN YOL ERZAĞI",
                                    "2 GÜMÜŞ",
                                    "DAHA DAYANIKLI, BESLEYİCİ"
                                  ],
                                  [
                                    "1 HAFTALIK BASİT ERZAK",
                                    "5 GÜMÜŞ",
                                    "STANDART YOLCU MALZEMESİ"
                                  ],
                                  [
                                    "1 HAFTALIK KALİTELİ ERZAK",
                                    "1 ALTIN",
                                    "DAHA DAYANIKLI, BESLEYİCİ"
                                  ],
                                  [
                                    "1 HAFTALIK ASKERİ/KERVAN ERZAĞI",
                                    "2 ALTIN",
                                    "UZUN YOL İÇİN HAZIRLANMIŞ ERZAK"
                                  ]
                                ]
                              }
                            ]
                          },
                          {
                            "label": "KONAKLAMA ",
                            "blocks": [
                              {
                                "type": "table",
                                "header": [
                                  "KONAKLAMA",
                                  "FİYAT",
                                  "AÇIKLAMA"
                                ],
                                "rows": [
                                  [
                                    "AHIR KÖŞESİ",
                                    "2 BAKIR",
                                    "HAYVANLARLA AYNI YERDE"
                                  ],
                                  [
                                    "HAN ORTAK ZEMİNİ",
                                    "4-5 BAKIR",
                                    "KALABALIK"
                                  ],
                                  [
                                    "ORTAK YATAKHANE",
                                    "1 GÜMÜŞ",
                                    "YOLCULAR, İŞÇİLER, ÇIRAKLAR"
                                  ],
                                  [
                                    "UCUZ ODA",
                                    "2-3 GÜMÜŞ",
                                    "KÜÇÜK TEK KİŞİLİK ODA"
                                  ],
                                  [
                                    "STANDART ODA",
                                    "5 GÜMÜŞ",
                                    "TEMİZ YATAK, KAPI, TEMEL GÜVENLİK"
                                  ],
                                  [
                                    "İYİ ODA",
                                    "1 ALTIN",
                                    "ÖZEL ODA, SICAK YEMEK DAHİL OLABİLİR"
                                  ],
                                  [
                                    "KALİTELİ ODA",
                                    "3 ALTIN",
                                    "TEMİZ ÇARŞAF, BANYO, HİZMET"
                                  ],
                                  [
                                    "SOYLU SÜİTİ",
                                    "10 ALTIN+",
                                    "GENİŞ ODA, ÖZEL HİZMET, GÜVENLİK"
                                  ]
                                ]
                              }
                            ]
                          },
                          {
                            "label": "HAN PAKETLERİ",
                            "blocks": [
                              {
                                "type": "table",
                                "header": [
                                  "PAKET ADI",
                                  "İÇERİK",
                                  "FİYAT"
                                ],
                                "rows": [
                                  [
                                    "UCUZ HAN PAKETİ",
                                    "ORTAK YATAKHANE, BASİT ÇORBA, SU VE ZAYIF İÇECEK",
                                    "1 GÜMÜŞ/GÜN"
                                  ],
                                  [
                                    "YOLCU PAKETİ",
                                    "BASİT ODA VEYA İYİ YATAKHANE, 2 BASİT ÖĞÜN, NORMAL İÇECEK",
                                    "3 GÜMÜŞ/GÜN"
                                  ],
                                  [
                                    "STANDART MACERACI PAKETİ",
                                    "STANDART ODA, DOYURUCU YEMEK, BİRA/İÇECEK, EŞYALAR İÇİN MAKUL GÜVENLİK",
                                    "5 GÜMÜŞ/GÜN"
                                  ],
                                  [
                                    "RAHAT MACERACI PAKETİ",
                                    "ÖZEL ODA, İYİ YEMEK, TEMİZLENME İMKÂNI, EŞYA GÜVENLİĞİ",
                                    "1 ALTIN/GÜN"
                                  ],
                                  [
                                    "VARLIKLI PAKET",
                                    "KALİTELİ ODA, BANYO, İYİ İÇKİ, HİZMET, GÜVENLİK, TÜCCAR/LONCA ÇEVRELERİNE ERİŞİM",
                                    "3+ ALTIN/GÜN"
                                  ]
                                ]
                              }
                            ]
                          },
                          {
                            "label": "HAYVAN VE BİNEK KONAKLAMASI",
                            "blocks": [
                              {
                                "type": "table",
                                "header": [
                                  "HİZMET",
                                  "FİYAT"
                                ],
                                "rows": [
                                  [
                                    "HAYVANI DIŞARI BAĞLAMA",
                                    "ÜCRETSİZ-1 BAKIR"
                                  ],
                                  [
                                    "AHIRDA YER",
                                    "3 BAKIR"
                                  ],
                                  [
                                    "YEM+SU",
                                    "5 BAKIR"
                                  ],
                                  [
                                    "BİNEK İÇİN TAM BAKIM",
                                    "1 GÜMÜŞ"
                                  ],
                                  [
                                    "DEĞERLİ BİNEK İÇİN GÜVENLİ AHIR",
                                    "3 GÜMÜŞ"
                                  ],
                                  [
                                    "EGZOTİK BİNEK BAKIMI",
                                    "1+ ALTIN"
                                  ]
                                ]
                              }
                            ]
                          }
                        ]
                      },
                      {
                        "type": "heading",
                        "level": 3,
                        "text": "ŞEHİR TİPİNE GÖRE FİYAT ÇARPANLARI"
                      },
                      {
                        "type": "table",
                        "header": [
                          "BÖLGE TİPİ",
                          "ÇARPAN",
                          "AÇIKLAMA"
                        ],
                        "rows": [
                          [
                            "Köy",
                            "x0.5",
                            "Yemek ucuz, konaklama basit"
                          ],
                          [
                            "Normal Kasaba",
                            "x1",
                            "Standart Fiyat"
                          ],
                          [
                            "Büyük Şehir",
                            "x1.5",
                            "Kira ve hizmet pahalı"
                          ],
                          [
                            "Başkent / Zengin merkez",
                            "x2",
                            "Kalite yüksek, fiyat yüksek"
                          ],
                          [
                            "Sınır Yerleşimi",
                            "x2",
                            "Malzeme az, tehlike fazla"
                          ],
                          [
                            "Kuşatma / Kıtlık",
                            "x3-x5",
                            "Fiyatlar Bozulur"
                          ]
                        ]
                      },
                      {
                        "type": "heading",
                        "level": 3,
                        "text": "ORTALAMA SOSYAL TABAKA GELİRLERİ"
                      },
                      {
                        "type": "table",
                        "header": [
                          "KİŞİ / MESLEK",
                          "GÜNLÜK GELİR"
                        ],
                        "rows": [
                          [
                            "Dilenci",
                            "1-5 Bakır"
                          ],
                          [
                            "Tarla İşçisi",
                            "1-2 Gümüş"
                          ],
                          [
                            "Hamal",
                            "2-3 Gümüş"
                          ],
                          [
                            "Hizmetçi",
                            "2-4 Gümüş"
                          ],
                          [
                            "Çırak Zanaatkâr",
                            "2-5 Gümüş"
                          ],
                          [
                            "Usta Zanaatkâr",
                            "5 Gümüş - 1 Altın"
                          ],
                          [
                            "Sıradan Asker",
                            "3-6 Gümüş"
                          ],
                          [
                            "Deneyimli Muhafız",
                            "1 Altın"
                          ],
                          [
                            "Kervan Koruması",
                            "1-3 Altın"
                          ],
                          [
                            "Lonca Uzmanı",
                            "3-10 Altın"
                          ],
                          [
                            "Soylu Hizmetlisi",
                            "5 Gümüş - 2 Altın"
                          ],
                          [
                            "Küçük Tüccar",
                            "1-5 Altın"
                          ],
                          [
                            "Büyük Tüccar",
                            "10+ Altın"
                          ]
                        ]
                      }
                    ]
                  },
                  {
                    "id": "yolculuk-lojistik",
                    "title": "YOLCULUK-LOJİSTİK",
                    "body": "",
                    "mode": "rich",
                    "blocks": [
                      {
                        "type": "heading",
                        "level": 3,
                        "text": "TEMEL YOL BİRİMİ"
                      },
                      {
                        "type": "table",
                        "header": [
                          "YOLCULUK BİÇİMİ",
                          "GÜNLÜK MESAFE",
                          "AÇIKLAMA"
                        ],
                        "rows": [
                          [
                            "Yaya, Yavaş/güvenli",
                            "15-20km",
                            "Yaralı, yükl, tehlikeli arazi"
                          ],
                          [
                            "Yaya, Normal",
                            "25-30km",
                            "Standart maceracı yürüyüşü"
                          ],
                          [
                            "Yaya, hızlı",
                            "35-40km ",
                            "Yorucu, soluk/dayanıklılık baskısı yaratır"
                          ],
                          [
                            "Binekli, normal",
                            "40-50km",
                            "At, deve, iri binek"
                          ],
                          [
                            "Binekli, hızlı",
                            "60-70km",
                            "Hayvan yıpranır, bakım gerekir"
                          ],
                          [
                            "Yük arabası",
                            "20-30km",
                            "Mal ve yolcu taşıma"
                          ],
                          [
                            "Kervan",
                            "15-25km",
                            "Güvenli ama yavaş"
                          ],
                          [
                            "Nehir teknesi",
                            "40-80km",
                            "Akıntıya göre değişken"
                          ],
                          [
                            "Deniz/kıyı gemisi",
                            "80-150km",
                            "Hava ve rota belirleyici"
                          ]
                        ]
                      },
                      {
                        "type": "tabs",
                        "tabs": [
                          {
                            "label": "ERZAK VE YOL MALZEMELERİ",
                            "blocks": [
                              {
                                "type": "table",
                                "header": [
                                  "ERSAK",
                                  "FİYAT",
                                  "KULLANIM"
                                ],
                                "rows": [
                                  [
                                    "1 günlük kötü erzak",
                                    "5 Bakır",
                                    "Aç bırakmaz, moral düşürür"
                                  ],
                                  [
                                    "1 günlük basit erzak",
                                    "1 Gümüş",
                                    "Standart yolcu erzağı"
                                  ],
                                  [
                                    "1 günlük kaliteli erzak",
                                    "2 Gümüş",
                                    "Daha besleyici, uzun yürüyüşe uygun"
                                  ],
                                  [
                                    "1 haftalık basit erzak",
                                    "5 Gümüş",
                                    "Yaya yolculuk standardı"
                                  ],
                                  [
                                    "1 haftalık kaliteli erzak",
                                    "1 Altın",
                                    "Maceracı standardı"
                                  ],
                                  [
                                    "1 haftalık askerî/kervan erzağı",
                                    "2 Altın",
                                    "Zorlu rota, nöbet, keşif"
                                  ]
                                ]
                              }
                            ]
                          },
                          {
                            "label": "BİNEK HAYVAN MASRAFLARI",
                            "blocks": [
                              {
                                "type": "table",
                                "header": [
                                  "HİZMET",
                                  "FİYAT"
                                ],
                                "rows": [
                                  [
                                    "Sadece su",
                                    "1 Bakır"
                                  ],
                                  [
                                    "Basit yem",
                                    "3 Bakır"
                                  ],
                                  [
                                    "Yem + su",
                                    "5 Bakır"
                                  ],
                                  [
                                    "Normal binek bakımı",
                                    "1 Gümüş"
                                  ],
                                  [
                                    "Değerli binek bakımı",
                                    "3 Gümüş"
                                  ],
                                  [
                                    "Savaş bineği bakımı",
                                    "5 Gümüş"
                                  ],
                                  [
                                    "Egzotik binek bakımı",
                                    "1+ altın"
                                  ]
                                ]
                              }
                            ]
                          },
                          {
                            "label": "BİNEK KİRALAMA",
                            "blocks": [
                              {
                                "type": "table",
                                "header": [
                                  "BİNEK",
                                  "GÜNLÜK KİRA",
                                  "DEPOZİTO"
                                ],
                                "rows": [
                                  [
                                    "Katır/Eşek",
                                    "2 Gümüş",
                                    "1 Altın"
                                  ],
                                  [
                                    "Sıradan At",
                                    "5 Gümüş",
                                    "5 Altın"
                                  ],
                                  [
                                    "Hızlı At",
                                    "1 Altın",
                                    "10 Altın"
                                  ],
                                  [
                                    "Dayanıklı Yol Atı",
                                    "1 Altın",
                                    "15 Altın"
                                  ],
                                  [
                                    "Savaş Atı",
                                    "3 Altın",
                                    "30 Altın"
                                  ],
                                  [
                                    "Deve / Çöl Bineği",
                                    "1 Altın",
                                    "10 Altın"
                                  ],
                                  [
                                    "Kızak Hayvanı",
                                    "5 Gümüş - 1 Altın",
                                    "5 - 10 Altın"
                                  ],
                                  [
                                    "Egzotik Binek",
                                    "5+ Altın",
                                    "50+ Altın"
                                  ]
                                ]
                              }
                            ]
                          },
                          {
                            "label": "BİNEK FİYATLARI",
                            "blocks": [
                              {
                                "type": "table",
                                "header": [
                                  "BİNEK",
                                  "FİYAT"
                                ],
                                "rows": [
                                  [
                                    "Eşek",
                                    "5 Altın"
                                  ],
                                  [
                                    "Katır",
                                    "10 Altın"
                                  ],
                                  [
                                    "Sıradan At",
                                    "25 Altın"
                                  ],
                                  [
                                    "Dayanıklı Yol Atı",
                                    "40 Altın"
                                  ],
                                  [
                                    "Hızlı At",
                                    "60 Altın"
                                  ],
                                  [
                                    "Savaş Atı",
                                    "150 Altın"
                                  ],
                                  [
                                    "Deve / Çöl Bineği",
                                    "50 Altın"
                                  ],
                                  [
                                    "Eğitimli Savaş Bineği",
                                    "250+ Altın"
                                  ],
                                  [
                                    "Egzotik Binek",
                                    "500+ veya para dışı bedel"
                                  ]
                                ]
                              }
                            ]
                          },
                          {
                            "label": "ARAÇ VE TAŞIMA",
                            "blocks": [
                              {
                                "type": "table",
                                "header": [
                                  "ARAÇ",
                                  "GÜNLÜK KİRA",
                                  "SATIN ALMA",
                                  "AÇIKLAMA"
                                ],
                                "rows": [
                                  [
                                    "El Arabası",
                                    "5 Bakır",
                                    "1 Altın",
                                    "Şehir/Pazar içi"
                                  ],
                                  [
                                    "Küçük Yük Arabası",
                                    "2 Gümüş",
                                    "5 Altın",
                                    "Bir Hayvan Çeker"
                                  ],
                                  [
                                    "Yolcu Arabası",
                                    "5 Gümüş",
                                    "15 Altın",
                                    "2-4 Yolcu"
                                  ],
                                  [
                                    "Büyük Yük Arabası",
                                    "1 Altın",
                                    "40 Altın",
                                    "Kervan Malı"
                                  ],
                                  [
                                    "Kapalı Yolcu Arabası",
                                    "2 Altın",
                                    "80 Altın",
                                    "Rahat ve Güvenli"
                                  ],
                                  [
                                    "Zırhlı / Korumalı Araba",
                                    "5+ Altın",
                                    "200+ Altın",
                                    "Askerî / Lonca kullanımı"
                                  ],
                                  [
                                    "Kızak",
                                    "5 Gümüş - 1 Altın",
                                    "20 Altın",
                                    "Kar, Buz, Çöl kızağı varyantı"
                                  ]
                                ]
                              }
                            ]
                          },
                          {
                            "label": "YOLCU TAŞIMA",
                            "blocks": [
                              {
                                "type": "table",
                                "header": [
                                  "HİZMET",
                                  "FİYAT"
                                ],
                                "rows": [
                                  [
                                    "Köyler arası kısa yolculuk",
                                    "2-5 Gümüş"
                                  ],
                                  [
                                    "Kasabalar arası yolcu arabası",
                                    "1 Altın"
                                  ],
                                  [
                                    "Büyük şehirler arası ortak araba",
                                    "3-5 Altın"
                                  ],
                                  [
                                    "Özel araba kiralama, günlük",
                                    "5 Altın"
                                  ],
                                  [
                                    "Soylu/varlıklı kapalı araba, günlük",
                                    "10+ Altın"
                                  ],
                                  [
                                    "Tehlikeli rota yolcu ücreti",
                                    "x2-x5"
                                  ]
                                ]
                              }
                            ]
                          },
                          {
                            "label": "KERVAN SİSTEMİ",
                            "blocks": [
                              {
                                "type": "table",
                                "header": [
                                  "KATILIM TİPİ",
                                  "GÜNLÜK FİYAT",
                                  "AÇIKLAMA"
                                ],
                                "rows": [
                                  [
                                    "Yaya eşlikçi",
                                    "1 Gümüş",
                                    "Kervanla yürür, koruma beklemez"
                                  ],
                                  [
                                    "Sıradan yolcu",
                                    "3 Gümüş",
                                    "Güvenlikten faydalanır"
                                  ],
                                  [
                                    "Arabada yolcu",
                                    "1 Altın",
                                    "Daha rahat"
                                  ],
                                  [
                                    "Kapalı arabada yolcu",
                                    "3 Altın",
                                    "Varlıklı yolcu"
                                  ],
                                  [
                                    "Gizli/özel yolcu",
                                    "10+ Altın",
                                    "Kimlik saklama, özel güvenlik"
                                  ]
                                ]
                              },
                              {
                                "type": "heading",
                                "level": 3,
                                "text": "KERVANA KORUMA OLARAK KATILMAK"
                              },
                              {
                                "type": "table",
                                "header": [
                                  "KORUMA SEVİYESİ",
                                  "GÜNLÜK ÜCRET"
                                ],
                                "rows": [
                                  [
                                    "Acemi koruma",
                                    "5 Gümüş"
                                  ],
                                  [
                                    "Sıradan koruma",
                                    "1 Altın"
                                  ],
                                  [
                                    "Deneyimli koruma",
                                    "3 Altın"
                                  ],
                                  [
                                    "Canavar tehlikesi olan rota",
                                    "5-10 Altın"
                                  ],
                                  [
                                    "Sınır bölgesi / harabe rota",
                                    "10-25 Altın"
                                  ],
                                  [
                                    "Tesir bölgesi yakınları",
                                    "25+ Altın veya özel ödeme"
                                  ]
                                ]
                              }
                            ]
                          },
                          {
                            "label": "YÜK TAŞIMA",
                            "blocks": [
                              {
                                "type": "table",
                                "header": [
                                  "YÜK SINIFI",
                                  "ÖRNEK",
                                  "GÜNLÜK ÜCRET"
                                ],
                                "rows": [
                                  [
                                    "Hafif",
                                    "Sandık, kişisel eşya",
                                    "1 Gümüş"
                                  ],
                                  [
                                    "Orta",
                                    "Ticari mal, silah sandığı",
                                    "5 Gümüş"
                                  ],
                                  [
                                    "Ağır",
                                    "Varıl, maden, tahıl çuvalı",
                                    "1 Altın"
                                  ],
                                  [
                                    "Değerli ",
                                    "Mücevher, evrak, nadir maden",
                                    "3+ Altın"
                                  ],
                                  [
                                    "Tehlikeli",
                                    "Lanetli eşya, yaratık kalıntısı",
                                    "10+ Altın"
                                  ]
                                ]
                              }
                            ]
                          },
                          {
                            "label": "GEÇİŞ ÜCRETLERİ",
                            "blocks": [
                              {
                                "type": "table",
                                "header": [
                                  "ÖDEME TÜRÜ",
                                  "FİYAT"
                                ],
                                "rows": [
                                  [
                                    "Köprü Geçişi",
                                    "1-5 Bakır"
                                  ],
                                  [
                                    "Şehir Kapısı Giriş Ücreti",
                                    "1 Gümüş"
                                  ],
                                  [
                                    "Pazar Malı Giriş Vergisi",
                                    "1-5 Gümüş"
                                  ],
                                  [
                                    "Hayvan Başı Geçiş Ücreti",
                                    "5 Bakır - 1 Gümüş"
                                  ],
                                  [
                                    "Araba Geçiş Ücreti",
                                    "1-3 Gümüş"
                                  ],
                                  [
                                    "Kervan Geçiş Vergisi",
                                    "1-10 Altın"
                                  ],
                                  [
                                    "Sınır Karakolu Geçiş İzni",
                                    "5+ Altın"
                                  ],
                                  [
                                    "Kaçak Geçiş Rüşveti",
                                    "1-20 Altın"
                                  ]
                                ]
                              }
                            ]
                          },
                          {
                            "label": "REHBER, İZCİ, YOL BİLGİSİ",
                            "blocks": [
                              {
                                "type": "table",
                                "header": [
                                  "HİZMET",
                                  "GÜNLÜK FİYAT",
                                  "AÇIKLAMA"
                                ],
                                "rows": [
                                  [
                                    "Yerel Rehber",
                                    "5 Gümüş",
                                    "Köy, orman, yakın rota"
                                  ],
                                  [
                                    "Deneyimli Yol Rehberi",
                                    "1 Altın",
                                    "Uzun Yol"
                                  ],
                                  [
                                    "Dağ Rehberi",
                                    "2 Altın",
                                    "Zorlu Arazi"
                                  ],
                                  [
                                    "Harabe Rehberi",
                                    "5 Altın",
                                    "Riskli, nadir bulunur"
                                  ],
                                  [
                                    "Sınır İzcisi",
                                    "5-10 Altın",
                                    "Tehlikeli Bölgeler"
                                  ],
                                  [
                                    "Tesir bölgesi bilen rehber",
                                    "25+ Altın",
                                    "Para dışında da bedel isteyebilir"
                                  ]
                                ]
                              }
                            ]
                          },
                          {
                            "label": "KORUMA VE MUHAFIZ ÜCRETLERİ",
                            "blocks": [
                              {
                                "type": "table",
                                "header": [
                                  "KORUMA TİPİ",
                                  "GÜNLÜK ÜCRET"
                                ],
                                "rows": [
                                  [
                                    "Sıradan sopa taşıyan koruma",
                                    "5 Gümüş"
                                  ],
                                  [
                                    "Silahlı Muhafız",
                                    "1 Altın"
                                  ],
                                  [
                                    "Deneyimli Muhafız",
                                    "3 Altın"
                                  ],
                                  [
                                    "Eski Asker",
                                    "5 Altın"
                                  ],
                                  [
                                    "Lonca Lisanslı Koruma",
                                    "10 Altın"
                                  ],
                                  [
                                    "Canavar Avcısı",
                                    "25+ Altın"
                                  ]
                                ]
                              }
                            ]
                          },
                          {
                            "label": "DENİZ VE NEHİR TAŞIMACILIĞI",
                            "blocks": [
                              {
                                "type": "heading",
                                "level": 3,
                                "text": "NEHİR YOLCULUĞU"
                              },
                              {
                                "type": "table",
                                "header": [
                                  "HİZMET",
                                  "FİYAT"
                                ],
                                "rows": [
                                  [
                                    "Kısa nehir geçisi",
                                    "5 Bakır - 1 Gümüş"
                                  ],
                                  [
                                    "Sal / küçük tekneyle geçiş",
                                    "1 Gümüş"
                                  ],
                                  [
                                    "Nehir teknesi yolculuğu, günlük",
                                    "3 Gümüş"
                                  ],
                                  [
                                    "Nehir yük yaşıma, 100kg/gün",
                                    "5 Bakır - 1 Gümüş"
                                  ],
                                  [
                                    "Akıntıya ters yolculuk",
                                    "x2"
                                  ],
                                  [
                                    "Tehlikeli nehir hattı",
                                    "x3"
                                  ]
                                ]
                              },
                              {
                                "type": "heading",
                                "level": 3,
                                "text": "DENİZ / KIYI YOLCULUĞU"
                              },
                              {
                                "type": "table",
                                "header": [
                                  "HİZMET",
                                  "FİYAT"
                                ],
                                "rows": [
                                  [
                                    "Kısa kıyı geçişi",
                                    "1 Altın"
                                  ],
                                  [
                                    "Şehirler arası gemi yolculuğu",
                                    "5-20 Altın"
                                  ],
                                  [
                                    "Güvertede yolcu",
                                    "3 Altın"
                                  ],
                                  [
                                    "Ortak kamarada yolcu",
                                    "10 Altın"
                                  ],
                                  [
                                    "Özel kamarada yolcu",
                                    "30+ Altın"
                                  ],
                                  [
                                    "100kg yük taşıma",
                                    "1 - 5 Altın"
                                  ],
                                  [
                                    "Tehlikeli rota",
                                    "x2 - x5"
                                  ]
                                ]
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "id": "ekipman-ekonomisi",
                    "title": "EKİPMAN EKONOMİSİ",
                    "body": "",
                    "mode": "rich",
                    "blocks": [
                      {
                        "type": "tabs",
                        "tabs": [
                          {
                            "label": "SİLAHLAR",
                            "blocks": [
                              {
                                "type": "table",
                                "header": [
                                  "SİLAH",
                                  "FİYAT"
                                ],
                                "rows": [
                                  [
                                    "Sopa",
                                    "1-2 Bakır"
                                  ],
                                  [
                                    "Kalın Değnek",
                                    "5 Bakır"
                                  ],
                                  [
                                    "Taş/Kurşun sapan",
                                    "5 Bakır"
                                  ],
                                  [
                                    "Hançer",
                                    "5 Gümüş"
                                  ],
                                  [
                                    "Basit Bıçak",
                                    "2 Gümüş"
                                  ],
                                  [
                                    "El Baltası",
                                    "5 Gümüş"
                                  ],
                                  [
                                    "Orak / Tarım Aleti",
                                    "2 - 5 Gümüş"
                                  ],
                                  [
                                    "Kısa Mızrak",
                                    "1 Altın"
                                  ],
                                  [
                                    "Basit Yay",
                                    "1 Altın"
                                  ],
                                  [
                                    "Basit Arbalet",
                                    "3 Altın"
                                  ]
                                ]
                              }
                            ]
                          },
                          {
                            "label": "ASKERİ SİLAHLAR",
                            "blocks": [
                              {
                                "type": "table",
                                "header": [
                                  "SİLAH",
                                  "FİYAT"
                                ],
                                "rows": [
                                  [
                                    "Kısa Kılıç",
                                    "2 Altın"
                                  ],
                                  [
                                    "Uzun Kılıç",
                                    "5 Altın"
                                  ],
                                  [
                                    "Savaş Baltası",
                                    "5 Altın"
                                  ],
                                  [
                                    "Topuz",
                                    "3 Altın"
                                  ],
                                  [
                                    "Gürz",
                                    "6 Altın"
                                  ],
                                  [
                                    "Uzun Mızrak",
                                    "3 Altın"
                                  ],
                                  [
                                    "Kargı",
                                    "4 Altın"
                                  ],
                                  [
                                    "Halberd",
                                    "8 Altın"
                                  ],
                                  [
                                    "Çift Elli Balta",
                                    "10 Altın"
                                  ],
                                  [
                                    "Çift Elli Kılıç",
                                    "15 Altın"
                                  ],
                                  [
                                    "Kaliteli Savaş Yayı",
                                    "5 Altın"
                                  ],
                                  [
                                    "Ağır Arbalet",
                                    "10 Altın"
                                  ],
                                  [
                                    "Fırlatma Bıçakları, 5'li",
                                    "5 Altın"
                                  ],
                                  [
                                    "Kompozit Yay",
                                    "25 Altın"
                                  ],
                                  [
                                    "Mekanik Arbalet",
                                    "30 Altın"
                                  ],
                                  [
                                    "Gizli Bilek Bıçağı",
                                    "25 Altın"
                                  ]
                                ]
                              }
                            ]
                          },
                          {
                            "label": "MÜHİMMAT",
                            "blocks": [
                              {
                                "type": "table",
                                "header": [
                                  "MÜHİMMAT",
                                  "FİYAT"
                                ],
                                "rows": [
                                  [
                                    "1 Ok",
                                    "1 Bakır"
                                  ],
                                  [
                                    "1 Kaliteli Ok",
                                    "3 Bakır"
                                  ],
                                  [
                                    "1 Zırh Delici Ok",
                                    "1 Gümüş"
                                  ],
                                  [
                                    "1 Arbalet Oku",
                                    "2 Bakır"
                                  ],
                                  [
                                    "1 Ağır Arbalet Oku",
                                    "6 Bakır"
                                  ],
                                  [
                                    "Fırlatma Bıçağı",
                                    "1 Altın"
                                  ]
                                ]
                              }
                            ]
                          },
                          {
                            "label": "KALKAN",
                            "blocks": [
                              {
                                "type": "table",
                                "header": [
                                  "KALKAN",
                                  "FİYAT"
                                ],
                                "rows": [
                                  [
                                    "Basit Tahta Kalkan",
                                    "5 Gümüş"
                                  ],
                                  [
                                    "Küçük Kalkan",
                                    "1 Altın"
                                  ],
                                  [
                                    "Orta Kalkan",
                                    "3 Altın"
                                  ],
                                  [
                                    "Güçlendirilmiş Kalkan",
                                    "10 Altın"
                                  ],
                                  [
                                    "Büyük Kalkan",
                                    "13 Altın"
                                  ],
                                  [
                                    "Kule Kalkan",
                                    "25 Altın"
                                  ]
                                ]
                              }
                            ]
                          },
                          {
                            "label": "ZIRHLAR",
                            "blocks": [
                              {
                                "type": "table",
                                "header": [
                                  "ZIRH",
                                  "FİYAT"
                                ],
                                "rows": [
                                  [
                                    "Kalın giysi / dolgulu kıyafet",
                                    "2 Altın"
                                  ],
                                  [
                                    "Deri Zırh",
                                    "5 Altın"
                                  ],
                                  [
                                    "Sertleştirilmiş Deri",
                                    "15 Altın"
                                  ],
                                  [
                                    "Zincir Gömlek",
                                    "25 Altın"
                                  ],
                                  [
                                    "Pul Zırh",
                                    "40 Altın"
                                  ],
                                  [
                                    "Ağır Zincir Zırh",
                                    "100 Altın"
                                  ],
                                  [
                                    "Parçalı Plaka Zırh",
                                    "150 Altın"
                                  ],
                                  [
                                    "Yarım Plaka Zırh",
                                    "200 Altın"
                                  ],
                                  [
                                    "Tam Plaka Zırh",
                                    "500 Altın"
                                  ]
                                ]
                              }
                            ]
                          },
                          {
                            "label": "PARÇA ZIRHLAR",
                            "blocks": [
                              {
                                "type": "table",
                                "header": [
                                  "PARÇA",
                                  "FİYAT"
                                ],
                                "rows": [
                                  [
                                    "Deri Eldiven",
                                    "5 Gümüş"
                                  ],
                                  [
                                    "Sertleştirilmiş Deri Eldiven",
                                    "2 Altın"
                                  ],
                                  [
                                    "Metal Eldiven",
                                    "10 Altın"
                                  ],
                                  [
                                    "Deri Bot",
                                    "1 Altın"
                                  ],
                                  [
                                    "Sertleştirilmiş Deri Botlar",
                                    "5 Altın"
                                  ],
                                  [
                                    "Metal Dizlik",
                                    "5 Altın"
                                  ],
                                  [
                                    "Metal Kolluk",
                                    "5 Altın"
                                  ],
                                  [
                                    "Basit Miğfer",
                                    "3 Altın"
                                  ],
                                  [
                                    "iyi Miğfer",
                                    "10 Alın"
                                  ],
                                  [
                                    "Kapalı Savaş Miğferi",
                                    "25 Altın"
                                  ],
                                  [
                                    "Göğüs Plakası",
                                    "60 Altın"
                                  ],
                                  [
                                    "Omuzluk Seti",
                                    "20 Altın"
                                  ]
                                ]
                              }
                            ]
                          },
                          {
                            "label": "TAMİR, BAKIM VE UYARLAMA",
                            "blocks": [
                              {
                                "type": "heading",
                                "level": 3,
                                "text": "BAKIM"
                              },
                              {
                                "type": "table",
                                "header": [
                                  "HİZMET",
                                  "FİYAT"
                                ],
                                "rows": [
                                  [
                                    "Bileme",
                                    "5 Bakır - 1 Gümüş"
                                  ],
                                  [
                                    "Silah Genel Bakım",
                                    "2 Gümüş"
                                  ],
                                  [
                                    "Yay Kirişi değiştirme",
                                    "1 Gümüş"
                                  ],
                                  [
                                    "Kalkan Tamiri",
                                    "1 - 5 Gümüş"
                                  ],
                                  [
                                    "Hafif Zırh Bakımı",
                                    "5 Gümüş"
                                  ],
                                  [
                                    "Orta Zırh Bakımı",
                                    "1 Altın"
                                  ],
                                  [
                                    "Ağır Zırh Bakımı",
                                    "3 Altın"
                                  ],
                                  [
                                    "Tam Plaka Bakımı",
                                    "10 Altın"
                                  ]
                                ]
                              },
                              {
                                "type": "heading",
                                "level": 3,
                                "text": "TAMİR"
                              },
                              {
                                "type": "table",
                                "header": [
                                  "HASAR SEVİYESİ",
                                  "FİYAT"
                                ],
                                "rows": [
                                  [
                                    "Küçük Hasar",
                                    "Eşya fiyatının %5'i"
                                  ],
                                  [
                                    "Orta Hasar",
                                    "Eşya fiyatının %15'i"
                                  ],
                                  [
                                    "Ağır Hasar",
                                    "Eşya fiyatının %30'u"
                                  ],
                                  [
                                    "Neredeyse Kırılmış",
                                    "Eşya fiyatının %50'si"
                                  ]
                                ]
                              },
                              {
                                "type": "heading",
                                "level": 3,
                                "text": "ÖLÇÜYE UYARLAMA"
                              },
                              {
                                "type": "table",
                                "header": [
                                  "İŞLEM",
                                  "FİYAT"
                                ],
                                "rows": [
                                  [
                                    "Deri Zırh Uyarlama",
                                    "Zırh Fiyatının %10'u"
                                  ],
                                  [
                                    "Zincir / Pul Zırh uyarlama",
                                    "Zırh Fiyaının %20'si"
                                  ],
                                  [
                                    "Yarım Plaka Uyarlama",
                                    "Zırh Fiyatının %30'u"
                                  ],
                                  [
                                    "Tam Plaka Uyarlama",
                                    "Zırh Fiyatının %40'ı"
                                  ]
                                ]
                              }
                            ]
                          },
                          {
                            "label": "AYDINLATMA EKİPMANLARI",
                            "blocks": [
                              {
                                "type": "table",
                                "header": [
                                  "EŞYA",
                                  "FİYAT",
                                  "AÇIKLAMA"
                                ],
                                "rows": [
                                  [
                                    "Meşale",
                                    "1 Bakır",
                                    "Kısa süreli ışık"
                                  ],
                                  [
                                    "Kaliteli Meşale ",
                                    "7 Bakır",
                                    "Daha uzun yanar, rüzgara dayanıklı"
                                  ],
                                  [
                                    "Yağ, küçük şişe",
                                    "5 Bakır",
                                    "Fener veya ateş için"
                                  ],
                                  [
                                    "Yağ, büyük şişe",
                                    "1 Gümüş",
                                    "Uzun yol için"
                                  ],
                                  [
                                    "El Feneri",
                                    "1 Altın",
                                    "Maceracı standardı"
                                  ],
                                  [
                                    "Kapalı Fener",
                                    "3 Altın",
                                    "Rüzgar ve yağmura dayanıklı"
                                  ],
                                  [
                                    "Sinyal Feneri",
                                    "15 Altın",
                                    "Uzak mesafeli işaretleme"
                                  ]
                                ]
                              }
                            ]
                          },
                          {
                            "label": "KAMP EKİPMANLARI",
                            "blocks": [
                              {
                                "type": "table",
                                "header": [
                                  "EŞYA",
                                  "FİYAT",
                                  "AÇIKLAMA"
                                ],
                                "rows": [
                                  [
                                    "İnce battaniye",
                                    "5 Bakır",
                                    "Kötü hava için yetersiz"
                                  ],
                                  [
                                    "Kalın battaniye",
                                    "1 Gümüş",
                                    "Temel Kamp eşyası"
                                  ],
                                  [
                                    "Uyku tulumu",
                                    "5 Gümüş",
                                    "Yolcu standardı"
                                  ],
                                  [
                                    "Kaliteli uyku tulumu",
                                    "1 Altın",
                                    "Soğukta sıcak tutar"
                                  ],
                                  [
                                    "Hasır/deri mat",
                                    "5 Bakır",
                                    "Zeminden korur"
                                  ],
                                  [
                                    "Kamp Bezi",
                                    "1 Gümüş",
                                    "Yağmur ve rüzgar için"
                                  ],
                                  [
                                    "Basit çadır, 1 kişilik",
                                    "2 Altın",
                                    "Ucuz, hafif"
                                  ],
                                  [
                                    "Standart Çadır, 2 kişilik",
                                    "5 Altın",
                                    "Maceracı Standardı"
                                  ],
                                  [
                                    "Büyük Çadır, 4 kişilik",
                                    "12 altın",
                                    "Grup kampı"
                                  ],
                                  [
                                    "Kaliteli Kış Çadırı",
                                    "25 Altın",
                                    "Soğuktan korur"
                                  ],
                                  [
                                    "Askerî Çadır",
                                    "50 Altın",
                                    "Sağlam, ağır"
                                  ],
                                  [
                                    "Kamp pişirme takımı",
                                    "1 Altın",
                                    "Tencere, kap, küçük araçlar"
                                  ],
                                  [
                                    "Seyyar ocak, mangal",
                                    "3 Altın",
                                    "Uzun kamp için"
                                  ]
                                ]
                              },
                              {
                                "type": "heading",
                                "level": 3,
                                "text": "KAMP KONFORU"
                              },
                              {
                                "type": "table",
                                "header": [
                                  "KAMP KALİTESİ",
                                  "GEREKLİ EKİPMAN",
                                  "OYUN ETKİSİ"
                                ],
                                "rows": [
                                  [
                                    "Kötü Kamp",
                                    "Battaniye/açık alan",
                                    "Dinlenme zayıf, hastalık ve yorgunluk riski"
                                  ],
                                  [
                                    "Basit Kamp",
                                    "Uyku tulumu + kamp bezi",
                                    "Normal dinlenme"
                                  ],
                                  [
                                    "Standart Kamp",
                                    "Çadır + Uyku Tulumu + Pişirme Takımı",
                                    "Güvenli Dinlenme"
                                  ],
                                  [
                                    "Kaliteli Kamp",
                                    "İyi Çadır + Kaliteli Tulum + Sıcak Yemek",
                                    "Uzun yol yorgunluğu azalır"
                                  ],
                                  [
                                    "Askerî Kamp",
                                    "Büyük Çadır + Nöbet Düzeni + Araçlar",
                                    "Baskın ve hava riski azalır"
                                  ]
                                ]
                              }
                            ]
                          },
                          {
                            "label": "TIRMANMA EKİPMANI",
                            "blocks": [
                              {
                                "type": "table",
                                "header": [
                                  "EŞYA",
                                  "FİYAT",
                                  "AÇIKLAMA"
                                ],
                                "rows": [
                                  [
                                    "Kenevir ip, 10m",
                                    "5 Bakır",
                                    "Ucuz, Ağır"
                                  ],
                                  [
                                    "Kaliteli ip, 10m ",
                                    "2 Gümüş",
                                    "Daha sağlam"
                                  ],
                                  [
                                    "Kanca",
                                    "5 Gümüş",
                                    "Tırmanma, sabitleme"
                                  ],
                                  [
                                    "Katlanır kanca",
                                    "1 Altın",
                                    "Taşınabilir"
                                  ],
                                  [
                                    "Çivi/kazık seti",
                                    "5 Altın",
                                    "Kamp ve tırmanış"
                                  ],
                                  [
                                    "Çekiç",
                                    "5 Bakır",
                                    "Genel kullanım"
                                  ],
                                  [
                                    "Tırmanma takımı",
                                    "5 Altın",
                                    "Kanca, piton, ip düzeni"
                                  ],
                                  [
                                    "Kaliteli tırmanma takımı",
                                    "15 Altın",
                                    "Daha güvenli"
                                  ],
                                  [
                                    "Mağara iniş takımı",
                                    "20 Altın",
                                    "Uzun inişler için"
                                  ]
                                ]
                              }
                            ]
                          },
                          {
                            "label": "ÇANTA, KESE, SANDIK VE TAŞIMA",
                            "blocks": [
                              {
                                "type": "table",
                                "header": [
                                  "EŞYA",
                                  "FİYAT",
                                  "AÇIKLAMA"
                                ],
                                "rows": [
                                  [
                                    "Deri kese",
                                    "5 Bakır",
                                    "Sağlam taşıma kesesi"
                                  ],
                                  [
                                    "Omuz Çantası",
                                    "5 Bakır",
                                    "Hafif yük için"
                                  ],
                                  [
                                    "Sırt çantası",
                                    "1 Gümüş",
                                    "Standart Yolcu Çantası"
                                  ],
                                  [
                                    "Maceracı Sırt Çantası",
                                    "2 Altın",
                                    "Ekipman bölmeli"
                                  ],
                                  [
                                    "Su geçirmez çanta",
                                    "5 Altın",
                                    "Nehir, bataklık, yağmur"
                                  ],
                                  [
                                    "Ahşap Sandık",
                                    "5 Gümüş",
                                    "Depolama"
                                  ],
                                  [
                                    "Kilitli Sandık",
                                    "2 Altın",
                                    "Güvenli Saklama"
                                  ],
                                  [
                                    "Bel kemeri ekipman askısı",
                                    "5 Gümüş",
                                    "Küçük araçlara hızlı erişim"
                                  ],
                                  [
                                    "Harita tüpü",
                                    "5 Gümüş",
                                    "Harita, parşömen"
                                  ]
                                ]
                              }
                            ]
                          },
                          {
                            "label": "SU, MATARA VE SIVI KABI",
                            "blocks": [
                              {
                                "type": "table",
                                "header": [
                                  "EŞYA",
                                  "FİYAT",
                                  "AÇIKLAMA"
                                ],
                                "rows": [
                                  [
                                    "Küçük Matara",
                                    "5 Bakır",
                                    "1 Litre"
                                  ],
                                  [
                                    "Standart Matara",
                                    "1 Gümüş",
                                    "3 Litre"
                                  ],
                                  [
                                    "Deri su tulumu",
                                    "2 Gümüş",
                                    "6 Litre"
                                  ],
                                  [
                                    "Büyük Su Tulumu",
                                    "5 Gümüş",
                                    "10 Litre"
                                  ],
                                  [
                                    "Seramik Şişe",
                                    "5 Bakır",
                                    "Kırılgan, 0.5 L"
                                  ],
                                  [
                                    "Metal Şişe",
                                    "2 Altın",
                                    "Sağlam, 0.5 L"
                                  ],
                                  [
                                    "Su Artıma Bezi",
                                    "5 Gümüş",
                                    "Basit Süzme"
                                  ],
                                  [
                                    "Varil",
                                    "1 Altın",
                                    "50 Litre"
                                  ]
                                ]
                              }
                            ]
                          },
                          {
                            "label": "KİLİT, TUZAK & HIRSIZ ALETLERİ",
                            "blocks": [
                              {
                                "type": "table",
                                "header": [
                                  "EŞYA",
                                  "FİYAT",
                                  "AÇIKLAMA"
                                ],
                                "rows": [
                                  [
                                    "Basit Kilit",
                                    "5 Gümüş",
                                    "Sandık, kapı"
                                  ],
                                  [
                                    "İyi Kilit",
                                    "2 Altın",
                                    "Daha Zor Açılır"
                                  ],
                                  [
                                    "Kaliteli Kilit",
                                    "10 Altın",
                                    "Tüccar, Lonca seviyesi"
                                  ],
                                  [
                                    "Basit zincir",
                                    "1 Altın",
                                    ""
                                  ],
                                  [
                                    "Güçlü zincir",
                                    "5 Altın",
                                    ""
                                  ],
                                  [
                                    "Pranga",
                                    "3 Altın",
                                    "Esir taşıma"
                                  ],
                                  [
                                    "Kilit açma takımı",
                                    "20 Altın",
                                    "Uzman ekipmanı"
                                  ],
                                  [
                                    "Tuzak Kurma, Sökme takımı",
                                    "25 Altın",
                                    "Mekanik tuzaklar"
                                  ],
                                  [
                                    "İnce tel seti",
                                    "5 Altın",
                                    "Tuzak, anahtar işi"
                                  ],
                                  [
                                    "Küçük ayna",
                                    "2 Gümüş",
                                    "Köşe-kapı altı bakma"
                                  ]
                                ]
                              }
                            ]
                          },
                          {
                            "label": "ŞİFACI & TIBBİ EKİPMAN",
                            "blocks": [
                              {
                                "type": "table",
                                "header": [
                                  "EŞYA",
                                  "FİYAT",
                                  "AÇIKLAMA"
                                ],
                                "rows": [
                                  [
                                    "Basit Bandaj",
                                    "2 Bakır",
                                    "Tek kullanımlık"
                                  ],
                                  [
                                    "Temiz bandaj seti",
                                    "1 Gümüş",
                                    "5x Bandaj"
                                  ],
                                  [
                                    "Kaliteli Bandaj Seti",
                                    "5 Gümüş",
                                    "Yaraya Müdahale için 5x"
                                  ],
                                  [
                                    "Bitkisel merhem",
                                    "5 Gümüş",
                                    "Basit yaraya müdahale 5x"
                                  ],
                                  [
                                    "Ağrı kesici ot karışımı",
                                    "1 Altın",
                                    "Ağrıyı keserek anlık kısıtlamaları kaldırır"
                                  ],
                                  [
                                    "Ateş Düşürücü Karışım",
                                    "1 Altın",
                                    "Hastalık tedavisi"
                                  ],
                                  [
                                    "Panzehir, zayıf",
                                    "5 Altın",
                                    "Basit zehirlere karşı, genel"
                                  ],
                                  [
                                    "Panzehir, standart",
                                    "15 Altın",
                                    "Tehlikeli zehirlere karşı, genel"
                                  ],
                                  [
                                    "Sıhhiye çantası",
                                    "10 Altın",
                                    "Temel tıbbi set"
                                  ],
                                  [
                                    "Cerrahi Seti",
                                    "50 Altın",
                                    "Uzman seti"
                                  ]
                                ]
                              }
                            ]
                          },
                          {
                            "label": "YAZI, KAYIT, ARŞİV",
                            "blocks": [
                              {
                                "type": "table",
                                "header": [
                                  "EŞYA",
                                  "FİYAT",
                                  "AÇIKLAMA"
                                ],
                                "rows": [
                                  [
                                    "Kömür Kalem",
                                    "1 Bakır",
                                    "Ucuz yazım"
                                  ],
                                  [
                                    "Basit Kalem",
                                    "5 Bakır",
                                    "Günlük kayıt"
                                  ],
                                  [
                                    "Mürekkep, küçük şişe",
                                    "1 Gümüş",
                                    "Standart"
                                  ],
                                  [
                                    "Kaliteli mürekkep",
                                    "5 Gümüş",
                                    "Uzun ömürlü"
                                  ],
                                  [
                                    "Parşömen, tek yaprak",
                                    "5 Bakır",
                                    "Yazı zemini"
                                  ],
                                  [
                                    "Kağıt, 5 Yaprak",
                                    "5 Bakır",
                                    "Bölgeye göre değişken"
                                  ],
                                  [
                                    "Defter",
                                    "1 Altın",
                                    "Günlük vb."
                                  ],
                                  [
                                    "Mühür",
                                    "5 Altın",
                                    "Kimlik, statü"
                                  ],
                                  [
                                    "Belge tüpü",
                                    "5 Gümüş",
                                    "Koruma"
                                  ],
                                  [
                                    "Kâtip Seti",
                                    "10 Altın",
                                    "Kalem, mürekkep, bıçak, cetvel vb."
                                  ],
                                  [
                                    "Arşivci seti",
                                    "30 Altın",
                                    "Katalog, koruma, kopyalama araçları"
                                  ],
                                  [
                                    "Şifreli kayıt defteri",
                                    "25 Altın",
                                    "Gizli Yazım"
                                  ]
                                ]
                              }
                            ]
                          },
                          {
                            "label": "ZANAAT VE MESLEK TAKIMLARI",
                            "blocks": [
                              {
                                "type": "table",
                                "header": [
                                  "TAKIM",
                                  "FİYAT",
                                  "KULLANIM"
                                ],
                                "rows": [
                                  [
                                    "Basit alet takımı",
                                    "2 Altın",
                                    "Genel Tamir"
                                  ],
                                  [
                                    "Marangoz takımı",
                                    "10 Altın",
                                    "Ahşap işleme"
                                  ],
                                  [
                                    "Demirci el takımı",
                                    "25 Altın",
                                    "Basit zırh tamiri"
                                  ],
                                  [
                                    "Seyyar Demirci takımı",
                                    "100 Altın",
                                    "Kervan, ordu"
                                  ],
                                  [
                                    "Derici Takımı",
                                    "15 Altın",
                                    "Deri onarımı"
                                  ],
                                  [
                                    "Terzi takımı",
                                    "5 Altın",
                                    "Kıyafet, zırh astarı vb. tamir"
                                  ],
                                  [
                                    "Aşçı Takımı",
                                    "5 Altın",
                                    "Kamp, han mutfağı"
                                  ],
                                  [
                                    "Simyacı Takımı",
                                    "75 Altın",
                                    "Nadir, dikkat çeker"
                                  ],
                                  [
                                    "Otacı, toplayıcı takımı",
                                    "15 Altın",
                                    "Bitki tanıma, kurutma vb."
                                  ],
                                  [
                                    "Haritacı Takımı",
                                    "30 Altın",
                                    "Ölçüm, çizim vb."
                                  ],
                                  [
                                    "Kuyumcu takımı",
                                    "50 Altın",
                                    "İnce işçilik"
                                  ],
                                  [
                                    "Avcı takımı",
                                    "10 Altın",
                                    "Tuzak, kesim, iz"
                                  ]
                                ]
                              }
                            ]
                          },
                          {
                            "label": "KEŞİF, GÖZLEM & İŞARET",
                            "blocks": [
                              {
                                "type": "table",
                                "header": [
                                  "EŞYA",
                                  "FİYAT",
                                  "AÇIKLAMA"
                                ],
                                "rows": [
                                  [
                                    "Metal düdük",
                                    "1 Gümüş",
                                    "Ses çıkarma"
                                  ],
                                  [
                                    "Basit Büyüteç",
                                    "10 Altın",
                                    "İnceleme"
                                  ],
                                  [
                                    "Dürbün benzeri optik araç",
                                    "100+ Altın",
                                    "Nadir, pahalı"
                                  ],
                                  [
                                    "Bayrak, flama seti",
                                    "3 Altın",
                                    "Görsel sinyal"
                                  ]
                                ]
                              }
                            ]
                          },
                          {
                            "label": "AV, TUZAK & HAYATTA KALMA",
                            "blocks": [
                              {
                                "type": "table",
                                "header": [
                                  "EŞYA",
                                  "FİYAT",
                                  "AÇIKLAMA"
                                ],
                                "rows": [
                                  [
                                    "Basit kapan",
                                    "5 Gümüş",
                                    "Küçük hayvan için"
                                  ],
                                  [
                                    "Güçlü kapan",
                                    "2 altın",
                                    "Orta hayvan"
                                  ],
                                  [
                                    "Büyük av kapanı",
                                    "10 Altın",
                                    "Tehlikeli, ağır"
                                  ],
                                  [
                                    "Balık Ağı",
                                    "1 Altın",
                                    "Ağır"
                                  ],
                                  [
                                    "Olta takımı",
                                    "5 Gümüş",
                                    "Hafif"
                                  ],
                                  [
                                    "Deri yüzme bıçağı",
                                    "1 Altın",
                                    "Kesim, yüzme"
                                  ],
                                  [
                                    "Deri yüzme takımı",
                                    "5 Altın",
                                    "Avcı işi"
                                  ],
                                  [
                                    "Tuzlama, kurutma seti",
                                    "2 Altın",
                                    "Et Saklama"
                                  ],
                                  [
                                    "Çakmak Taşı",
                                    "5 Bakır",
                                    "Temel"
                                  ],
                                  [
                                    "Kaliteli Ateş Başlatma Kiti",
                                    "1 Altın",
                                    "Yağmurda daha güenilir"
                                  ]
                                ]
                              }
                            ]
                          },
                          {
                            "label": "ÖZEL BÖLGE EKİPMANLARI",
                            "blocks": [
                              {
                                "type": "heading",
                                "level": 3,
                                "text": "SOĞUK BÖLGE / SOĞUK ÇÖL"
                              },
                              {
                                "type": "table",
                                "header": [
                                  "EŞYA",
                                  "FİYAT"
                                ],
                                "rows": [
                                  [
                                    "Kalın kürk manto",
                                    "5 Altın"
                                  ],
                                  [
                                    "Soğuk bölge botu",
                                    "3 Altın"
                                  ],
                                  [
                                    "Kürklü eldiven",
                                    "1 Altın"
                                  ],
                                  [
                                    "Kar gözlüğü",
                                    "2 Altın"
                                  ],
                                  [
                                    "Soğuk Bölge Kamp Seti",
                                    "25 Altın"
                                  ],
                                  [
                                    "Soğuk Bölge Yol Seti",
                                    "50 Altın"
                                  ]
                                ]
                              },
                              {
                                "type": "heading",
                                "level": 3,
                                "text": "KURAK BÖLGE"
                              },
                              {
                                "type": "table",
                                "header": [
                                  "EŞYA",
                                  "FİYAT"
                                ],
                                "rows": [
                                  [
                                    "Güneş Örtüsü",
                                    "1 Altın"
                                  ],
                                  [
                                    "İnce Çöl Pelerini ",
                                    "2 Altın"
                                  ],
                                  [
                                    "Su Filtre Seti",
                                    "3 Altın"
                                  ],
                                  [
                                    "Kum gözlüğü",
                                    "2 Altın"
                                  ],
                                  [
                                    "Çöl kamp bezi",
                                    "5 Altın"
                                  ]
                                ]
                              },
                              {
                                "type": "heading",
                                "level": 3,
                                "text": "BATAKLIK, YAĞMUR ORMANI"
                              },
                              {
                                "type": "table",
                                "header": [
                                  "EŞYA",
                                  "FİYAT"
                                ],
                                "rows": [
                                  [
                                    "Su geçirmez bot",
                                    "5 Altın"
                                  ],
                                  [
                                    "Böcek ağı",
                                    "1 Altın"
                                  ],
                                  [
                                    "Su geçirmez çanta",
                                    "5 Altın"
                                  ],
                                  [
                                    "Bataklık sırığı",
                                    "5 Gümüş"
                                  ]
                                ]
                              }
                            ]
                          }
                        ]
                      },
                      {
                        "type": "heading",
                        "level": 3,
                        "text": "KALİTE SEVİYELERİ"
                      },
                      {
                        "type": "table",
                        "header": [
                          "KALİTE",
                          "FİYAT ÇARPANI",
                          "ETKİ"
                        ],
                        "rows": [
                          [
                            "Kötü",
                            "x0.5",
                            "Kırılma, pas, ceza ihtimali"
                          ],
                          [
                            "Sıradan",
                            "x1",
                            "Standart"
                          ],
                          [
                            "İyi İşçilik",
                            "x2",
                            "Dayanıklı, dengeli"
                          ],
                          [
                            "Usta İşi",
                            "x5",
                            "Daha hafif, daha sağlam, prestijli"
                          ],
                          [
                            "Nadir Usta İşi",
                            "x10",
                            "Özel Sipariş, İsimli Zanaatkâr"
                          ],
                          [
                            "Antik/Savaş Öncesi",
                            "x20+",
                            "Koleksiyon, sır, kalite veya lanet"
                          ]
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        }
      }
    },
    {
      "id": "ver_mprc9n9vek",
      "label": "v3.0",
      "createdAt": "2026-05-29",
      "content": {
        "meta": {
          "title": "SLVNZ 3.0",
          "brandName": "SLVNZ",
          "brandAccent": "3.0",
          "brandLogo": "",
          "heroLine1": "SLVNZ",
          "heroLine2": "3.0",
          "tagline": "MASAÜSTÜ ROL YAPMA SİSTEMİ",
          "description": "",
          "version": "v3.0",
          "contentSeed": "2026-07-07-mrasku9t"
        },
        "sections": {
          "oyun-kurallari": {
            "label": "OYUN KURALLARI",
            "blurb": "Sistemin çekirdeği — zarlar, nitelikler, savaş ve karakter gelişimi.",
            "items": [
              {
                "id": "oyun-sistemi",
                "title": "OYUN SİSTEMİ",
                "mode": "rich",
                "blocks": [
                  {
                    "type": "heading",
                    "level": 2,
                    "text": "SLVNZ 3.0 SİSTEMİ"
                  },
                  {
                    "type": "paragraph",
                    "text": "SLVNZ 3.0 sistemi, özünde D&D ve FATE sistemlerini baz ve ilham alınarak düşünülmüş, özelleştirilmiş ve detaylandırılmış bir masaüstü rol yapma oyunu sistemidir."
                  },
                  {
                    "type": "paragraph",
                    "text": "Sistem mümkün olduğunca oyun etkisini barındırırken, oyuncunun sistemin ördüğü sınırlara bağlı kalmadan, yaratıcılığını ve rolünü ortaya koyarak oyunun ve savaşın gidişatına yön vermesini amaçlayan esnek gerçekçiliği sunmayı hedeflemektedir."
                  }
                ]
              },
              {
                "id": "zarlar-eylemler",
                "title": "ZARLAR & EYLEMLER",
                "mode": "rich",
                "blocks": [
                  {
                    "type": "heading",
                    "level": 2,
                    "text": "ZARLAR & EYLEMLER"
                  },
                  {
                    "type": "paragraph",
                    "text": "Oyundaki eylemler, karakterinizle gerçekleştirmek isteyeceğiniz herhangi bir girişimi ifade eder. Bazı eylemler bir beceri gerektirmeden doğrudan gerçekleşebilse de bazı eylemlerin gerçekleşmesi için zar kullanılması gerekir. Kullanılacak zarlar 20 yüzlü bir zar (d20) kullanılarak gerçekleştirilebilir."
                  },
                  {
                    "type": "paragraph",
                    "text": "Zar kullanımı ile gerçekleşen herhangi bir eylemin sonucu zarın yansıttığı sayının yüksekliği ile doğru orantılı bir şekilde değişir. Oyun yöneticisi bahsedilen sayı/sayılarla ilgili özelleştirilmiş bir sınır ya da kriter belirtmediyse, sisteme göre zarın yansıttığı sayıların doğuracağı sonuçlar şu şekilde gelişebilmektedir:"
                  },
                  {
                    "type": "table",
                    "header": [
                      "D20",
                      "AÇIKLAMA"
                    ],
                    "rows": [
                      [
                        "1",
                        "Kritik Başarısızlık"
                      ],
                      [
                        "2",
                        "Kesin Başarısızlık"
                      ],
                      [
                        "3-5",
                        "Başarısızlık"
                      ],
                      [
                        "6-10",
                        "Şartlı Başarı"
                      ],
                      [
                        "11-19",
                        "Başarı"
                      ],
                      [
                        "20",
                        "Kritik Başarı"
                      ]
                    ]
                  },
                  {
                    "type": "paragraph",
                    "text": "Eylemlerin geneli, oyun yöneticisinin tercihine göre 10 yüzlü ya da 20 yüzlü zar kullanma seçimi yapılırken kurulmak istenilen denge göz önünde bulundurulmalıdır. 10 yüzlü zar daha dar bir yelpazede daha dengeli bir sonuç yelpazesi oluşturabilirken, 20 yüzlü zar seçimi başarıyı daha yüksek bir ihtimale yayarken başarısızlığın denk gelmesi halinde oluşabilecek cezayı daha ağır bir hale getirebilmektedir."
                  },
                  {
                    "type": "heading",
                    "level": 3,
                    "text": "ZARA GÖRE BAŞARI DURUMLARI"
                  },
                  {
                    "type": "paragraph",
                    "text": "Zar kullanımının sonucunu yansıtan sayıların sebep olabilecekleri durumların karşılıkları şu şekildedir:"
                  },
                  {
                    "type": "heading",
                    "level": 3,
                    "text": "Kritik Başarısızlık"
                  },
                  {
                    "type": "paragraph",
                    "text": "Eylem sonucunu belirlemek için nasıl bir zar kullanılırsa kullanılsın, sonucunun 1 gelmesi halinde, gerçekleştirilmeye çalışılan eylem kesin bir şekilde başarısız sonuçlanır. Bu başarısızlığın yanı sıra ortaya çıkan sonuç, eyleme kalkışan karakter ve/veya çevresindeki karakterler için olumsuz durumlara sebebiyet verebilir. Ayrıca, kritik başarısızlık durumlarında, karakterin sahip olduğu herhangi bir artı/fazladan değer bu kritik duruma dahil edilmez."
                  },
                  {
                    "type": "example",
                    "text": "Usta bir hırsız olan Majik, korsan şehri Sulgaran'ın en büyük iskelesindeki \"Sorvalas\" isimli bir yük gemisine sızmaya çalışmaktadır. Geminin kıç tarafına denizden tırmanmayı başaran Majik, yük deposuna açılan bir pencereyi dışarıdan açmaya çalışmak için 20 yüzlü bir zar kullanır. Zarın sonucu 1 gelir. Majik, camı açmaya çalışmakta başarısız olmakla kalmaz, tutunduğu yerde dengesini kaybederek suya düşer ve yüksek bir ses çıkarır. Bu ses, iskele etrafındaki sivillerin ve muhafızların dikkatini çekecektir ki o bölgeye doğru birkaç kişi neler olduğunu görmek üzere yola koyulur."
                  },
                  {
                    "type": "heading",
                    "level": 3,
                    "text": "Kesin Başarısızlık"
                  },
                  {
                    "type": "paragraph",
                    "text": "Kritik başarısızlık durumuna oldukça benzeyen kesin başarısızlık sonucunda, kritik başarısızlıktan farklı olarak karakterin başında olumsuz bir durumun oluşmadığı bir başarısızlık durumudur. Bu durumda da karakterin sahip olduğu fazladan değerler yine dahil edilmez."
                  },
                  {
                    "type": "heading",
                    "level": 3,
                    "text": "Başarısızlık"
                  },
                  {
                    "type": "paragraph",
                    "text": "Başarısızlık durumunda da karakter gerçekleştirmeye çalıştığı eylemi gerçekleştiremez. Ancak, diğer iki başarısızlık durumundan da farklı olarak, karakterin gerçekleştirmeye çalıştığı eylem doğrultusunda herhangi bir fazladan değeri bulunuyorsa sayıya eklenerek zarın sonucu değiştirilebilir. Eklenen değer ile bahsedilen sınırlar aşılmıyorsa eylem gerçekleşemez ve başarısız olarak sonuçlanır."
                  },
                  {
                    "type": "heading",
                    "level": 3,
                    "text": "Şartlı Başarı"
                  },
                  {
                    "type": "paragraph",
                    "text": "Gerçekleştirilmeye çalışılan eylemin kısmi olarak başarılı olması ya da gerçekleşmesiyle birlikte karakterin ve/veya etrafındaki karakterlerin başına bir bela açılmasına sebep olan bir olay ile sonuçlanmasıdır."
                  },
                  {
                    "type": "heading",
                    "level": 3,
                    "text": "Başarı"
                  },
                  {
                    "type": "paragraph",
                    "text": "Karakterin gerçekleştirmeye çalıştığı eylemin başarılı bir şekilde sonuçlanmasıdır."
                  },
                  {
                    "type": "heading",
                    "level": 3,
                    "text": "Kritik Başarı"
                  },
                  {
                    "type": "paragraph",
                    "text": "Gerçekleştirilmeye çalışılan eylemin kesin bir şekilde başarılı sonuçlanmasıdır. Bu başarının yanında, kritik başarısızlık sonucunda benzer bir yaklaşımda, eyleme kalkışan karakter ve/veya etrafındaki karakterlere olumlu getirisi olabilecek bir durumun bu sonuca dahil olmasını gerektirir."
                  },
                  {
                    "type": "example",
                    "text": "Usta hırsız Majik, suya düştükten sonra etrafta toplanan insanlar tarafından fark edilmemek üzere geminin ters tarafında gizlenmeye çalışır. Gizlenmeye çalışırken bir GİZLİLİK zarı kullanır. Zar sonucu 20 ile sonuçlanır. Majik, kimse fark etmeden geminin kıç tarafındaki bir çıkıntıya tutunarak kendini sudan çeker ve iskeleye tamamen ters bir noktada gözden kaybolmayı başarır. Bu sırada, geminin depo alanında bulunan bir miço, depo penceresini açıp neyin düştüğüne bakmak üzere dışarıya bakar, bir şey göremeyip pencereyi kapatmayı unutarak içeriye döner. Majik, ortamda yaşanan karışıklığı da kendine avantaj edinerek açılmış olan pencereden içeriye girer."
                  }
                ]
              },
              {
                "id": "nitelikler",
                "title": "NİTELİKLER",
                "mode": "rich",
                "blocks": [
                  {
                    "type": "heading",
                    "level": 2,
                    "text": "NİTELİKLER"
                  },
                  {
                    "type": "paragraph",
                    "text": "Bazı durumlarda karakterlerin spesifik eylemleri gerçekleştirmelerinde onlara fayda sağlayabilecekleri nitelikleri bulunmaktadır. Bu nitelikler, herhangi bir karakterin sahip olduğu en temel özellikleri vurgular."
                  },
                  {
                    "type": "heading",
                    "level": 3,
                    "text": "KUVVET (KUV)"
                  },
                  {
                    "type": "paragraph",
                    "text": "Karakterin kas gücü ile gerçekleştirebileceği eylemleri belirleyen niteliktir. Bu eylemler ağır bir nesneyi kaldırma, bir şeye vurma durumunda uygulanan kuvvet, mücadele sırasında bir şeye asılma vb. gibi durumları oluşturur. Bir karakterin kuvvet niteliği ne kadar yüksek ise, bu niteliği gerektiren eylemleri başarma kapasitesi de o kadar yükselir."
                  },
                  {
                    "type": "heading",
                    "level": 3,
                    "text": "ÇEVİKLİK (ÇEV)"
                  },
                  {
                    "type": "paragraph",
                    "text": "Karakterin hızlı hareket etme, ani tepki verme, kaçınma vb. eylemlerinde ihtiyaç duyduğu niteliktir. Bir karakterin çevikliği ne kadar yüksek ise o kadar atik ve hareketli olduğu düşünülebilir. Bu nitelik aynı zamanda karakterin yakın dövüşte silahını, yumruğunu veya tekmesini rakibe isabet ettirmesinde fayda sağlayabilirken, savunma konusunda da gelen darbelerden kaçınma becerisini de etkileyebilen bir niteliktir."
                  },
                  {
                    "type": "heading",
                    "level": 3,
                    "text": "DAYANIKLILIK (DAY)"
                  },
                  {
                    "type": "paragraph",
                    "text": "Karakterlerin darbelere dayanma, yıkıcı durumlara karşı ayakta kalabilme, ağır durumlarda bilincini koruyabilme ya da acıya dayanma gibi durumlarda ihtiyaç duyduğu niteliktir. Aynı zamanda bir karakterin STAMINA değerini de etkilemektedir."
                  },
                  {
                    "type": "heading",
                    "level": 3,
                    "text": "İRADE (İRD)"
                  },
                  {
                    "type": "paragraph",
                    "text": "Dayanıklılığa benzer biçimde karakterin zihinsel dayanıklılığında; yani zihinsel olarak gireceği herhangi bir mücadelede ihtiyaç duyacağı niteliktir. Bu mücadeleler herhangi bir büyü etkisi altında kalma, zihne sızma, isteği dışında telepati vb. etkilerin altında kalma gibi durumlar olarak nitelendirilebilir."
                  },
                  {
                    "type": "heading",
                    "level": 3,
                    "text": "ZEKÂ (ZEK)"
                  },
                  {
                    "type": "paragraph",
                    "text": "Karakterin geçmişe yönelik tarihi bilgilerini, bir konuya yönelik bilgi birikimlerini, zor bulmacalar ve bilmeceleri kavrayabilme yetilerini etkileyen bir niteliktir. Aynı zamanda yüksek zekâya sahip karakterler, bilgileri öğrenme, algılama ve aklında tutma konusunda avantaj sahibidirler. Bunun anlamı, zekâ niteliği yüksek karakterlerin bazı bilgileri öğrenme eğrilerinin normal bir karaktere göre daha yüksek olmasıdır."
                  },
                  {
                    "type": "heading",
                    "level": 3,
                    "text": "İRFAN (İRF)"
                  },
                  {
                    "type": "paragraph",
                    "text": "Karakterlerin başka karakterlerle olan iletişimlerinde, şüpheli buldukları karakterlerin davranışlarının altında yatan gerçeği anlama, bir kişinin yalan söyleyip söylemediğini kavramaya çalışma gibi durumlarda ihtiyaç duyacağı niteliktir. Aynı zamanda irfan sahibi karakterlerin algıları daha açık olacağından, irfan niteliğinin sağlayacağı avantaj sayesinde farkındalıkları olumlu yönde etkilenmektedir. Benzer biçimde irfan sahibi karakterler enerji dolu auraları fark etme ve bu enerjilerin yoğunluğunu tanılama konusunda da daha yetkin durumdadırlar."
                  }
                ]
              },
              {
                "id": "beceriler",
                "title": "BECERİLER",
                "mode": "rich",
                "blocks": [
                  {
                    "type": "heading",
                    "level": 2,
                    "text": "BECERİLER"
                  },
                  {
                    "type": "paragraph",
                    "text": "Niteliklere benzer olarak karakterlerin bazı özel durumlar için ihtiyaç duyacağı beceriler bulunmaktadır. Beceriler, niteliklere benzese de onlar kadar fazla durumda kullanılmayabilirler. Beceriler, **Temel Beceriler** ve **Özel Beceriler** olmak üzere ikiye ayrılır."
                  },
                  {
                    "type": "heading",
                    "level": 3,
                    "text": "TEMEL BECERİLER"
                  },
                  {
                    "type": "heading",
                    "level": 3,
                    "text": "Bloklama"
                  },
                  {
                    "type": "paragraph",
                    "text": "Bir karakterin kendisine yönelmiş bir saldırıyı durdurabilme becerisidir. Bu beceri, karakterin kuşandığı bir silah veya kalkan ile gerçekleştirilebilir. Kalkan ile gerçekleştirilen bir bloklama becerisi, saldırının tamamını absorbe etme imkânına sahiptir ancak kalkanın kuşanıldığı kola fiziksel bir stres bindirir. Silahla gerçekleştirilen bloklamalar ise farklı şekillerde fiziksel yeteneklerle harmanlanabilir, ancak başarısızlık durumunda karakter saldırıyı tamamen göğüslemek durumundadır."
                  },
                  {
                    "type": "heading",
                    "level": 3,
                    "text": "Kaçınma"
                  },
                  {
                    "type": "paragraph",
                    "text": "Bir karakterin kendisine yönelmiş bir saldırıdan kaçınma becerisidir. Karakter, bu beceriyi ÇEVİKLİK niteliğiyle harmanlarken, üstüne gelen saldırıdan en az hasar ile sıyrılmaya çalışır. Çoğunlukla uç uca isabetlerde kesikler ve sıyrıklar gibi hasarlarla sonuçlanırken, mücadele zarlarında makasın açılmasıyla bir karakterin kaçınabildiği hasar seviyesi yükselir."
                  },
                  {
                    "type": "heading",
                    "level": 3,
                    "text": "Atıcılık"
                  },
                  {
                    "type": "paragraph",
                    "text": "El yordamıyla fırlatılabilen araçlar ve silahlar ile (Cirit, El Sapanı vb.) gerçekleştirilen isabet ettirme becerisidir."
                  },
                  {
                    "type": "heading",
                    "level": 3,
                    "text": "Nişancılık"
                  },
                  {
                    "type": "paragraph",
                    "text": "Nişangâhı olan menzilli silahlar ile (Musket, Crossbow vb.) başarılı isabet sağlamak için nişan alma becerisidir."
                  },
                  {
                    "type": "heading",
                    "level": 3,
                    "text": "Okçuluk"
                  },
                  {
                    "type": "paragraph",
                    "text": "Ok ve yay kullanımıyla gerçekleştirilecek atışlarda saldırıyı isabet ettirebilme becerisidir."
                  },
                  {
                    "type": "heading",
                    "level": 3,
                    "text": "İsabet"
                  },
                  {
                    "type": "paragraph",
                    "text": "El ve göz koordinasyonu ile işaret ederek menzildeki bir hedefe isabet ettirme becerisidir (Asa & Enerjisel odak kullanımı vb.)."
                  },
                  {
                    "type": "heading",
                    "level": 3,
                    "text": "Farkındalık"
                  },
                  {
                    "type": "paragraph",
                    "text": "Karakterin özellikle görme ve duyma yetisiyle çevresindeki detayları fark edebilme becerisidir. Bu beceri, çoğunlukla geniş kalabalık bir görüntüdeki ufak detayların farkına varma, kalabalık bir ortamda belirli konuşmaları ayırt etme, fısıldayan birilerini dinlemeye çalışma ya da kendiliğinden duyma, gizlenmiş bir şeyleri olduğu yerde fark etme gibi durumlarda kullanılmaktadır. Aynı zamanda bu beceri, İRFAN niteliğinden de beslenmektedir."
                  },
                  {
                    "type": "heading",
                    "level": 3,
                    "text": "Gizlilik"
                  },
                  {
                    "type": "paragraph",
                    "text": "Farkındalık becerisine karşılık karakterlerin özellikle görme ve duyma gibi hislere karşı fark edilmeden ilerleyebilme ya da kendilerini fark edilmez kılmalarını sağlama girişimlerini ifade eden beceridir."
                  },
                  {
                    "type": "heading",
                    "level": 3,
                    "text": "Araştırma"
                  },
                  {
                    "type": "paragraph",
                    "text": "Karakterin belirli bir bilgi veya nesneyi ilgili bölgede arama yöntemlerine olan hakimiyetini belirler. Farkındalıktan ayrı olarak, karakterin eylem alarak detayları kurcalaması, test etmesi ve kullanması gibi süreçlerin takibinde sonuçlanır. Araştırma becerisi, aynı zamanda ZEKÂ niteliğinden beslenir."
                  },
                  {
                    "type": "heading",
                    "level": 3,
                    "text": "İzcilik"
                  },
                  {
                    "type": "paragraph",
                    "text": "Karakterlerin hakim oldukları vahşi biyomlarda yön bulma, vahşi hayatı tanıma ve buna karşı fikir üretme, biyomlar harici genel vahşi hayatta kalmaya yönelik bilgilere hakim olma ve bunları kullanma becerisidir. İzcilik becerisine sahip olan bir karakter, vahşi hayatta iz sürme, korunaklı sığınak bulma & tanımlama, ateş yakma, düğüm atma vb. becerilerin tümüne seviyesine göre bir miktar hakimdir."
                  },
                  {
                    "type": "heading",
                    "level": 3,
                    "text": "Performans"
                  },
                  {
                    "type": "paragraph",
                    "text": "Karakterlerin sosyal olarak farklı oyuncu harici karakterleri etkileyebilme becerisidir. Bu beceri, bilinen pek çok sistemde alışılmışın aksine doğrudan diğer karakterlerin üstünde mutlak bir etki oluşturulmasını sağlamaz. Çoğunlukla karakterleri bir yalan karşısında ikna etme veya inandırıcı görünme, gerçekleştirilen bir dans hareketi ile etkileyici iz bırakma gibi destekleyici etkilere sahiptir. Ancak sistemde her karakter, oyuncu karakterinin söylediği şeylerden veya etkileme girişiminde bulunduğu hamlelerden etkilenmeyebilir. Bu beceri, genel olarak bu denemelerde oyuncu karakterinin kendisine katabileceği etkileyiciliği artırmakla ilgilidir."
                  },
                  {
                    "type": "heading",
                    "level": 3,
                    "text": "Sağaltım"
                  },
                  {
                    "type": "paragraph",
                    "text": "Karakterlerin yaraya ve hastalığa müdahale ile ilgili kısmi tıbbi bilgisi ve becerisini ifade eder. Bir yarayı dikmek, cerrahi bir müdahalede bulunmak, basit bir soğuk algınlığının müdahale sürecine hakim olmak gibi durumlar bu beceriyi kapsamaktadır."
                  },
                  {
                    "type": "heading",
                    "level": 3,
                    "text": "Terbiye"
                  },
                  {
                    "type": "paragraph",
                    "text": "Bir karakterin vahşi veya evcil olarak bir hayvana karşı iletişim ve etkileşim becerisini ifade eder. Bu beceriye bir hayvanla iletişim kurmaya çalışmak, sürülen bir hayvanı yönlendirmek, sakinleştirmek ve evcilleştirmek dahildir."
                  },
                  {
                    "type": "heading",
                    "level": 3,
                    "text": "ÖZEL BECERİLER"
                  },
                  {
                    "type": "paragraph",
                    "text": "Özel beceriler, temel becerilerin dışında kalan ve karakterin kendisini geliştirmek istediği herhangi bir beceriyi içerir. Bu beceriler tamamen oyuncunun yaratıcılığına ve karakterini kişiselleştirme kapsamında nasıl ilerletmek istediğine bağlıdır. Özel becerilere şu şekilde bazı örnekler verilebilir:"
                  },
                  {
                    "type": "list",
                    "ordered": false,
                    "items": [
                      "**Aşçılık:** Bir karakterin yemek yapma konusundaki ustalığını belirler.",
                      "**Simyacılık:** Bir karakterin simya malzemeleri hakkında bilgisini ve bu malzemeleri kullanarak iksir oluşturabilme becerisini belirler.",
                      "**Yüzücülük:** Bir karakterin suda yüzme becerisini belirler."
                    ]
                  }
                ]
              },
              {
                "id": "enerjiler",
                "title": "ENERJİLER",
                "mode": "rich",
                "blocks": [
                  {
                    "type": "heading",
                    "level": 2,
                    "text": "ENERJİLER"
                  },
                  {
                    "type": "paragraph",
                    "text": "SLVNZ 3.0'da büyü yapmak ya da sisteme daha uygun tabiri ile enerjiyi yönlendirebilmek mümkündür. Enerjiyi yönlendirebilmek için evrende bulunan farklı enerji türlerine hâkim olmak gerekir. Bu enerji türleri Temel Enerji Türleri ve Özel Enerji Türleri olarak birbirinden ayrılırlar."
                  },
                  {
                    "type": "paragraph",
                    "text": "Temel enerjiler, evrendeki pek çok varlığın mana aracılığıyla dönüştürebileceği enerji türleridir. Özel enerjiler ise daha çok duruma bağlı olarak varlıkların sentezleyebileceği ve hissedebileceği enerjilerdir."
                  },
                  {
                    "type": "heading",
                    "level": 3,
                    "text": "TEMEL ENERJİLER"
                  },
                  {
                    "type": "figuretext",
                    "position": "left",
                    "src": "https://slvnz.github.io/resources/webpage/img/support/energies/evocation.png",
                    "width": 25,
                    "showCaption": false,
                    "heading": "YIKIM",
                    "text": "Yıkım enerjisi, çoğunlukla parçalamak, yok etmek ve hasar vermek üzerine doğrudan gerçekleştirilen yeteneklerin dönüştüğü enerjidir. Diğer yandan, canlıları iyileştirmek için de kullanılabilmektedir."
                  },
                  {
                    "type": "figuretext",
                    "position": "left",
                    "src": "https://slvnz.github.io/resources/webpage/img/support/energies/divination.png",
                    "width": 25,
                    "showCaption": false,
                    "heading": "KEHÂNET",
                    "text": "Kehanet enerjisi, çoğunlukla bir şeylerin yerini bulmak, farklı yollarla bilgi edinmek, gelecekle ilgili potansiyelleri görmek & anlamak gibi soyut işlevlere sahiptir."
                  },
                  {
                    "type": "figuretext",
                    "position": "left",
                    "src": "https://slvnz.github.io/resources/webpage/img/support/energies/conjuration.png",
                    "width": 25,
                    "showCaption": false,
                    "heading": "OLUŞTURMA",
                    "text": "Oluşturma enerjisi, doğrudan enerjiyi maddeleştirerek silah meydana getirme, hizmetkâr oluşturma, çevresel etkiler ortaya çıkarma gibi farklı etkiler oluşturma işlevlerine sahiptir."
                  },
                  {
                    "type": "figuretext",
                    "position": "left",
                    "src": "https://slvnz.github.io/resources/webpage/img/support/energies/abjuration.png",
                    "width": 25,
                    "showCaption": false,
                    "heading": "KORUMA",
                    "text": "Koruma enerjisi, kullanıcı varlık veya çevresindeki varlıklar üzerinde koruyucu, muhafaza edici ya da engelleyici etkiler oluşturma işlevine sahiptir."
                  },
                  {
                    "type": "figuretext",
                    "position": "left",
                    "src": "https://slvnz.github.io/resources/webpage/img/support/energies/transmutation.png",
                    "width": 25,
                    "showCaption": false,
                    "heading": "DÖNÜŞTÜRME",
                    "text": "Dönüştürme enerjisi, kullanıldığı çevrede, nesneler veya varlıklar üzerindeki materyal veya formu başkalaşıma uğratarak farklı hallere getirme işlevine sahiptir."
                  },
                  {
                    "type": "figuretext",
                    "position": "left",
                    "src": "https://slvnz.github.io/resources/webpage/img/support/energies/illusion.png",
                    "width": 25,
                    "showCaption": false,
                    "heading": "İLLÜZYON",
                    "text": "İllüzyon enerjisi, enerjisel olarak görünür etkiler meydana getirme, optik yanılsamalara sebep olma gibi özelliklerin meydana gelmesini sağlayan bir işleve sahiptir."
                  },
                  {
                    "type": "figuretext",
                    "position": "left",
                    "src": "https://slvnz.github.io/resources/webpage/img/support/energies/enchantment.png",
                    "width": 25,
                    "showCaption": false,
                    "heading": "EFSUN",
                    "text": "Efsun enerjisi, varlıkların zihinlerini manipüle etmeye, akıllarını karıştırmaya veya onları ikna etmeye yarayan etkileri meydana getiren bir işleve sahiptir."
                  },
                  {
                    "type": "figuretext",
                    "position": "left",
                    "src": "https://slvnz.github.io/resources/webpage/img/support/energies/necromancy.png",
                    "width": 25,
                    "showCaption": false,
                    "heading": "ÇÜRÜME",
                    "text": "Çürüme enerjisi, ölmüş varlıkların bedenlerini kontrol etmeye, onları canlandırmaya veya onların ruhlarını etkilemeye yarayan etkileri meydana getiren bir işleve sahiptir. Aynı zamanda canlı yaşamına zarar verme ve onları zayıflatma etkileri de yaratabilir."
                  },
                  {
                    "type": "heading",
                    "level": 3,
                    "text": "ÖZEL ENERJİLER"
                  },
                  {
                    "type": "paragraph",
                    "text": "Özel enerji türleri, temel olanlara kıyasla daha özel ve erişimi zor veya bazı şartlar taşıyan enerjilerdir. Bu türde enerjiler genel olarak doğada sıklıkla karşılaşılabilen değil, nadiren ortaya çıkan ya da özel bir çaba ile ortaya çıkarılabilecek türden enerjilerdir."
                  },
                  {
                    "type": "figuretext",
                    "position": "left",
                    "src": "https://slvnz.github.io/resources/webpage/img/support/energies/faith.png",
                    "width": 25,
                    "showCaption": false,
                    "heading": "İNANÇ",
                    "text": "Genellikle Ruhbanlar ve Kutbanlar tarafından benimsenen, inançları doğrultusunda iman ettikleri ilahi varlıklardan yansıyan enerjinin bir tezahürü olarak betimlenir."
                  },
                  {
                    "type": "figuretext",
                    "position": "left",
                    "src": "https://slvnz.github.io/resources/webpage/img/support/energies/pact.png",
                    "width": 25,
                    "showCaption": false,
                    "heading": "PAKT",
                    "text": "Doğrudan Sehharların (Warlock) kullandığı enerji türüdür. Bu enerji türü üstün bir varlığın kendi güçlerini başka bir varlığa lütfetmesi ile ortaya çıkar ve iki varlık arasındaki bağın güçlenmesi ile yükselir."
                  },
                  {
                    "type": "figuretext",
                    "position": "left",
                    "src": "https://slvnz.github.io/resources/webpage/img/support/energies/blood.png",
                    "width": 25,
                    "showCaption": false,
                    "heading": "KAN",
                    "text": "Fiziksel olarak ortamda bulunan kanı ana element olarak kontrol etme yetisi kazandıran enerji türüdür. Bu kan kontrolü, varlıkların kapsadıkları auralarının haricindeki dış mekanda bulunan serbest bir kaynaktan kullanılabilir. Örneğin: Yere dökülmüş bir kan öbeği, şişede duran bir miktar kan vb."
                  },
                  {
                    "type": "figuretext",
                    "position": "left",
                    "src": "https://slvnz.github.io/resources/webpage/img/support/energies/chaos.png",
                    "width": 25,
                    "showCaption": false,
                    "heading": "KAOS",
                    "text": "Evrende bulunan dengesiz enerjiyi kontrol altına almayı sağlayan enerji türüdür. Kaos enerjisini kontrol etmeye çalışan varlıklar, yoğun kullanımının sonucunda ortaya çıkabilecek kaotik sonuçlar çevresinde bir karmaşa içinde bulunurlar."
                  },
                  {
                    "type": "figuretext",
                    "position": "left",
                    "src": "https://slvnz.github.io/resources/webpage/img/support/energies/darkmagic.png",
                    "width": 25,
                    "showCaption": false,
                    "heading": "KARANLIK",
                    "text": "Karanlık enerji, evrende bulunan bütün enerji türlerini manipüle etmeye ve onların doğalarını bozarak bambaşka etkiler uyandırılmasına sebep olan tehlikeli bir enerji türüdür. Karanlık enerjiyi kullanmak, varlığın kendi veya çevresindeki hayatı tüketmesine sebep olur."
                  },
                  {
                    "type": "figuretext",
                    "position": "left",
                    "src": "https://slvnz.github.io/resources/webpage/img/support/energies/radiant.png",
                    "width": 25,
                    "showCaption": false,
                    "heading": "AYDINLIK",
                    "text": "Aydınlık enerji, kutsal özellikleri taşıyan, yıkım, koruma, oluşturma, illüzyon, kehanet ve cezbetme enerjilerinin imkânlarını kapsayan bir enerji türüdür. Aydınlık enerjiyi kullanmak varlığın kendisine herhangi bir zarar vermez, ancak evrenin her yerinde bulunan karanlığı ve içinde barınan varlıkları kışkırtır."
                  },
                  {
                    "type": "figuretext",
                    "position": "left",
                    "src": "https://slvnz.github.io/resources/webpage/img/support/energies/soul.png",
                    "width": 25,
                    "showCaption": false,
                    "heading": "RUH",
                    "text": "Ruh enerjisi, varlıkların maddi bedenlerinin ötesinde var olan özlerine dokunan, ruhani düzlemle bağ kuran bir enerji türüdür."
                  },
                  {
                    "type": "figuretext",
                    "position": "left",
                    "src": "https://slvnz.github.io/resources/webpage/img/support/energies/life.png",
                    "width": 25,
                    "showCaption": false,
                    "heading": "YAŞAM",
                    "text": "Yaşam enerjisi, bir varlığın temel yapıtaşıdır. Bir varlığın ruhtan ve bedenden ayrı var oluşundaki yaşayabilme kapasitesinin varlığıdır."
                  }
                ]
              },
              {
                "id": "yetenekler",
                "title": "YETENEKLER",
                "mode": "rich",
                "blocks": [
                  {
                    "type": "heading",
                    "level": 2,
                    "text": "YETENEKLER"
                  },
                  {
                    "type": "paragraph",
                    "text": "Karakterlerin nitelikleri, becerileri ve enerjilerinin yanı sıra bunları da dâhil ederek kullanabileceği yetenekleri bulunmaktadır. Bu yetenekler oyuncunun karakterinin yürümesini istediği yola göre şekillenmektedir. Karakter yetenekleri, fiziksel ve enerjisel olmak üzere iki ayrı dalda oluşmaktadır."
                  },
                  {
                    "type": "paragraph",
                    "text": "Fiziksel yetenekler, kaynak olarak karakterde STAMINA tüketirken, enerjisel yetenekler MANA, RUH, Kİ ve YAŞAM enerjisi tüketebilirler. Ancak, bazı fiziksel yeteneklerin de enerjisel kaynaklar tüketmesi mümkün olabilir."
                  },
                  {
                    "type": "heading",
                    "level": 3,
                    "text": "FİZİKSEL YETENEKLER"
                  },
                  {
                    "type": "paragraph",
                    "text": "Fiziksel yetenekler, çoğunlukla yakın dövüş konusunda ustalaşan ya da menzilli araçlar kullanan karakterlerin ihtiyaç duyduğu yeteneklerdir. Genellikle kas gücü gerektirdiği için karakterlerin STAMINA değerlerini tüketen fiziksel yetenekler, kimi zaman enerji ile harmanlanarak farklı etkiler doğurabilen yeteneklere dönüşebilmektedir. Fiziksel yeteneklerin bu şekli Savaş Sanatı olarak adlandırılmaktadır."
                  },
                  {
                    "type": "paragraph",
                    "text": "SLVNZ 3.0 sisteminde fiziksel yetenekler, genel yetenekler ve yetkinlik yetenekleri olarak ikiye ayrılır. Genel yetenekler, karakterlerin herhangi bir yetkinlik şartı gerektirmeksizin mücadelede kullanabileceği yetenekleri nitelendirirken, yetkinlik yetenekleri, yetkinlik sahibi oldukları silahlar ve beceriler çerçevesinde gerçekleştirebilecekleri daha özel yetenekleri belirtir. Her fiziksel silah yetkinliğinin kendine özgü bir yetenek ağacı ve dalları bulunmaktadır. Karakterler, bu dala giriş yapmak üzere 500 DP. toplayacakları bir sürece girerek, ağaca giriş yaptıktan sonra farklı dallara yönelebilirler."
                  },
                  {
                    "type": "heading",
                    "level": 3,
                    "text": "ENERJİSEL YETENEKLER"
                  },
                  {
                    "type": "paragraph",
                    "text": "Enerjisel yetenekler (Büyüler), doğada bulunan kaotik enerjinin vücuda çekilip kontrol altına alınırken dışarıya istenilen şekilde evirilerek aktarılması sonucu ortaya çıkan yeteneklerdir. Bazı karakterler sadece enerjisel yetenekler konusunda ustalaşma yolunda gidebilse de fiziksel mücadele konusunda ilerleyen karakterler de enerjisel yetenekler konusunda kendini geliştirmek isteyebilir."
                  },
                  {
                    "type": "paragraph",
                    "text": "Bu durum, fiziksel yeteneklerdeki savaş sanatı ile karıştırılmamalıdır. Örneğin, savaş sanatı yeteneği olan bir karakter her vuruşunda bir miktar MANA harcamak kaydıyla vuruşlarını ekstra güçlendirebilir. Ancak, benzer bir karakter doğrudan enerjisel yetenek kullanarak, STAMINA harcamaya gerek kalmadan sadece MANA harcayarak silahını enerji kullanarak bir element ile efsunlayabilir."
                  },
                  {
                    "type": "heading",
                    "level": 3,
                    "text": "ENERJİSEL YETENEK KULLANIMI"
                  },
                  {
                    "type": "paragraph",
                    "text": "Karakterler istisnai durumlar dışında enerjisel yetenek kullanırken sözler, hareketler ve materyallere ihtiyaç duyar. Eğer bir karakter, enerjisel odağa sahipse bu odak materyal gereksinimini ortadan kaldırır. Karakterlerin söyleyeceği sözler, *Büyü Sözleri* olarak anılır. Pek çok enerjisel yeteneğin büyülü sözü, yetenek gerçekleştirilirken vücut hareketleriyle birlikte söylenir. Bu söylem sırasında karakterin mana enerjisini topladığı kısımlarda enerjiyi somutlaştıran çemberler oluşur ve büyülü sözler yüksek tonda yankılanır. Bundan dolayı enerjisel yetenekler çoğunlukla gizlenemez."
                  },
                  {
                    "type": "heading",
                    "level": 3,
                    "text": "SAVAŞ SANATI"
                  },
                  {
                    "type": "paragraph",
                    "text": "Savaş sanatları, özellikle fiziksel yetenekler gibi kas gücüne dayanan ancak bu gücü enerjisel yönlendirmelerle harmanlayan özel savaş manevralarının ortaya çıkarttığı etkilere sahiptir. Bu etkiler, çoğunlukla karakterlerin savaştıkları silahların üstünden uyandırılabilecek veya yaptıkları hamleler ile birlikte meydana gelecek çevresel tepkiler şeklinde yorumlanabilir."
                  },
                  {
                    "type": "heading",
                    "level": 3,
                    "text": "ODAK VE KONSANTRASYON"
                  },
                  {
                    "type": "paragraph",
                    "text": "İki yetenek türünde de anlık gerçekleşen ya da bir süre boyunca mevcut kalan etkiler bulunabilmektedir. Bir süre boyunca etkin kalan bazı yeteneklerin sürdürülebilmesi için odak ya da konsantrasyon gereklidir ve karakterlerin odaklanma/konsantre olma konusunda sınırlılıkları bulunmaktadır. Odak, fiziksel yetenekler için kullanılırken; konsantrasyon, enerjisel yetenekler için kullanılmaktadır."
                  },
                  {
                    "type": "paragraph",
                    "text": "Bir yetenek üstünde odaklanırken ya da konsantre olurken, eğer karakter bu konuda yetkin değilse birden fazla yetenek üstünde bu yoğunlaşmayı gerçekleştiremez."
                  },
                  {
                    "type": "paragraph",
                    "text": "Konsantrasyon gerektiren yeteneklerde, karakter zihnini ortaya çıkardığı enerjinin dağılmadan dışarıda kalabilmesi için kendini odaklamış olur. Odak gerektiren yeteneklerde ise karakter, algılarını yeteneğin akışına odaklayarak duruşunu korur. Karakterlerin odaklanma ya da konsantrasyon sırasında alacağı herhangi bir hasar, odaklanmayı/konsantrasyonu bozulma tehlikesine sokar. Karaktere isabet eden saldırının türüne ve kuvvetine göre GM bir sınır belirlemekle yükümlüdür. Eğer belirlenmek istenmezse Sayfa 1 üstünde bulunan başarı tablosu baz alınabilir. Ancak, bu durumda konsantrasyon/odağın sadece bozulma ve korunma durumu bulunmaktadır. Kritik başarısızlık, şartlı başarı ve kritik başarı durumları böyle bir senaryoda devre dışı bırakılmalıdır."
                  },
                  {
                    "type": "paragraph",
                    "text": "Karakterler odak ya da konsantrasyon yapabilme kapasitelerini geliştirebilirler. Bu durum, karakterlerin odak yuvası ve konsantrasyon yuvası sayılarını artırması demektir. Aktif bulunan her konsantrasyon ve odak gerektiren yetenek için bir yuva doldurulur, yetenek sona erdikten sonra boşaltılır. Konsantrasyon ve odak yuvalarının nasıl geliştirildiğine Karakter Gelişimi bölümünden bakabilirsiniz."
                  }
                ]
              },
              {
                "id": "ekipman",
                "title": "EKİPMAN",
                "mode": "rich",
                "blocks": [
                  {
                    "type": "heading",
                    "level": 2,
                    "text": "EKİPMAN"
                  },
                  {
                    "type": "paragraph",
                    "text": "SLVNZ 3.0'da karakterlerin ekipman kullanımlarının ayrı bir yeri bulunmaktadır. Karakterlerin sahip olduğu ekipmanlar, karakter niteliklerini doğrudan etkileyebilmektedir. Kuşanılan ağır bir zırh, üstün bir savunma sağlarken karakterin hareket kabiliyeti, çevikliği, gizlenme becerisi gibi farklı özelliklerini olumsuz şekilde etkileyebilmektedir. Benzer biçimde kuşanılan silahlar da benzer etkileri barındırabilmektedir. Bu durumlara bağlı olarak farklı ekipmanlar ve karakterin özellikleri üzerindeki etkileri tablolarda belirtilmiştir."
                  },
                  {
                    "type": "heading",
                    "level": 3,
                    "text": "ZIRH NİTELİKLERİ"
                  },
                  {
                    "type": "table",
                    "header": [
                      "Zırh Tipi",
                      "ÇEVİKLİK",
                      "GİZLİLİK"
                    ],
                    "rows": [
                      [
                        "Zırhsız",
                        "0",
                        "0"
                      ],
                      [
                        "Deri Zırh",
                        "0",
                        "0"
                      ],
                      [
                        "Sertleştirilmiş Deri Zırh",
                        "-1",
                        "0"
                      ],
                      [
                        "Yarım Plaka Zırh",
                        "-2",
                        "-1"
                      ],
                      [
                        "Zincir Zırh",
                        "-3",
                        "-2"
                      ],
                      [
                        "Pullu Zırh",
                        "-3",
                        "-2"
                      ],
                      [
                        "Tam Plaka Zırh",
                        "-4",
                        "-3"
                      ]
                    ]
                  },
                  {
                    "type": "paragraph",
                    "text": "Zırhlar, karakterlerin fiziksel saldırılardan ve birçok enerjisel saldırıdan korunmasına olanak sağlar. Ancak koruma seviyesi yükseldikçe, donanımlı korunma beraberinde bazı dezavantajları getirir. Bu dezavantajlar, tabloda gösterilen nitelik ve beceri eksileriyle sınırlı kalmayabilir. Örneğin, oyun yöneticisinin tercihine bağlı olarak, bir karakter giydiği miğferden dolayı farkındalık becerisine eksi değer alabilir."
                  },
                  {
                    "type": "heading",
                    "level": 3,
                    "text": "SİLAH NİTELİKLERİ"
                  },
                  {
                    "type": "table",
                    "header": [
                      "Silah Tipi",
                      "İSABET"
                    ],
                    "rows": [
                      [
                        "Hançer",
                        "+3"
                      ],
                      [
                        "Satır",
                        "+2"
                      ],
                      [
                        "Kısa Kılıç",
                        "+1"
                      ],
                      [
                        "Normal Kılıç",
                        "0"
                      ],
                      [
                        "Uzun Kılıç",
                        "-1"
                      ],
                      [
                        "Büyük Kılıç",
                        "-2"
                      ],
                      [
                        "Savaş Baltası",
                        "-1"
                      ],
                      [
                        "Büyük Savaş Baltası",
                        "-2"
                      ],
                      [
                        "Topuz / Çekiç",
                        "-2"
                      ],
                      [
                        "Büyük Topuz / Çekiç",
                        "-4"
                      ],
                      [
                        "Zincirli Gürz",
                        "-3"
                      ],
                      [
                        "Büyük Zincirli Gürz",
                        "-6"
                      ],
                      [
                        "Mızrak",
                        "0"
                      ],
                      [
                        "Uzun Mızrak",
                        "-2"
                      ],
                      [
                        "Pike",
                        "-4"
                      ]
                    ]
                  },
                  {
                    "type": "paragraph",
                    "text": "Her silah tipinin kendine özgü niteliklerinin bulunmasının yanı sıra karakterler bu silah tipleri üzerinde antrenman yaparak kendilerini geliştirebilir, silahları daha isabetli savurma konusunda ve ileride silah tiplerine özgü farklı yeteneklere sahip olmak için ilerleyebilirler."
                  },
                  {
                    "type": "heading",
                    "level": 3,
                    "text": "KALKAN NİTELİKLERİ"
                  },
                  {
                    "type": "table",
                    "header": [
                      "Kalkan Tipi",
                      "BLOK",
                      "ÇEVİKLİK"
                    ],
                    "rows": [
                      [
                        "Kalkansız",
                        "0",
                        "0"
                      ],
                      [
                        "Buckler",
                        "ÇEV",
                        "0"
                      ],
                      [
                        "Ufak Kalkan",
                        "ÇEV",
                        "0"
                      ],
                      [
                        "Normal Kalkan *",
                        "+3",
                        "-1"
                      ],
                      [
                        "Kule Kalkan",
                        "+6",
                        "-3"
                      ]
                    ]
                  },
                  {
                    "type": "paragraph",
                    "text": "(*) Tam Blok Pozu yapabilen kalkan tipi."
                  },
                  {
                    "type": "paragraph",
                    "text": "Kalkanlar, zırhların yanı sıra karakterlere ekstra korunma imkânı tanıyan ekipman türüdür. Bir karakter kalkanla kullanım tarzını şekillendirerek iki farklı şekilde korunabilir. Kalkanda ve birçok yetenek içeriğinde kullanılabilecek bu ve buna benzer durumlara Poz ismi verilir. Kalkan için kullanılabilen pozlar Savaş Pozu ve Tam Blok Pozudur. Bu pozların kullanılabileceği kalkan tipleri Normal Kalkan ve Kule Kalkan tipleridir. Bunların dışında kalan diğer kalkan türleri blok için karakterin çeviklik niteliğini baz alır."
                  },
                  {
                    "type": "heading",
                    "level": 3,
                    "text": "SAVAŞ POZU"
                  },
                  {
                    "type": "paragraph",
                    "text": "Karakterin kalkanı tuttuğu normal savaş duruşudur. Bu duruşta karakter gelen saldırıyı bloke etmek için kuşanmış olduğu kalkanın blok niteliğini ve kendi sahip olduğu blok becerisini birleştirerek kullanır."
                  },
                  {
                    "type": "heading",
                    "level": 3,
                    "text": "TAM BLOK POZU"
                  },
                  {
                    "type": "paragraph",
                    "text": "Tam blok pozunda karakter, kalkanını önünü kapatacak biçimde tutacak şekilde bir duruşa geçer. Bu şekilde karakterin vücudunun dönük olduğu yönden gelen saldırılar NET BLOK gerçekleştirir. NET BLOK, karakterin bütün fiziksel saldırılardan zarar görmemesine, kalkanın hasar alması ve kolun baskı altında kalmasına sebep olur. Aşağıdan gelebilecek saldırılara karşı yine de bir savunma refleksi gerektirir."
                  },
                  {
                    "type": "paragraph",
                    "text": "TAM BLOK pozundayken karakterin hareket kabiliyeti yarıya iner, gerçekleştireceği fiziksel saldırılara alacağı KUVVET BONUSU yok sayılır. TAM BLOK pozundayken karakter önüne, sağ çaprazına ve sağına fiziksel saldırı gerçekleştirebilir."
                  }
                ]
              },
              {
                "id": "savas-mucadele",
                "title": "SAVAŞ & MÜCADELE",
                "mode": "rich",
                "blocks": [
                  {
                    "type": "heading",
                    "level": 2,
                    "text": "SAVAŞ & MÜCADELE"
                  },
                  {
                    "type": "paragraph",
                    "text": "Karakterler tek başlarına kalkıştıkları eylemlerde başarı düzeyini belirlemek için kullandıkları zar sistemini karşılıklı girdikleri savaşlar veya mücadeleler için de kullanırlar. İki karakterin birbirine kılıç savurması, belirli enerjilerin etkisi altında bırakması, güreş tutması vb. durumlarda savaş ve mücadele sistemi devreye girer."
                  },
                  {
                    "type": "paragraph",
                    "text": "En basit hali ile bunun gibi durumlarda iki taraf da birer zar kullanır. Sayısal değeri yüksek gelen taraf karşılaşmadan galip çıkar. Ancak, silahlı mücadeleler, enerji yönlendirmenin kullanıldığı durumlar gibi özel anlarda, gerçekleştirilen eylemin niteliğine göre kullanılacak zar sayıları değişmektedir."
                  },
                  {
                    "type": "paragraph",
                    "text": "Örneğin, birbirine karşı çift elli kılıçlarla savaşan iki karakterin mücadelesinde; kılıcı savuran taraf, kılıcın isabetini belirlemek için bir zar, kılıcı savurma kuvvetini belirlemek için ise ikinci bir zar kullanır. **Fiziksel zarlar ile oynanan bir ortamda bu zarların sırayla atılması tavsiye edilir.** Dijital çevrimiçi bir ortamda ise topluca atılabilir, ancak gelen sonuçlar soldan sağa sıralanacak şekilde önce isabet, ardından kuvvet şeklinde olmalıdır."
                  },
                  {
                    "type": "paragraph",
                    "text": "Yukarıdaki anlatım ışığında, savaş ve mücadele durumlarında takip edilebilecek durumlar şu şekilde birbirinden ayrılabilir:"
                  },
                  {
                    "type": "heading",
                    "level": 3,
                    "text": "SIRADAN MÜCADELE"
                  },
                  {
                    "type": "paragraph",
                    "text": "Sıradan mücadeleler; güreş tutma, birbirini engelleme, yalan söyleme, ikna etme gibi karşılıklı başarma ve kaybetme durumları değerlendirilir. Bu durumlarda genellikle iki taraf da birer adet zar kullanır. Yardımcı puanlarla birlikte sayısal üstünlüğe sahip olan taraf mücadelenin galibi olur."
                  },
                  {
                    "type": "example",
                    "text": "Majik, kalabalık bir sokakta dolaşırken dalgın yürüyen bir adamın cebinden altın kesesini almaya çalışmak için El Çabukluğu özel becerisini kullanır. Buna karşılık dalgın adam için bu durumu zamanında fark edip etmeyeceğini belirlemek için FARKINDALIK beceri zarı kullanılır."
                  },
                  {
                    "type": "heading",
                    "level": 3,
                    "text": "SAVAŞ"
                  },
                  {
                    "type": "paragraph",
                    "text": "Savaş anında karakterler genellikle saldırı eylemlerini belirlemek üzere birden fazla zar kullanırlar. Bu durumlar genellikle ÇEVİKLİK, KUVVET, İSABET, KAYNAK KULLANIMI, ENERJİ gibi nitelikler üzerinden belirlenir. Bir savaş anında gelişebilecek eylemler ve bu eylemler için kullanılabilecek zar sıfatları sınıflandırılabilir."
                  },
                  {
                    "type": "heading",
                    "level": 3,
                    "text": "Yakın Menzilli Saldırılar"
                  },
                  {
                    "type": "paragraph",
                    "text": "Yakın menzilli herhangi bir silah ile saldırıda bulunan bir karakter, özel ya da ekleme bir durum olmadığı sürece iki adet zar kullanır. Bu zarlar sırayla atılmalı ya da dijital bir ortamda kullanılıyorsa gelen sonuç soldan sağa sıralanacak şekilde, ilk olarak İSABET, ikinci olarak HASAR/KUVVET olmak üzere sayısal değerlere dökülür."
                  },
                  {
                    "type": "heading",
                    "level": 3,
                    "text": "Uzak Menzilli Saldırılar"
                  },
                  {
                    "type": "paragraph",
                    "text": "Yakın menzilli saldırılara benzer olarak, uzun menzilli saldırılarda da genel olarak iki zar kullanılır. Ancak, bahsedilen menzilli saldırı enerji yönlendirmeyi içeriyorsa, bu durumda kullanılacak zarların sayısı ikiden fazla olacak şekilde enerjisel yeteneğin özelliklerine göre değişebilmektedir. Enerjisel yetenekler dışında sıradan olarak bahsedilebilecek menzilli saldırılarda (Yay kullanımı gibi) MENZİLLİ İSABET ve KUVVET zarı kullanılır. Ancak, kuvvet gerektirmeyen bazı menzilli araçlar kullanılırken (Tatar Yayı, Musket gibi) sadece atışı isabet ettirmek için bir zar kullanılır. Bunun sebebi bu tarz menzilli silahların kendilerine özgü sabit bir hasarının bulunmasıdır."
                  },
                  {
                    "type": "heading",
                    "level": 3,
                    "text": "Savunma"
                  },
                  {
                    "type": "paragraph",
                    "text": "Karakterler kendilerine yönelmiş herhangi bir saldırıdan kaçınmak ya da korunmak üzere bir savunma zarı kullanabilirler. Bu tür zarlar genellikle KAÇINMA, BLOKLAMA ya da DAYANIKLILIK kullanılarak atılır."
                  },
                  {
                    "type": "paragraph",
                    "text": "Kaçınma durumlarında gelen saldırının isabet zarının sayısal değerini kaçınma zarı ile geçmek yeterlidir. Ancak rakibin isabet değeri ile karakterin kaçınma değeri arasındaki fark ne kadar fazla ise, karşı tarafın gerçekleştirdiği saldırının isabet ettiği nokta, rakibin saldırmak istediği noktaya o kadar yakın olmaktadır."
                  },
                  {
                    "type": "paragraph",
                    "text": "Bloklama durumlarında karakter TAM BLOK pozunda değil ise gelen saldırıdan korunma durumu kaçınmaya kıyasla daha olasıdır. Rakibin saldırısı, karakterin bloklama zarının değerinden 6 puan fazla ise kalkanın arkasına geçerek karaktere hasar verir. Ancak karakterin bloklama zarı ile rakibin isabeti arasında 6 puandan az bir fark varsa, rakibin saldırısı kalkana isabet ederek kalkana zarar verirken, karakterin STAMINA değerinin azalmasına sebep olacaktır. Bloklama değerinin karşı saldırı değerinden yüksek olması durumunda kalkan sadece yıpranma payı alır ve saldırıyı savuşturur."
                  },
                  {
                    "type": "heading",
                    "level": 3,
                    "text": "BÜYÜ KULLANIMI"
                  },
                  {
                    "type": "paragraph",
                    "text": "Enerjinin yönlendirilmesi ve kullanımı basit formlarda başlasa da geliştikçe karmaşıklaşan, dolayısıyla zar kullanımı açısından da farklı yaklaşımlar isteyebilen bir durumdur. Ayrıca, büyü kullanımı neredeyse her zaman MANA, RUH ya da YAŞAM enerjilerini kaynak olarak kullanmaktadır. Çoğu büyü kullanımı için iki ya da üç zar kullanılsa da büyünün tanımı ya da işlevi özelleştikçe, bu işleve uyum sağlamak adına büyü kullanımına farklı türde zarlar eklenebilir."
                  },
                  {
                    "type": "paragraph",
                    "text": "Bir karakter büyü kullanmak için enerjisel bir odaklayıcıya ihtiyaç duyar. Bu odaklayıcılar, genellikle enerjiyi aktarma kapasitesine sahip doğal maddeler ya da farklı işlenme süreçlerinden geçerek bu kapasiteye erişmiş eşyaların bütünüdür. Enerjiyi aktarabilen asalar, odak kristalleri ve tılsımlar, odaklayıcılara verilebilecek en yaygın örneklerdendir. Herhangi bir karakter için bir odaklayıcı olmadan büyü yapmak da mümkündür. Ancak odaklayıcı olmadan büyü yapmaya çalışan bir karakterin büyünün gerçekleşmesine yönelik zarlarına **DEZAVANTAJI** bulunur."
                  },
                  {
                    "type": "paragraph",
                    "text": "Büyü kullanımı iki farklı temele dayandırılır. Bu temeller, İsabet temelli büyüler ve enerji temelli büyüler olarak nitelendirilir."
                  },
                  {
                    "type": "heading",
                    "level": 3,
                    "text": "İsabet Temelli Büyüler"
                  },
                  {
                    "type": "paragraph",
                    "text": "Tekil bir hedef belirlenerek, bu hedefe isabet ettirilmeye çalışılan büyüleri ifade eden büyü tipleridir. Bu tip büyülerde her zaman ilk olarak İSABET becerisi baz alınarak bir zar kullanılır. Sonrasında büyüye yönelik enerjisel kuvvet ve duruma yönelik element, etki süresi vb. etkenler için ayrı zarlar kullanılabilir."
                  },
                  {
                    "type": "heading",
                    "level": 3,
                    "text": "Enerji Temelli Büyüler"
                  },
                  {
                    "type": "paragraph",
                    "text": "Genel olarak isabet gerektirmeksizin bir varlığa ya da bir bölgeye yoğunlaşarak belirli bir etkinin oluşturulmaya çalışıldığı büyülerdir. Bu tür büyüler, zihinsel saldırılar, bir alanda patlama, yanma, erime vb. etkiler oluşturma, bir madde üstünde farklı etkilere sebep olma gibi büyüleri içermektedir. İsabet temelli büyülerde olduğu gibi enerji temelli büyülerde de duruma göre alan, etki süresi, mesafe gibi farklı etkenler göz önünde bulundurularak farklı zar kullanımları eklenebilir."
                  },
                  {
                    "type": "heading",
                    "level": 3,
                    "text": "FİZİKSEL YETENEK & SAVAŞ SANATI KULLANIMI"
                  },
                  {
                    "type": "paragraph",
                    "text": "Sistemsel ve mantıksal olarak fiziksel yeteneklerle savaş sanatlarının kullanımı, büyülerden çok farklı değildir. Yeteneğin özelliklerine göre, yetenek için kullanılacak zar sayısı artış gösterebilir. Genel olarak zar kullanımları sırasıyla İSABET, KUVVET, MESAFE, BAŞARI şeklinde gelişebilmektedir."
                  },
                  {
                    "type": "heading",
                    "level": 3,
                    "text": "MÜCADELEDE ODAK & KONSANTRASYON"
                  },
                  {
                    "type": "paragraph",
                    "text": "Fiziksel ya da enerjisel bir yeteneğini odak/konsantrasyon durumunda bulundurmak, karakterlerin bu durumlara yönelik yuvalarını dolduran eylemlerdir. İki durum da birbirine süreç olarak benzerlik gösterebilse de bu durumların korunması konusu birbirinden farklılık gösterebilir."
                  }
                ]
              },
              {
                "id": "savas-sistemi",
                "title": "SAVAŞ SİSTEMİ",
                "mode": "rich",
                "blocks": [
                  {
                    "type": "heading",
                    "level": 2,
                    "text": "SAVAŞ SİSTEMİ"
                  },
                  {
                    "type": "image",
                    "src": "https://slvnz.github.io/resources/webpage/svg/hex-battle.svg",
                    "alt": "Altıgen savaş düzeni",
                    "caption": "Altıgen savaş düzeni"
                  },
                  {
                    "type": "paragraph",
                    "text": "SLVNZ 3.0'ın temel mücadele eylemlerinin ve hareketlerinin işlenmesinin temellerini **ALTIGEN** savaş sistemi oluşturur. Savaş sisteminde varlıkların her biri bir Altıgen içinde (Hex) yer alırlar ve birimlerin hareketleri, gerçekleşecek eylemlerin mesafeleri ve kapsayacakları alanlar **BİRİM** olarak belirlenmiş tekil altıgen yuvalar üzerinden hesaplanır."
                  },
                  {
                    "type": "heading",
                    "level": 3,
                    "text": "SAVAŞ DÜZENİ"
                  },
                  {
                    "type": "paragraph",
                    "text": "Savaş düzeninde, karakterin baktığı yöndeki ve bu yönün içerdiği birimin sağ ve sol bitişiğindeki birimler **net alan** olarak isimlendirilir."
                  },
                  {
                    "type": "list",
                    "ordered": false,
                    "items": [
                      "Karakter, net alandaki varlıklara normal şekilde fiziksel saldırıda bulunabilir.",
                      "Karakter, net alandan alacağı saldırılara karşı normal şekilde savunma & kaçınma hamleleri yapabilir."
                    ]
                  },
                  {
                    "type": "paragraph",
                    "text": "Karakterin baktığı yönün sağ ve sol arkasındaki birimler **eşik alan** olarak isimlendirilir."
                  },
                  {
                    "type": "list",
                    "ordered": false,
                    "items": [
                      "Karakter, eşik alandan gelen yakın mesafeli fiziksel saldırılara karşı -2 negatif değer alarak savunma gerçekleştirir.",
                      "Karakter, eşik alan tarafından gelecek uzun menzilli fiziksel saldırıyı yapacak kişinin orada olduğunun farkındaysa, gelen saldırıya karşı farkındalık zarı kullanır. Farkındalık 10'dan yüksek gelirse gelen fiziksel menzilli saldırıyı fark ederek kaçınmaya çalışabilir. Saldıranın okçuluk/atıcılık/isabet/nişancılık ve kuvvet yüksekliğine bağlı olarak saldırının başarı düzeyi belirlenir."
                    ]
                  },
                  {
                    "type": "paragraph",
                    "text": "Karakterin baktığı yönün tam tersinde — yani arkasında — kalan birim **kör alan** olarak isimlendirilir."
                  },
                  {
                    "type": "list",
                    "ordered": false,
                    "items": [
                      "Karakter, kör alandan gelen yakın mesafeli fiziksel saldırılara karşı, eğer saldırıyı yapan kişinin arkasında olduğunun farkındaysa dezavantaj ile kaçınma gerçekleştirmeye çalışır. **Bloklama** şeklinde bir savunma bu pozisyona karşı gerçekleştirilemez.",
                      "Karakter, kör alandan gelecek fiziksel bir uzak menzilli saldırıya karşı başka bir varlık tarafından tepki olarak uyarılmıyor veya buna özel bir sistemi yoksa savunma veya kaçınma gerçekleştiremez."
                    ]
                  },
                  {
                    "type": "heading",
                    "level": 3,
                    "text": "SAVAŞ EYLEMLERİ"
                  },
                  {
                    "type": "paragraph",
                    "text": "Bu savaş düzenine göre karakterler varsayılan olarak şunları gerçekleştirebilir:"
                  },
                  {
                    "type": "list",
                    "ordered": false,
                    "items": [
                      "İnsansı varlıkların temel hareket sınırı 4 birimdir. Niteliklerden her **+2 ÇEV** başına insansı varlıklar karasal hareketlerine **+1 birim hareket mesafesi** kazanır.",
                      "Çevresinde kendine gelen bir saldırıya karşı **TEPKİ EYLEM** kullanarak bakış yönünü saldırıya yönlendirebilir. Eğer **KÖR NOKTADAN** gelen bir saldırıya karşı yapıyorsa, savunma eylemine **-5** eksi değer alır.",
                      "Belirli bir yöne bakan bir varlık, görüş mesafesinde hareket eden bir varlığın turu boyunca gerçekleştireceği hareketi takip edecek şekilde tepki eylem olarak bakış yönünü değiştirebilir. Eğer eşik veya kör alandan yakın mesafesinde hareket eden bir varlık varsa (3-6 birim mesafe), pasif olarak kullanılacak bir **FARKINDALIK** zarı ile fark etmesi durumunda bu alanda hareket eden varlığa karşı da bakış yönünü tepki eylemle değiştirebilir.",
                      "Karakter, turunda **NET ALANDA** bulunan hedeflere saldırabilir. Karakterin kendi turunda yüzünü bir yöne dönmesi herhangi bir eylem türü ya da hareket puanı gerektirmez.",
                      "Karakter, **NET ALAN** sınırlarının dışına ayrılacak bir varlığa **TEPKİ EYLEM** olarak **FIRSAT SALDIRISI** gerçekleştirebilir. Karakter, fırsat saldırısı gerçekleştirirken yüzünü saldırdığı birim tarafına dönüp dönmeme konusunda seçim yapabilir. Fırsat saldırısı isabet eden hedefin hareketi iptal olur. Net alan dışındaki alanlarda hareket eden varlıklar fırsat saldırısını tetiklemez."
                    ]
                  },
                  {
                    "type": "image",
                    "src": "https://slvnz.github.io/resources/webpage/svg/hex-block.svg",
                    "alt": "Bloklama sistemi",
                    "caption": "Bloklama sistemi"
                  },
                  {
                    "type": "heading",
                    "level": 3,
                    "text": "BLOKLAMA SİSTEMİ"
                  },
                  {
                    "type": "paragraph",
                    "text": "Fiziksel mücadelelerde kaçınma genel bir standarda sahip basit bir yapıda olsa da bir kalkanla bloklamanın koşullara bağlı değişkenlikleri bulunmaktadır. Bu değişkenler dahilinde, bloklama sistemi altıgen ve kare sistem üzerinde farklılıklarıyla incelenebilir. Kalkanlar genel kullanım şekilleriyle sol elde kuşanıldıkları için, şemalar sol kullanım üzerinden bir görsellik sunmaktadır. Kalkanın diğer tarafta kullanım durumunda, aynı sistem karakterin sağ tarafı için geçerlidir."
                  },
                  {
                    "type": "heading",
                    "level": 3,
                    "text": "Küçük Kalkanlar & Silahlar"
                  },
                  {
                    "type": "paragraph",
                    "text": "Küçük kalkanlar, karakteri önemli ölçüde kapatma özelliğine sahip olmadıkları için çoğunlukla bireysel ölçekte fiziksel saldırıları engellemek ve savuşturmak üzere kullanılır. Sonuçları bire bir aynı olmasa da silahlar ve küçük kalkanlar aynı sistem yapısına tabidir."
                  },
                  {
                    "type": "list",
                    "ordered": false,
                    "items": [
                      "Küçük kalkanlar bloklamak için ek puanlarını karakterin **ÇEV** niteliğinden edinirler.",
                      "Silahlar bu ek puanı kendilerine ait özel **BLOK** niteliğinden edinirler.",
                      "Daha büyük boyutta kalkanlarda bloklama eyleminin zarı düşük kalsa bile arada oluşacak puan farkına bağlı olarak kısmi başarı sağlanabilirken, silahlar ve küçük kalkanlarda kaçınma durumundaki gibi başarısız olunur."
                    ]
                  },
                  {
                    "type": "heading",
                    "level": 3,
                    "text": "Orta Kalkanlar"
                  },
                  {
                    "type": "paragraph",
                    "text": "Orta kalkanlar, karakteri önemli ölçüde kapatma özelliğine sahiptir. Bu özellikler hem ağırlıkları hem de büyüklükleri sebebiyle karakterin hareket kabiliyeti üzerinde **ÇEV** niteliğine eksi puan olarak yansımaktadır. Ancak, bu duruma karşılık olarak karaktere gelecek fiziksel hamlelerin çoğuna karşı korunak sağlamaktadır."
                  },
                  {
                    "type": "list",
                    "ordered": false,
                    "items": [
                      "Orta kalkan kullanan bir karakter, **NORMAL ALANLAR** tarafından gelecek yakın menzilli fiziksel saldırılara karşı normal şekilde **BLOK BONUSU** edinerek bloklama yapabilir.",
                      "Eğer karaktere gelecek saldırı **NET ALAN** tarafından geliyorsa, karakter bloklama eylemine **AVANTAJ** alır.",
                      "Eğer karaktere gelecek saldırı zor alan tarafından geliyorsa, karakter bloklama eylemine **DEZAVANTAJ** alır."
                    ]
                  },
                  {
                    "type": "heading",
                    "level": 3,
                    "text": "Kule Kalkanlar"
                  },
                  {
                    "type": "paragraph",
                    "text": "Kule kalkanlar, karakterlerin hareketlerini ve **ÇEV** niteliklerini önemli ölçüde düşürürken korunak durumunu aynı ölçüde yükselten yapıya sahiptir. Bir karakter, orta kalkanlarda olduğu gibi kule kalkanlarda da blok bonusu becerisi üzerinden bloklama gerçekleştirir, ancak kule kalkanı tam blok pozuna geçirdiği zaman stamina değeri tükenene ya da kalkan işlev görmez hale gelene kadar saldırıları kesinlikle bloklar."
                  },
                  {
                    "type": "heading",
                    "level": 3,
                    "text": "Bloklamada Dayanıklılık"
                  },
                  {
                    "type": "paragraph",
                    "text": "Bloklama, karaktere üstün korunak sağlasa da karakter tarafından kaynak kullanımı denetimi gerektiren bir süreçtir. Bir karakter, saldırı blokladıkça kalkanı üzerinde hasar alır. Kalkanın materyalinin zarar görmesinin yanı sıra, karakter arka arkaya kuvvetli saldırılar bloklamaya başlarsa DAY niteliği üzerinden bir mücadeleye girer. Bu mücadelede, bloklanan her kuvvetli saldırı sonrasında karakterin bir miktar stamina kaynağı geçici olarak tükenmeye başlar."
                  },
                  {
                    "type": "paragraph",
                    "text": "Karakter bu kaynağı tüketene kadar bloklama yapmayı tercih ederse, stamina kaynağı 0'a düştüğü zaman karakterin gardı kırılır ve kırılgan pozuna girer. Bu pozdayken alacağı sonraki ilk yakın menzilli saldırı kritik bir isabetle gerçekleşir. Eğer karakter stamina kaynağı tükenmeden blok yapmaya ara verirse, ara verdiği turlar boyunca sabit bir şekilde kaynağın eriyen miktarı yenilenmeye başlar."
                  },
                  {
                    "type": "image",
                    "src": "https://slvnz.github.io/resources/webpage/svg/square-battle.svg",
                    "alt": "Kare düzen savaş sistemi",
                    "caption": "Kare düzen savaş sistemi"
                  },
                  {
                    "type": "heading",
                    "level": 3,
                    "text": "KARE DÜZEN SAVAŞ SİSTEMİ"
                  },
                  {
                    "type": "paragraph",
                    "text": "Kare savaş sistemi, SLVNZ 3.0'ın mücadele eylemlerinin ve hareketlerinin işlenmesi için tercih edilebilecek bir alternatifi oluşturur. Savaş sisteminde varlıkların her biri bir Kare içinde yer alırlar ve birimlerin hareketleri, gerçekleşecek eylemlerin mesafeleri ve kapsayacakları alanlar birim olarak belirlenmiş tekil kare yuvalar üzerinden hesaplanır."
                  },
                  {
                    "type": "heading",
                    "level": 3,
                    "text": "Savaş Düzeni (Kare)"
                  },
                  {
                    "type": "paragraph",
                    "text": "Savaş düzeninde net alan, eşik alan ve kör alan haricinde **SOL** ve **SAĞ** birimler bulunur."
                  },
                  {
                    "type": "list",
                    "ordered": false,
                    "items": [
                      "Karakter, **BU ALANLARDAN** gelen fiziksel saldırılara karşı savunma yapmak için herhangi bir eksi puan almaz. Ancak saldırıyı savuşturma veya saldırıdan kaçınma süreçleri koşullara bağlı olarak değişiklik gösterir.",
                      "Karakter, elinin boş bulunduğu taraftan gelen bir saldırıya karşı kaçınma yapmak zorundadır. Saldırının geldiği taraftaki elinde en az orta boy kalkan bulunduruyorsa, bloklamayı avantajlı gerçekleştirir.",
                      "Karakter, altıgen sisteminde olduğu gibi sadece net alan sınırlarında bulunan varlıklara herhangi bir şekilde bakış yönünü değiştirmeden saldırıda bulunabilir. Ancak, silah bulundurduğu elinin olduğu tarafa da bakış açısını değiştirmeden saldırıda bulunabilir (Sol elinde silah bulunduran biri sol tarafa saldırabilir, ancak sağ tarafa saldırmak için o bölgeye net alan olacak şekilde yüzünü dönmelidir).",
                      "Karakter, bu alanlardan gelecek menzilli fiziksel saldırıların farkındadır ve yukarıdaki kuralları gözeterek savunma & kaçınma yapabilir."
                    ]
                  },
                  {
                    "type": "heading",
                    "level": 3,
                    "text": "ENERJİSEL SAVAŞ"
                  },
                  {
                    "type": "paragraph",
                    "text": "Enerjisel savaş, karakterlerin enerjisel yetenekler ile gerçekleştireceği savaş sürecidir. Enerjisel savaş süreci fiziksel yakın savaş sürecine kıyasla daha basittir ancak kendi incelikleri bulunmaktadır."
                  },
                  {
                    "type": "heading",
                    "level": 3,
                    "text": "Kaynak Kullanımı"
                  },
                  {
                    "type": "paragraph",
                    "text": "Enerjisel savaşta kısa sürede pek çok yetenek seri olarak sıralanarak kullanılmaktadır. Bu süreçte şu kurallar izlenmektedir:"
                  },
                  {
                    "type": "list",
                    "ordered": false,
                    "items": [
                      "Eğer kaynak tüketimi olan, aynı enerji türüne ait bir yetenek arka arkaya 2 seferden fazla kullanılırsa harcadığı kaynak değeri **X2** olacak şekilde katlanmaya başlar. Karakter, bu katlanmayı araya aynı enerjiyi kullanan bir **BAZBÜYÜ** ile karıştırır veya **FARKLI ENERJİ TÜRÜNDE** bir yetenek kullanırsa **SIFIRLAR**.",
                      "Karakterlerin **GÖREBİLDİKLERİ** hedefler bulunmaktadır. Görebildikleri hedefler üstünde **İSABET** ve **ODAKLANMA** gerektiren enerjisel yetenekler kullanılabilir.",
                      "Bir karakter, **FARKINDA** olduğu ancak **GÖREMEDİĞİ** bir hedef üstünde — eğer arada bir fiziksel/enerjisel engel yoksa — sadece **İSABET** becerisini kullanabileceği tipte yetenekler kullanabilir.",
                      "Bir karakter, ancak **GÖREBİLDİĞİ** bir hedef üstünde **ETKİ OLUŞTURAN** enerjisel yetenekler kullanabilir."
                    ]
                  },
                  {
                    "type": "heading",
                    "level": 3,
                    "text": "Konsantrasyon"
                  },
                  {
                    "type": "paragraph",
                    "text": "Karakterlerin uygulayacağı yeteneklerin bir kısmı, anında gerçekleşen etkiler haricinde **SÜREKLİ ETKİ** meydana getirebilir. Bu şekilde etki oluşturan yeteneklerde karakterin **KONSANTRASYON** sürecine girmesi gerekir. Konsantrasyon, bir karakterin mental olarak enerjisel etkinin varlığını sürdürmesi için ona odağını koruma sürecidir."
                  },
                  {
                    "type": "paragraph",
                    "text": "Bu süreçte karakter farklı eylemler gerçekleştirebilir, enerjisel veya fiziksel yetenekler kullanabilir. Ancak farklı bir konsantrasyon sürecine girecek olursa, mevcut konsantrasyonu **BOZULUR**. Aynı şekilde, bir karakter konsantrasyon sürecindeyken herhangi bir şekilde hasar alırsa **KONSANTRASYON TESTİ** zarı kullanır. Zarın **10 DEĞERİNİN ALTINDA** gelmesi durumunda, konsantrasyon bozulur. Bir karakterin **BİRDEN FAZLA KONSANTRASYON YUVASI** bulunabilir. Bir konsantrasyon yuvasını geliştirme konusunda gerekli deneyim puanını hesaplamak için \"**500** x **KONSANTRASYON SEVİYESİ**\" şeklinde bir formül kullanılır."
                  }
                ]
              },
              {
                "id": "karakter-gelisimi",
                "title": "KARAKTER GELİŞİMİ",
                "mode": "rich",
                "blocks": [
                  {
                    "type": "heading",
                    "level": 2,
                    "text": "KARAKTER GELİŞİMİ"
                  },
                  {
                    "type": "paragraph",
                    "text": "Oyuncular oyun boyunca karakterlerinin niteliklerini, becerilerini ve yeteneklerini geliştirebilirler. Bu geliştirme süreci, karakterin uygun antrenmanları gerçekleştirmesi sonucu toplayabileceği deneyim puanları ile mümkündür. Deneyim puanları, oyunun kaç yüzlü zar ile oynanmaya karar verildiği gözetilmeksizin, 20 yüzlü zar kullanılarak toplanır."
                  },
                  {
                    "type": "paragraph",
                    "text": "Karakterin gerçekleştirmek istediği antrenman türü GM tarafına önerilir ve kabul edilirse, karakter oyun süresince 6 saatlik bir çalışma süresine girer. Bu çalışma süresi boyunca arada verilen molalar haricinde bir kesinti yaşanması durumunda GM inisiyatifi ile deneyim puanı için kullanılacak zar türü değişebilir."
                  },
                  {
                    "type": "paragraph",
                    "text": "Karakterler girdikleri antrenman sonucunda +1 Yorgunluk Durumu puanı alırlar. Karakter yorgunken bir antrenman daha yapacak olursa bu durum karaktere +1 Yorgun Durumu puanı daha ekler. Bir karakterin yorgunluk durumu 2 puan veya daha fazla ise, antrenman yapamaz."
                  },
                  {
                    "type": "paragraph",
                    "text": "Karakterler zihinsel ve fiziksel olarak yorgunluk durumuna girebilirler. Meditasyon gibi eylemler dışında, bir karakterin enerjisel yetenekleri üstünde çalışması da vücuttaki enerji akışından dolayı karakteri fiziksel bir yorgunluğa sürükleyebilir. Bundan dolayı GM ile anlaşılarak belirlenen belirli antrenman türleri dışında enerjisel ve fiziksel yetenekler üstünde geliştirme çalışmaları karakteri 6 saat sonunda yoracaktır."
                  },
                  {
                    "type": "paragraph",
                    "text": "Karakterlerin gelişim süreçleri iki farklı kolda ve formüle ayrılmıştır. Bunlar Temel Gelişim ve Özel Gelişimdir."
                  },
                  {
                    "type": "heading",
                    "level": 3,
                    "text": "TEMEL GELİŞİM"
                  },
                  {
                    "type": "paragraph",
                    "text": "Temel gelişim, karakterlerin temel becerilerini, ekipman yetkinliklerini, enerjisel yetkinliklerini ve kaynak havuzlarını geliştirebileceği süreçleri kapsamaktadır. Bu süreç, karakterin gireceği en az 1 en çok 4 saatlik antrenman ya da meditasyon süreci sonunda atılan farklı yüzlü zarlar ile, SEVİYE x 100 Deneyim Puanı'na erişmeye çalışarak seviye atlayabileceği bir sistemdir."
                  },
                  {
                    "type": "paragraph",
                    "text": "**TEMEL NİTELİKLER**, temel gelişimin bu sistemi ile aynı biçimde ilerlese de gerektirdiği deneyim puanı bakımından çok daha ağırdır. Temel niteliklerde **KUV**, **ÇEV** ve **DAY**, sözü edilen antrenmanlarla geliştirilebilir. Ancak **İRD**, **ZEK** ve **İRF** nitelikleri daha özel yöntemler veya antrenmanlarla gelişir. Temel niteliklerin gelişmesi için gerekli deneyim puanı formülü **SEVİYE x 500** olarak işlenir."
                  },
                  {
                    "type": "paragraph",
                    "text": "Özellikle temel niteliklerin geliştirilmesi oldukça uzun bir süreç alabilmektedir. Bu durum göz önünde bulundurulduğunda, bir karakterin asıl özgünlüğünü diğer becerileri ve yeteneklerinin gelişimi ile gösterebileceği belirtilebilir. Özellikle yeni bir oyuna başlanırken veya yeni bir karakter oluşturulurken, GM'in temel nitelikler için ayrı bir Deneyim Puanı havuzu belirlemesi veya oyunculara doğrudan seviye sayısıyla nitelik sınırı vermesi (2 adet +1 nitelik ve 1 adet +2 nitelik, ya da niteliklere özel 2000 Deneyim Puanı gibi...) tavsiye edilir."
                  },
                  {
                    "type": "heading",
                    "level": 3,
                    "text": "ÖZEL GELİŞİM"
                  },
                  {
                    "type": "paragraph",
                    "text": "Özel gelişim, karakterlerin özel becerilerini geliştirebilecekleri bir gelişim sürecini kapsamaktadır. Bu süreç, temel gelişimdeki özel antrenmanlardan farklı olarak yaptıkça öğrenme ve gelişme modeli üstüne kuruludur. Yani, bir karakter özel becerisini kullandığı zaman attığı zar ile deneyim puanı kazanır. Bu bağlamda, temel olarak özel becerileri geliştirmek için gerekli deneyim formülü ise SEVİYE x 100 Deneyim Puanı şeklindedir. Ancak bütün özel beceriler karmaşıklık ve özellik bakımından eş olamayacağı üzere, üst seviyeler için gereken çarpan sayısı değişkendir."
                  },
                  {
                    "type": "heading",
                    "level": 3,
                    "text": "YETENEK GELİŞİMİ"
                  },
                  {
                    "type": "paragraph",
                    "text": "Enerjisel ve fiziksel olarak pek çok yeteneğin temel seviyesinin üstüne çıkılabilecek şekilde geliştirilme kapasitesi vardır. Bu gelişim süreci, GM tarafından belirlenen özel bir biçimde olabilirken, bazı yetenekler için sistem kapsamında belirtilmiştir. Geliştirilebilir tipte olan yetenekleri, yetenek açıklamalarında bulunan özel bir belirteç dahilinde fark edebilirsiniz."
                  },
                  {
                    "type": "paragraph",
                    "text": "Bir yeteneği geliştirmek, kimi zaman belirli bir temel niteliğin, becerinin ya da başka bir yeteneğin sınır bir seviyede olmasını gerektirebilir. Bunun haricinde bir yeteneği geliştirmek için bir sınır ya da şart yok ise klasik gelişim formülü uygulanır. Örneğin, 3. Seviyede olan bir yeteneği geliştirerek yeni bir etki ya da özelliğini ortaya çıkarabilmek, diğer bir yandan bu yeteneğin gücünü de artırabilmek için, karakterin bu yeteneği 4. Seviyeye yükseltmesi gerekir. Eğer bu yükseltme için sistem ya da GM tarafından belirlenmiş özel bir şart ya da sınır (KUVVET 3 puan olmalı, YIKIM enerjisi 4 puan olmalı, ATICILIK becerisi 2 puan olmalı vb.) bulunmuyorsa, 4x100=400 Deneyim Puanı toplaması gerekir."
                  },
                  {
                    "type": "paragraph",
                    "text": "Geliştirilmiş yetenekler, temel olan alt seviyelerinde kullanılabilir, ancak yüksek seviyelerinde açığa çıkan yeni etkiler ya da güçlerden faydalanmak için bu yetenekleri gelişmiş seviyelerinde kullanmak şarttır. Örnek olarak, temel seviyesi 4. Seviye olan Ateş Topu büyüsünü öğrenmiş bir karakter, bu büyünün ulaşabileceği menzili artırmak adına geliştirme yapmış durumda. Büyünün geliştirilmiş hali ile 5. Seviyede kullanma hakkı kazanırken 4. Seviye halini kullanma konusunda da hiçbir sorun yaşamamaktadır. Ancak, geliştirilmiş Ateş Topu büyüsünü 5. Seviyeye çıkardığı zaman fazladan menzile sahip bir ateş topu ortaya çıkarabilirken, 4. Seviyede kullandığında bu etkiye sahip olamaz."
                  }
                ]
              },
              {
                "id": "huner-kusurlar",
                "title": "HÜNER & KUSURLAR",
                "mode": "rich",
                "blocks": [
                  {
                    "type": "heading",
                    "level": 2,
                    "text": "HÜNER & KUSURLAR"
                  },
                  {
                    "type": "paragraph",
                    "text": "Karakterlerin arka plan hikâyelerinden, bazı yeteneklerinden, taşıdıkları eşyalardan ya da oyun içinde gelişebilecek başka durumlardan dolayı karakterlerin üstünde özel etkiler oluşabilir. Bu etkiler geçici, şartlı ya da kalıcı bir şekilde karakterin üstünde bulunabilir."
                  },
                  {
                    "type": "paragraph",
                    "text": "Bu durumlar, niteliklere, becerilere, yeteneklere ya da doğrudan oyuncunun rolsel durumuna etki edebilecek şeyler olabilir. Örneğin, bir gözü kör olan bir karakterin üstünde bulunan bir KUSUR durumu, karakterin görmeye yönelik FARKINDALIK beceri değerine -3 almasına sebep olabilir."
                  },
                  {
                    "type": "paragraph",
                    "text": "Bir diğer örnekte, karanlıkta görme yetisine sahip bir karakterin edinmiş olduğu avantaj durumu, karakterin soluk ışıkla aydınlanan bir ortamda görmeye dayalı FARKINDALIK zarlarına artı değer almasını sağlayacaktır."
                  },
                  {
                    "type": "paragraph",
                    "text": "Bunların dışında rolsel ya da durumsal olarak, karakterlerin hastalık durumları ve bu durumlardan zaman zaman yaşayabilecekleri sıkıntılar, bazı durumlara duyarlı oluşları sebebiyle daha etkin olabilme durumları vb. olaylar hüner, avantaj ve kusurlara dahil edilebilir."
                  }
                ]
              },
              {
                "id": "siniflar",
                "title": "SINIFLAR",
                "mode": "rich",
                "blocks": [
                  {
                    "type": "heading",
                    "level": 2,
                    "text": "SINIFLAR"
                  },
                  {
                    "type": "paragraph",
                    "text": "SLVNZ 3.0'da keskin hatlarıyla sınıflar bulunmasa da oyun dünyasında becerileri ve gerçekleştirebildikleri yeteneklerin sistemleri sebebiyle birbirinden ayrılabilecek sınıfsal yapılar mevcuttur. Farklı TTRPG sistemlerindeki gibi çok net ilerleme yolları olmayan bu sınıflar birbiriyle harmanlanabilir."
                  },
                  {
                    "type": "paragraph",
                    "text": "Ancak bu sınıf tanımlamaları oyun sisteminde katı bir şekilde izlenecek sınıf sınırları çizmemektedir. Sadece oyun sistemi dahilinde ve oyun evreninde karşılaşılabilecek genel arketipleri belirtmektedir. Oyuncular GM ile ortak bir çalışma sonucunda belirtilen sınıf arketiplerinin altsınıflarını ya da tamamen yeni sınıf yapıları oluşturabilirler."
                  },
                  {
                    "type": "tabs",
                    "tabs": [
                      {
                        "label": "BARBAR",
                        "blocks": [
                          {
                            "type": "paragraph",
                            "text": "Barbarlar, genellikle saf kuvvet ve dayanıklılık üstüne kurulmuş karakterlerin oluşturduğu bir sınıftır. Bir karakterin barbar sınıfı olduğunun en büyük göstergesi, kısmi kontrollü bir öfke krizine girebilme kapasiteleridir. Bir barbar, belirli aralıklarla kendi öfkesini kontrollü olarak körükleyerek ÖFKE durumuna girebilir."
                          },
                          {
                            "type": "paragraph",
                            "text": "Öfke durumundayken barbar bir karakter KUVVET ve DAYANIKLILIK niteliklerine önemli fazlalıklar alırken, ZİHİN ve FARKINDALIK gibi nitelik ile becerilerine de benzer şekilde eksi değerler edinir. Tabii ki bu nitelik ve beceri değişimleri karakterin oluşturduğu barbar mekaniğine göre değişkenlik gösterebilir. Bu durum tamamen oyuncunun yaratıcılığı ile GM'in oyun dünyasında bu yaratıcılığın dengelenmesini sağlamasıyla ilgilidir."
                          },
                          {
                            "type": "paragraph",
                            "text": "Örneğin, bir barbar enerjiye hükmetme konusunda bazı yeteneklere sahiptir. Bu barbarın öfke patlaması durumlarında, normalde kullanma imkânı olmayan bazı büyüleri kullanabilme kabiliyeti ortaya çıkar. Öfke durumundayken YIKIM enerjisi ile ZİHİN niteliği artarken, KUVVET ve ÇEVİKLİK nitelikleri düşüş yaşayabilir. Bu ve buna benzer mekanikler tamamen karakteri oluşturan oyuncunun yaratıcılığına bağlıdır. GM ise bu yaratıcı mekaniğin oyun dünyasına ve genel güç dengelerine etkisini gözeterek mekaniği kabul etmek, reddetmek ya da farklı düzenlemelerle dengeleyerek oyuncuya yenilemekle sorumludur."
                          }
                        ]
                      },
                      {
                        "label": "SAVAŞÇI",
                        "blocks": [
                          {
                            "type": "paragraph",
                            "text": "Savaşçılar, oyun dünyasının çoğu bölgesinde karşılaşılabilecek, klasik olarak nitelendirilebilecek yakın dövüşçüler ya da menzilli maceracılardır. Ancak, savaşçı bir karakterin de kendini farklı yönlerde geliştirme ve yeteneklerini ilginçleştirme olasılığı oldukça yüksektir."
                          },
                          {
                            "type": "paragraph",
                            "text": "Bütün sınıflarda olduğu gibi savaşçı sınıfı oynamak isteyen bir oyuncu kendince bir mekanik geliştirip bu mekaniği GM'e sunarak oyun hayatına geçirebilir. Var olan yetenekleri ve hareket kitlerini kendince değiştirerek ya da geliştirerek yeni yaklaşımları ortaya çıkarabilir. Bir savaşçı yakın mesafede kılıç, kalkan, gürz vb. silahlarla dövüşen biri olabilirken, uzak menzilden yay, tatar yayı, tüfek vb. araçlarla ekibine destek veren birisi olabilir. Bunların yanı sıra, oyuncunun yaratıcılığına bağlı olarak farklı enerjisel yönlendirmeleri de mekaniğin içine dahil edebilir. Savaşçılar, genel yapılarıyla fiziksel yetenekleri ve yetkinlik yeteneklerini kullanarak fiziksel mücadelenin gidişatına yön verebilirler."
                          }
                        ]
                      },
                      {
                        "label": "KUTBAN & RUHBAN",
                        "blocks": [
                          {
                            "type": "paragraph",
                            "text": "Kutban ve ruhbanlar, sahip oldukları güçleri ve enerjilerini kadimlerden alan karakterlerdir. Bu karakterler, dini olarak inandıkları ve ibadet ettikleri bir kadim ile zaman zaman manevi bağlantılar kurarak onların bilgisine, gücüne ve kudretine sahip olurlar. Ancak bu güç ve kudret, yalnızca yolunda yürüdükleri kadimlerin ilkelerini uyguladıkça ve onları idame ettirdikçe bu karakterlerle birlikte olabilir."
                          },
                          {
                            "type": "paragraph",
                            "text": "Kutban ve ruhbanların kullandıkları büyüler, enerjilerini İNANÇ üstünden alır. İNANÇ enerjisi, karakterin ibadet ettiği kadime olan inancının kuvvetinden, bu kuvvetin kadimin varlığı ile karakterin arasında oluşan bir bağdan sağlanan bir enerji türü olarak kabul edilebilir. İNANÇ enerjisini kullanarak büyülerini gerçekleştirmek için, odaklayıcı olarak tılsımlarını kullanırlar."
                          },
                          {
                            "type": "paragraph",
                            "text": "Kutban ve ruhbanlar, sahip oldukları büyüleri geliştirmek ya da yeni büyüler öğrenmek için kadimleriyle manevi bir bağ kurabilecekleri ritüeller yaparlar. Bu ritüeller kimi zaman bazı materyaller ya da şartlar istese de bazen şarta ya da materyale bağlı kalmaksızın gerçekleştirilebilirler. Bu ritüellerden deneyim puanı toplanır. Karakterler topladıkları deneyim puanlarının öğrenmek istedikleri büyünün gerektirdiği miktara ulaşmasıyla, yeni yeteneklerini test eden manevi bir sınava tabi tutulurlar."
                          },
                          {
                            "type": "paragraph",
                            "text": "Bu sınav daha çok karakterin zihninde ya da manevi olarak çağırıldığı olağan dışı bir ortamda gerçekleşir. Gerçekleşen bu sınav sonunda karakterler başarılı bir şekilde geçmeleri durumunda yeteneği kullanılabilir biçimde öğrenmiş olurlar. Geçememeleri durumunda GM tarafından belirlenen yüzdelik bir dilim deneyim puanı karakterlerin hanelerinden silinerek yeniden denemeleri beklenir (Silinecek yüzdelik dilimin, karakterin sınavı tamamlamaya ne kadar yakın bir noktada başarısız olduğu gözetilerek belirlenmesi tavsiye edilir. Karakter başarıya ne kadar yakınsa, o kadar az miktarda deneyim puanı kaybetmelidir)."
                          }
                        ]
                      },
                      {
                        "label": "SİHİRBAZ",
                        "blocks": [
                          {
                            "type": "paragraph",
                            "text": "Sihirbazlar, evrendeki dengesiz enerjiye yön verme konusunda en temel bilgiye ve kontrole sahip olan kişilerdir. Enerjiyi yönlendirebilme yetilerini herhangi bir varlıktan ya da olağanüstü durumdan değil, doğrudan bu enerjiyi yönlendirebilmeye yönelik gelişen becerilerinden edinirler. Sihirbazlar, büyüyü öğrenme ve kullanma eğitimlerinde geçirdikleri süreçler sebebiyle büyü parşömenleri yazma konusunda yetkin olabilirler. Bu konuda yetkin olan bir Sihirbaz, enerjiyi yakalayabilen mürekkep ve parşömenler kullanarak büyü parşömeni üretebilirler."
                          },
                          {
                            "type": "paragraph",
                            "text": "Sihirbazlar genel eğitildikleri ya da kendilerini bir şekilde eğitebildikleri durumlarda pek çok enerji türüne hâkim olabilirler. Bu enerji türlerinde farklı büyüler yapabilir, başka Sihirbazların yazmış olacağı kitaplardan bu büyüleri öğrenebilir, normalde uzun sürebilecek büyü öğrenme sürelerini bu tipte unsurlar aracılığıyla oldukça kısaltabilirler."
                          },
                          {
                            "type": "paragraph",
                            "text": "Bir Sihirbaz, alacağı eğitimler yoluyla birkaç farklı konuda yetkinlik kazanabilir;"
                          },
                          {
                            "type": "heading",
                            "level": 3,
                            "text": "Büyü Parşömeni Üretimi"
                          },
                          {
                            "type": "paragraph",
                            "text": "Sihirbaz, bildiği büyüleri kâğıda dökerek başkaları tarafından kullanılabilir hale getirebilir."
                          },
                          {
                            "type": "heading",
                            "level": 3,
                            "text": "Büyü Üretimi"
                          },
                          {
                            "type": "paragraph",
                            "text": "Yeteri kadar yetkin bir Sihirbaz, var olmayan bir büyüyü üretme konusunda beceri sahibi olabilir. Ancak, var olmayan bir büyüyü ortaya çıkarmak, herhangi var olan bir büyüyü öğrenme sürecinden çok daha zorlayıcıdır. Bu süreç, bir büyü öğrenmedeki hareketlerin ve sözlerin yapılmaya çalışılması sürecine karşın büyüyü çalıştıracak sözlerin ve hareketlerin tasarlanmasını, belirlenen enerjiyi bu unsurlara entegre etmeyi ve bunu yeterli mana miktarı sağlayarak dengelemeyi kapsar."
                          },
                          {
                            "type": "paragraph",
                            "text": "Ayrıca bir Sihirbazın üretmek istediği büyünün enerji türüne de oldukça hâkim olması önemlidir. Bu durumu sağlamak için, Sihirbazın ilgili enerji niteliğinde en az +4 puana sahip olması gerekir. Bu duruma ilişkin şartları taşıyan Büyü Üretim Tablosu incelenebilir. Büyü üretmenin farklı aşamaları vardır. Bir Sihirbaz, eğer kapsamlı bir Sihirbaz akademisinde eğitim almışsa bu süreçler hakkında bilgilidir."
                          },
                          {
                            "type": "heading",
                            "level": 3,
                            "text": "Büyü Konsepti Belirleme"
                          },
                          {
                            "type": "paragraph",
                            "text": "Büyüyü üretmeye başlamadan önce, büyünün konsepti belirlenir. Bahsedilen konsept, büyünün işlevi, dolayısıyla kullanacağı enerji türüdür. Enerji türü belirlendikten sonra eğer büyü bir ritüel ise bu ritüelde kullanılacak malzemeler belirlenir. Büyü malzemeleri, benzer tipteki büyülerden ilham alınarak seçilebilir, benzer işlevdeki malzemeler ritüel büyüsünün üretilmesinde Sihirbaza kolaylık sağlayabilir."
                          },
                          {
                            "type": "heading",
                            "level": 3,
                            "text": "Araştırma ve Deney"
                          },
                          {
                            "type": "paragraph",
                            "text": "Gerekli belirlemeler yapıldıktan sonra enerjiyi istenilen şekilde yönlendirebilmek için araştırma ve deney safhası başlar. Araştırma kapsamında Sihirbaz, iç görü kazanmak adına büyü enerjisi ile ilgili eski metinleri inceleyebilir, bununla bilgili varlıklara danışabilir ya da doğrudan kendi başına deney yolu ile enerjiyi belirlediği konsept doğrultusunda yönlendirmeye çalışabilir. Bu süreçte oluşturmak istediği etki konusunda ne kadar başarılı olabildiğinin belirlenmesi için d20 zarlar kullanılır. Deney süreci için bir faz, klasik bir antrenman süresi olarak nitelendirilir ve büyü antrenmanının verdiği yorgunluk etkilerini verir."
                          },
                          {
                            "type": "paragraph",
                            "text": "Sihirbaz yukarıda bahsedilen süreçte başarılı olmak ya da bir sonuca ulaşmak için 100 deneyim puanına ulaşmalıdır. Ancak bu miktar, Sihirbazın başarmak istediği hedefin karmaşıklığına ya da enerji türüne göre GM tarafından değiştirilebilir. Örneğin, bir Sihirbaz, birden fazla enerji türünü bir arada kullanmaya çalışarak bir etki ortaya koymak isteyebilir. Böyle bir durumda deneyin bir sonuca ulaşması için Sihirbazın ulaşması gereken deneyim puanı hedefi 200 puana yükselebilir. Bir Sihirbaz nadir ya da hükmetmesi daha zor olan bir enerji türünde bir büyü ortaya çıkarmak isteyebilir; örneğin karanlık enerjiyi kullanarak bir büyü oluşturmak isteyen Sihirbazın da deney fazı için istenen değer 150 deneyim puanı gibi bir sınır olabilir."
                          },
                          {
                            "type": "heading",
                            "level": 3,
                            "text": "Büyü Eskizleme"
                          },
                          {
                            "type": "paragraph",
                            "text": "Sihirbaz, araştırmaları ve deneyleri sonucunda enerjiyi istediği kıvama sokabildikten ya da beklenmeyen bir sonuca ulaştıktan sonra belirlediği konsepte yönelik çalışacak veya ortaya çıkan beklenmeyen sonuçtan devam etme konusunda taslak oluşturacağı bir parşömen hazırlar. Bu parşömende büyünün genel etkilerini, varsa menzilini, süresini vb. unsurlarını kabaca belirler. Sihirbazın belirleyeceği bu unsurlar doğrultusunda büyünün MANA bedeli ve potansiyel seviyesi ortaya çıkar. Bu bedeli ve seviyeyi oyuncuya sunmak GM'in inisiyatifindedir."
                          },
                          {
                            "type": "heading",
                            "level": 3,
                            "text": "Test ve Geliştirme"
                          },
                          {
                            "type": "paragraph",
                            "text": "Büyünün kalan unsurları belirlendikten sonra Sihirbazın taslak olarak oluşturduğu büyüyü bir ortamda test etmesi gerekmektedir. Bu test süreci, Sihirbazın taslağı test edip geliştirerek istenmeyen etkileri değiştirdiği/geliştirdiği, istediği gibi toplanmayan enerjiyi dengelemek için taslakta farklı değişiklikler yaptığı, büyüye vermek istediği formu tekrarlayarak değiştirdiği bir süreçtir."
                          },
                          {
                            "type": "paragraph",
                            "text": "Sihirbazın büyüyü gerçekten üretme konusunda emek verdiği faz aslında bu aşamadır. Bütün etkileri, özellikleri, manası ve seviyesi belli olan büyünün tam anlamıyla hayata geçirilmeye başlandığı aşamadır. Bu aşamada, Sihirbaz tekrar bir antrenman sürecine girer gibi büyü üstünde çalışır ve her çalışma oturumunda d20 kullanır. Belirlenen büyü seviyesine göre 100 x Büyü Seviyesi olacak şekilde deneyim puanı toplanır. Bu sürecin sonunda, GM'in de inisiyatifi ile Sihirbazın üretmeye çalıştığı büyü bir sonuca bağlanır."
                          },
                          {
                            "type": "heading",
                            "level": 3,
                            "text": "Büyüyü Kalıcı Hale Getirme"
                          },
                          {
                            "type": "paragraph",
                            "text": "Büyüsünü üretmiş Sihirbaz isterse taslağını temiz bir parşömene geçirerek öğrenilebilir, başkaları tarafından çalışılabilir ya da geliştirilebilir bir hale getirebilir. Bu parşömenleri akademilere bağışlayabilir ya da farklı yerlere satabilir."
                          },
                          {
                            "type": "table",
                            "header": [
                              "BÜYÜ SEVİYESİ",
                              "GEREKLİ ENERJİ"
                            ],
                            "rows": [
                              [
                                "1-2",
                                "+4"
                              ],
                              [
                                "3",
                                "+5"
                              ],
                              [
                                "4",
                                "+6"
                              ],
                              [
                                "5",
                                "+7"
                              ],
                              [
                                "6",
                                "+8"
                              ],
                              [
                                "7",
                                "+9"
                              ],
                              [
                                "8",
                                "+10"
                              ],
                              [
                                "11+",
                                "+11+"
                              ]
                            ]
                          }
                        ]
                      },
                      {
                        "label": "SAHİR & SAHİRE",
                        "blocks": [
                          {
                            "type": "paragraph",
                            "text": "Sahirler & Sahireler, doğumlarından itibaren ya da yaşanan herhangi bir kaza/olay sonucu damarlarında akan kanın enerji taşımasıyla, herhangi bir odaklayıcıya ihtiyaç duymadan büyü yapabilme yeteneğine sahip olmuş karakterleri kapsayan bir sınıftır. Ancak, sahip oldukları bu doğayı kullanarak yapabildikleri enerji yönlendirmesinin yapısı normalin dışında olduğu için, bir büyüyü geliştirme ya da yeni bir büyü öğrenme konusunda geçirdikleri süreç, ayrıca bazı konularda büyüleri kullanma kapsamında yapabildikleri şeylerin bir kısmı normalden farklıdır."
                          },
                          {
                            "type": "paragraph",
                            "text": "Bir sahir/sahire, sahip olduğu doğa dolayısıyla büyü yapabilmek için herhangi bir odaklayıcı yardımıyla enerjiyi toplayıp yönlendirme işlemine ihtiyaç duymaz. Doğrudan damarlarında akan kan, dolayısıyla vücudu bu görevi üstlenir. Bu durum ise normal büyü kullanım kurallarını esneten ya da bozabilen bir yapıya sahiptir. Bahsedilen yapı sebebiyle, sahir/sahireler yeni büyüler öğrenme ya da bunları geliştirme konusunda kendi çabalarıyla sınırlıdırlar. Ancak, öğrenmeye çalıştıkları büyü ya da büyüye benzer bir yeteneği öğrenmiş başka birinden yardım alarak bu süreci hızlandırabilirler."
                          },
                          {
                            "type": "paragraph",
                            "text": "Sahirler ve sahireler, gelişimleri süresince vücutlarında olağan dışı etkileri uyandırabilir, bu etkileri kullandıkları büyülere işleyebilirler. Bahsedilen işlemelere ENERJİ AKIMI denir. Enerji akımları, sahir/sahirelerin kendilerini yormadan kısıtlı miktarda kullanabilecekleri becerileridir. Fiziksel ve enerjisel olarak dinlenmedikleri sürece vücutları enerji akımı için gerekli olan enerjiyi toplayamaz. Sınırından fazla kullanılması durumunda enerji akımı, karakterin vücudunu yorarak zarar vermeye başlar. Yorularak zarar gören karakterin vücudu, geri dönülemeyecek hasarlar alabilir."
                          },
                          {
                            "type": "heading",
                            "level": 3,
                            "text": "Enerji Akımları"
                          },
                          {
                            "type": "paragraph",
                            "text": "Sistemsel olarak sahir/sahirelerin yapabilecekleri enerji akımı türleri belirli sayıdadır. Ancak, oyuncunun yaratıcılığına ya da GM inisiyatifine göre yeni enerji akımları türetilebilir. Enerji akımları kullanılabilme ve takip edilebilme adına rakamlarla belirlenir. Bir sahir/sahire, temel seviyelerde 2 akım yükü barındırır."
                          },
                          {
                            "type": "paragraph",
                            "text": "Bu yükler, karakterin yapabildiği büyülerin seviyeleri arttıkça artar. Başlangıç olarak 2. Seviye iki büyü öğrenen bir karakter Enerji Akımlarını yapabilme kapasitesine sahip olur. Sonrasında artıracağı her büyü seviyesi için bu yüklere +2 kapasite ekler. Akım yüklerini tüketen bir karakter, yenilenmesini beklemeden diğer kaynaklarda olduğu gibi kullanımı sürdürebilir. Ancak bu durum bahsedildiği üzere karakterin vücuduna zarar vererek kalıcı hasarlara sebep olabilir."
                          },
                          {
                            "type": "paragraph",
                            "text": "Bu hasarlara örnek olarak kalıcı MANA azalması, zihinsel ya da bedensel zorlanmadan dolayı ZİHİN/DAYANIKLILIK niteliklerinde kalıcı eksilmeler, o anda yönlendirilmeye çalışılan enerjinin vücudu tahrip etmesi sonucu belirlenen enerji niteliğine verilen kalıcı eksi değer gibi hasarlar ortaya çıkabilir. Bu örnekler sadece GM için bir ilham niteliğindedir. Bu durumlar kullanılabilir ya da GM tarafından tamamen farklı etkiler ortaya çıkarılabilir. Sahir & Sahirelerin kullanabileceği enerji akımlarına YETENEKLER bölümünden ulaşabilirsiniz."
                          }
                        ]
                      },
                      {
                        "label": "SEHHAR",
                        "blocks": [
                          {
                            "type": "paragraph",
                            "text": "Sehharlar, yapı bakımından kutban ve ruhbanlara benzeyen, ancak sahip oldukları güçleri bir kadime olan inançları yerine üstün bir varlıkla olan anlaşmalarından edinen karakterlerdir. Bu bağlamda bir Sehhar, Patron olarak sıfatlandırılan üst varlıklarca bahşedilmiş güçleri onlarla yapacağı veya yapmış olduğu anlaşma kurallarınca kullanırlar. Sehharların kullandıkları güçlerce hükmettikleri enerji türü PAKT enerjisidir."
                          },
                          {
                            "type": "paragraph",
                            "text": "Sehharların anlaşma yapabilecekleri varlıkların sayısı ve nitelikleri oldukça geniş ve esnek olabilir. Bu durumda bir Sehhar oynamak isteyen oyuncu, GM ile anlaşarak oyun tarzına ve karakterinin olmasını istediği kişiliğe hitap eden bir patron talep edebilir. Bu talebe karşılık GM, hikâye dahilinde bir patronu oyuncu karakterine sunabilir ya da kendi inisiyatifinde bir patron oluşturabilir."
                          },
                          {
                            "type": "paragraph",
                            "text": "Bir Sehhar ile patronu arasındaki ilişki ile bağın en önemli noktası aralarında yapılmış olan anlaşmadır. Bu anlaşma, yüzlerce satırdan oluşmuş kapsamlı bir belge ya da birkaç maddeyle bağlanmış bir karar olabilir. Bu durum da doğrudan GM'in inisiyatifindedir. Ancak, evrende var olan bazı patronlar kullanılacaksa, bu patronların anlaşmalarının baz alınması önerilir."
                          },
                          {
                            "type": "paragraph",
                            "text": "Sehhar ile patronu arasında olan anlaşma gereği, sehhara sunulan gücün gelişimi, olağanüstü durumlar dışında sehharın patronunu tatmin etmesine bağlıdır. Bu tatmin, patronun kişiliğine bağlı olarak onu eğlendirmek, ihtiyaçlarını karşılamak, vereceği görevleri yerine getirmek gibi durumlardan geçmektedir. Bahsedilen durumlar Olay olarak nitelendirilir. Sehharın ilgilenmek durumunda kalacağı olayların zorluk seviyeleri, olayların bir sonuca kavuşması sonunda farklı türlerde ödüller olarak sehhara geri dönüş sağlayacaktır. Bu ödüller; edinilen yeni güçler, verilen önemli bilgiler, eşyalar, silahlar vb. şeyler olabilir. Genel anlamda bir fikir edinilebilmesi için aşağıdaki tablo baz alınabilir."
                          },
                          {
                            "type": "table",
                            "header": [
                              "OLAY ZORLUĞU",
                              "OLAY ÖDÜLÜ"
                            ],
                            "rows": [
                              [
                                "Çok Basit",
                                "Teşekkür, bağın devamlılığı"
                              ],
                              [
                                "Basit",
                                "Basit eşyalar, az miktarda para, basit bilgi vb."
                              ],
                              [
                                "Orta",
                                "Basit büyülü eşyalar, Seviye Yükseltme, Enerji Artırma, Değerli Bilgi vb."
                              ],
                              [
                                "Zor",
                                "Nadir Büyülü Eşyalar, Seviye Yükseltme, Enerji Artırma, Nadir veya Gizli Bilgi, İyi Miktarda Para vb."
                              ],
                              [
                                "Çok Zor",
                                "Nadir ya da Efsanevi Büyülü Eşyalar, Seviye Yükseltme, Enerji Artırma, Kıdem Kazanma, Efsanevi Bilgi, Fazla Miktarda Para vb."
                              ],
                              [
                                "Neredeyse İmkansız",
                                "Akla gelemeyecek tuhaf şeyler. Kim bilir, belki de Patron ile mistik bir akşam yemeği?"
                              ]
                            ]
                          }
                        ]
                      },
                      {
                        "label": "CADI",
                        "blocks": [
                          {
                            "type": "paragraph",
                            "text": "Cadılar, büyüyü öğrenme, kullanma ve geliştirme yapısı olarak büyücülere oldukça benzerlik gösterirler. Ancak, büyücülerden farklı olarak var olan bir büyünün yapısını bozarak büyüyle ilgili tamamen farklı etkileri ortaya çıkarabilirler. Bu durum, bir büyücü ile bir sahirin özelliklerinin harmanlanmış versiyonu olarak düşünülebilir fakat hem büyücü hem sahir sınıfını aynı anda barındırmakla aynı ya da ilgili değildir."
                          },
                          {
                            "type": "paragraph",
                            "text": "Cadılar, büyüye hükmederken onu bozmak için enerjinin doğada bulunan en vahşi ve ölümcül halini yönetmeye çalışırlar (Karanlık Enerji). Karanlık enerjiyi kontrol edebilmek için —efsanelerce öngörülen, karanlık enerjinin bir şekilde bilinç kazanıp kullanılmak istemesi sonucunda oluşturduğu bir dil olan— kara lisanı bilmek gereklidir. Kara lisanı bilmek, sadece bir dil bilmenin yanı sıra, cadının psikolojik bir çarpışmaya girmesini de gerektirir."
                          },
                          {
                            "type": "paragraph",
                            "text": "Çünkü bir karakter, kara lisanı kullanmaya ya da onunla etkileşime geçmeye çalıştığı her zaman, zihninin kapılarını karanlık enerjinin hüküm sürdüğü diyarlara aralayarak onu davet eder. Bu süreçte, karanlık enerji karakterin zihnine ve vücuduna erişerek manipüle etmeye çalışır. Eğer karakter kendi dışında bu enerjiyi doyurabilecek bir kaynak bulamazsa, kendisi doğrudan kaynak olur. Diğer bir söylemle, karanlık enerjinin kullanımı MANA dışında önemli farklı kaynaklar gerektirir. Bu kaynaklar genel olarak herhangi bir canlının yaşamıdır."
                          },
                          {
                            "type": "paragraph",
                            "text": "Bu nedenle, genellikle kara büyüyü kullanma konusunda yetkinleşmiş cadıların kara büyü kullanımları sırasında, ortamdaki ışığın solması, çevredeki canlılığın azalması gibi etkiler sıkça rastlanılan durumlardır. Eğer cadı çevredeki bir kaynak yerine kendi bedenini kaynak olarak kullanmayı tercih ederse, karanlık enerjiyi kullanarak gerçekleştirmeye çalıştığı kara büyüyü oluşturduğu bölgeden başlayacak şekilde vücudundaki yaşamı tüketerek çürütür. Bu çürüme, yine cadı tarafından öğrenilebilecek üst yöntemlerle iyileştirilebilecek bir durumdur, ancak bu yöntemlere sahip olmayan bir varlığın bu çürümeye farklı bir çare bulması neredeyse imkansızdır."
                          },
                          {
                            "type": "paragraph",
                            "text": "Bir cadı ile büyücünün büyü gelişimi konusunda farklarından bahsedilmesi gereklidir. Bu farklar genel hatları ile; bir büyücü ateş topu büyüsünün menzilini artırmak, kuvvetini güçlendirmek, etki alanını yükseltmek gibi geliştirmeler yapabilirken; bir cadı ateş topunun elementini değiştirme, düştüğü alanda farklı etkiler (korku, hastalık, lanet vb.) oluşturma, isabet eden hedeflerin niteliklerini çalma gibi etkileri uyandırmak için büyünün yapısını bozar."
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          "yetenekler": {
            "label": "YETENEKLER",
            "blurb": "Karakterlerin sahip olabileceği güçlerin ve uzmanlıkların kataloğu.",
            "items": [
              {
                "id": "enerjisel-yetenekler",
                "title": "ENERJİSEL YETENEKLER",
                "mode": "table",
                "table": {
                  "columns": [
                    {
                      "id": "isim",
                      "label": "İSİM",
                      "type": "text",
                      "showInTable": true,
                      "snapZone": "none"
                    },
                    {
                      "id": "seviye",
                      "label": "SEVİYE",
                      "type": "number",
                      "showInTable": true,
                      "snapZone": "top"
                    },
                    {
                      "id": "yeni-alan-2",
                      "label": "EYLEM TÜRÜ",
                      "type": "text",
                      "showInTable": true,
                      "snapZone": "top"
                    },
                    {
                      "id": "tur",
                      "label": "TÜR",
                      "type": "text",
                      "showInTable": true,
                      "snapZone": "top"
                    },
                    {
                      "id": "yeni-alan",
                      "label": "KAYNAK",
                      "type": "text",
                      "showInTable": true,
                      "snapZone": "top"
                    },
                    {
                      "id": "maliyet",
                      "label": "BEDEL",
                      "type": "number",
                      "showInTable": true,
                      "snapZone": "top"
                    },
                    {
                      "id": "yeni-alan-3",
                      "label": "SÜRE",
                      "type": "text",
                      "showInTable": true,
                      "snapZone": "top"
                    },
                    {
                      "id": "yeni-alan-4",
                      "label": "MENZİL",
                      "type": "text",
                      "showInTable": true,
                      "snapZone": "top"
                    },
                    {
                      "id": "yeni-alan-5",
                      "label": "ALAN",
                      "type": "text",
                      "showInTable": false,
                      "snapZone": "top"
                    },
                    {
                      "id": "aciklama",
                      "label": "AÇIKLAMA",
                      "type": "textarea",
                      "showInTable": false,
                      "snapZone": "bottom"
                    },
                    {
                      "id": "yeni-alan-6",
                      "label": "NOT",
                      "type": "textarea",
                      "showInTable": false
                    }
                  ],
                  "rows": [
                    {
                      "_id": "r1",
                      "isim": "Alev Oku",
                      "tur": "Yıkım",
                      "seviye": 0,
                      "maliyet": 0,
                      "aciklama": "İşaret ettiğin hedefe doğru fırlayacak basit bir ateşten ok fırlatırsın. Bu okun delici niteliği olmasa da, çarptığı zaman Ateş Hasarı verir.",
                      "yeni-alan-2": "Eylem",
                      "yeni-alan": "Mana",
                      "yeni-alan-3": "Anlık",
                      "yeni-alan-4": "12 Birim",
                      "yeni-alan-5": "Tekil",
                      "yeni-alan-6": ""
                    },
                    {
                      "_id": "r2",
                      "isim": "Temizlik (R)",
                      "tur": "Dönüştürme",
                      "seviye": 0,
                      "maliyet": 0,
                      "aciklama": "Bir süre odaklanacağın bir alandaki kirler, lekeler, tozlar gibi etkileri ortadan kaldırmak üzere yoğunlaşırsın. Basit lekeler veya kirler (Tozlar, hafif lekeler vb.) 1 dakialık yoğunlaşma sonucunda alandan temizlenir. Çıkarması daha zor olarak değerlendirilebilecek lekeler için GM tercihinde yoğunlaşma süresi değişebilir, hatta bazı lekeler veya kirler bu yetenekle temizlenemeyebilir.",
                      "yeni-alan-2": "Eylem",
                      "yeni-alan": "Mana",
                      "yeni-alan-3": "1 Dakika",
                      "yeni-alan-4": "1 Birim",
                      "yeni-alan-5": "1 Birim Kare",
                      "yeni-alan-6": ""
                    },
                    {
                      "_id": "r3",
                      "isim": "Işık (K)",
                      "tur": "İllüzyon",
                      "seviye": 0,
                      "maliyet": 0,
                      "aciklama": "En fazla yarım insan hacminde dokunacağın bir nesne, süre boyunca ışık yaymaya başlar. Işık yayma sırasında, nesnen 6 birim yarıçaplı çevresi Aydınlık Işık olarak, bu sınırdan uzaklaşan 3 birim uzaklıktaki çevresi ise Loş Işık olarak aydınlanır.",
                      "yeni-alan-2": "Eylem",
                      "yeni-alan": "Mana",
                      "yeni-alan-3": "10 Dakika",
                      "yeni-alan-4": "Dokunma",
                      "yeni-alan-5": "6 Birim Yarıçaplı Küre",
                      "yeni-alan-6": ""
                    },
                    {
                      "_id": "rmprclpkrb8fq",
                      "isim": "Mesaj",
                      "seviye": 0,
                      "yeni-alan-2": "Eylem",
                      "tur": "Dönüştürme",
                      "yeni-alan": "Mana",
                      "maliyet": 0,
                      "yeni-alan-3": "Anlık",
                      "yeni-alan-4": "12 Birim",
                      "yeni-alan-5": "Tekil",
                      "aciklama": "Gözünle görebileceğin ve menzilde olan bir hedefe toplam 25 kelimeden oluşabilecek bir mesaj iletirsin. Bu mesaj, senin tarafından normal konuşma şeklinde oluşur ancak hedef bu konuşmayı zihninde duyar. Konuşmayı sonlandırmanla yeteneğin etkisi tamamlanır, hedef sana karşılık veremez.",
                      "yeni-alan-6": ""
                    },
                    {
                      "_id": "rmprdoa8d1a2b",
                      "isim": "Silah Çağır",
                      "seviye": 0,
                      "yeni-alan-2": "EYLEM",
                      "tur": "OLUŞTURMA",
                      "yeni-alan": "MANA",
                      "maliyet": 0,
                      "yeni-alan-3": "ANLIK",
                      "yeni-alan-4": "KENDİN",
                      "yeni-alan-5": "",
                      "aciklama": "1 ay boyunca varlığı üstüne sinmiş, sürekli yanında taşımış olduğun bir silahı büyü ile kendine bağlayabilirsin. Silahla fiziksel olarak etkileşimdeyken, bu büyüyü kullanarak bağladığın silahını yok edebilir, aynı şekilde tekrar elinde oluşturabilirsin.\n\nFiziksel olarak temas halinde değilsen, silahını yok edip elinde tekrar oluşturamazsın. Bir ay boyunca başka bir silahı üstüne sindirip bağlanman halinde bir önceki silahın bağı kesilir.",
                      "yeni-alan-6": "Özel Yetenek: Bu yeteneği kullanabilmek için hikâyesel ya da sınıfsal olarak özel bir durumda olmak gerekir. Özel durumları oyun yöneticiniz ile konuşarak öğrenebilir ve karakterinizin öğrenmesi için anlaşabilirsiniz."
                    },
                    {
                      "_id": "rmprdqgzk8vx8",
                      "isim": "Ürperten Pençe",
                      "seviye": 0,
                      "yeni-alan-2": "Eylem",
                      "tur": "Çürüme",
                      "yeni-alan": "Mana",
                      "maliyet": 0,
                      "yeni-alan-3": "Anlık",
                      "yeni-alan-4": "12 Birim",
                      "yeni-alan-5": "Tekil",
                      "aciklama": "Enerjisel olarak hedefinin önünde beliren bir el ona saldırır. Hedefin saldırıyı savuşturamaması durumunda enerjisel el hedefe kancalanır ve kancalandığı noktaya çürüme hasarı uygular. Ayrıca bir sonraki tur sana gelene kadar, elin kancalandığı hedefin üstündeki iyileştirme etkileri etkisiz kalır veya zayıflar.",
                      "yeni-alan-6": ""
                    },
                    {
                      "_id": "rmprdr4pzozzu",
                      "isim": "Eldritch Patlaması",
                      "seviye": 0,
                      "yeni-alan-2": "Eylem",
                      "tur": "Pakt",
                      "yeni-alan": "Mana",
                      "maliyet": 0,
                      "yeni-alan-3": "Anlık",
                      "yeni-alan-4": "24 Birim",
                      "yeni-alan-5": "Tekil",
                      "aciklama": "Menzilinde görebileceğin bir hedefe ellerinden fırlayacak konsantre bir basınç öbeği fırlatırsın. Bu basınç öbeği çarpma halinde hedefe basınç hasarı uygular.\n\nBu büyüyü üst seviyelerde farklı etkilerini uyandırabilecek biçimde geliştirmeye çalışabilirsin.",
                      "yeni-alan-6": "Özel Sınıflar: Sehhar, Cadı (Yıkım ya da Karanlık Enerji)"
                    },
                    {
                      "_id": "rmprdrwglo8y0",
                      "isim": "Buz Işını",
                      "seviye": 0,
                      "yeni-alan-2": "Eylem",
                      "tur": "Yıkım",
                      "yeni-alan": "Mana",
                      "maliyet": 0,
                      "yeni-alan-3": "Anlık",
                      "yeni-alan-4": "12 Birim",
                      "yeni-alan-5": "Tekil",
                      "aciklama": "Menzilinde görebileceğin bir hedefe ellerinden fırlayacak bir buzul ışın yönlendirirsin. İsabet halinde hedef donma hasarı alır ve dayanıklılık zarı kullanır. Zarı senin büyü kuvvetini geçemezse hareket hızı yarıya iner.",
                      "yeni-alan-6": ""
                    },
                    {
                      "_id": "rmprdsimr5mxa",
                      "isim": "Ayaz",
                      "seviye": 0,
                      "yeni-alan-2": "Eylem",
                      "tur": "Yıkım",
                      "yeni-alan": "Mana",
                      "maliyet": 0,
                      "yeni-alan-3": "Anlık",
                      "yeni-alan-4": "12 Birim",
                      "yeni-alan-5": "Tekil",
                      "aciklama": "Menzilinde görebileceğin bir hedefe yoğunlaşırsın. Yoğunlaşma sonucunda hedefin üstünde oluşan bir don, hedefe donma hasarı uygularken DAYANIKLILIK testini geçemezse bir sonraki saldırısında eksi puan almasına sebep olur.",
                      "yeni-alan-6": ""
                    },
                    {
                      "_id": "rmprdt1x643sp",
                      "isim": "Sihirbaz Eli",
                      "seviye": 0,
                      "yeni-alan-2": "Eylem",
                      "tur": "Oluşturma",
                      "yeni-alan": "Mana",
                      "maliyet": 0,
                      "yeni-alan-3": "10 Dakika",
                      "yeni-alan-4": "6 Birim",
                      "yeni-alan-5": "Tekil",
                      "aciklama": "Menzilinde seçtiğin bir noktada spektral ve süzülen bir el belirir. El süre boyunca ya da eylem olarak sen savıncaya kadar kalır. Eğer senden 6 kareden fazla uzaklaşırsa ya da sen bu büyüyü tekrar kullanırsan el kaybolur.\n\nEylemini kullanıp eli kontrol edebilirsin. Eli bir nesneyi kullanma, kilitsiz bir kapıyı ya da kabı açma, açık bir kaptan eşya alma ya da yerine koyma, veya şişenin içeriklerini dökme gibi eylemler için kullanabilirsin. Eli her kullanışında 6 kareye kadar hareket ettirebilirsin.\n\nEl saldıramaz, büyülü nesneleri etkinleştiremez ya da 5 kilodan ağır nesneleri taşıyamaz.",
                      "yeni-alan-6": ""
                    },
                    {
                      "_id": "rmprdtu9fpwkf",
                      "isim": "Rehberlik (K)",
                      "seviye": 0,
                      "yeni-alan-2": "Eylem",
                      "tur": "İnanç",
                      "yeni-alan": "Mana",
                      "maliyet": 0,
                      "yeni-alan-3": "1 Dakika",
                      "yeni-alan-4": "Dokunma",
                      "yeni-alan-5": "Tekil",
                      "aciklama": "İstekli bir varlığa dokunursun. Süre bitmeden önce bir kereliğine, hedef 1d4 atıp sonucunu seçtiği bir yetenek zarına ekleyebilir. Bu d4'lük zarı yetenek zarından önce ya da sonra atabilir. Sonrasında büyü sona erer.",
                      "yeni-alan-6": ""
                    },
                    {
                      "_id": "rmprdukfz3ttd",
                      "isim": "Ufak İllüzyon",
                      "seviye": 0,
                      "yeni-alan-2": "Eylem",
                      "tur": "İllüzyon",
                      "yeni-alan": "Mana",
                      "maliyet": 0,
                      "yeni-alan-3": "1 Dakika",
                      "yeni-alan-4": "6 Birim",
                      "yeni-alan-5": "1 Birim",
                      "aciklama": "Menzilinde büyü süresince kalacak bir ses ya da bir nesne görüntüsü yaratırsın. İllüzyon, onu eylemini kullanıp savarsan ya da bu büyüyü yeniden kullanırsan sonlanır.\n\nEğer ses yaratırsan, bu bir fısıltıdan çığlığa kadar değişebilir. Bu senin sesin ya da başkasının sesi, bir aslan kükremesi, davul gürültüsü ya da seçeceğin herhangi bir ses olabilir. Oluşturduğun ses, süre boyunca kesilmeden devam edebilir.\n\nEğer sandalye, çamurlu ayak izleri ya da küçük bir sandık gibi nesnelerin görüntüsünü yarattıysan, bu 1 karelik küpten büyük olamaz. Görüntü ses, ışık, koku ya da herhangi bir duyusal etki yaratamaz. Görüntü ile fiziksel etkileşim onun bir illüzyon olduğunu ortaya çıkarır, çünkü nesneler içinden geçebilir.\n\nEğer bir varlık eylemini bu ses ya da görüntüyü incelemek için kullanırsa, büyünün kuvvetine karşılık araştırma zarı ile illüzyon olduğunu anlayabilir. Eğer bir varlık illüzyonun aslını farkederse, illüzyon o varlık için sönük hale gelir.",
                      "yeni-alan-6": ""
                    },
                    {
                      "_id": "rmprdv8rg486j",
                      "isim": "Kıvılcım",
                      "seviye": 0,
                      "yeni-alan-2": "Eylem",
                      "tur": "Yıkım",
                      "yeni-alan": "Mana",
                      "maliyet": 0,
                      "yeni-alan-3": "1 Dakika",
                      "yeni-alan-4": "-",
                      "yeni-alan-5": "-",
                      "aciklama": "Süre boyunca, parmaklarını her şıklatışında bir kıvılcım çıkarırsın. Çıkan bu kıvılcımla tutuşabilecek farklı nesneleri ateşe verebilirsin.",
                      "yeni-alan-6": ""
                    },
                    {
                      "_id": "rmprdw77kys6e",
                      "isim": "Kutsal Alev",
                      "seviye": 0,
                      "yeni-alan-2": "Eylem",
                      "tur": "İnanç",
                      "yeni-alan": "Mana",
                      "maliyet": 0,
                      "yeni-alan-3": "Anlık",
                      "yeni-alan-4": "12 Birim",
                      "yeni-alan-5": "-",
                      "aciklama": "Görüş mesafende odaklanacağın bir varlığın çevresinde ışıyan alevler oluşarak hedefine akın eder. Hedefin çeviklik kurtulması kullanarak bu akından kaçınabilir. Kaçınması halinde saldırından hasar almaz.",
                      "yeni-alan-6": "Özel Sınıflar: Ruhban, Kutban"
                    },
                    {
                      "_id": "rmprdwuj6ej0f",
                      "isim": "Kılıç Patlaması",
                      "seviye": 0,
                      "yeni-alan-2": "Eylem",
                      "tur": "Oluşturma",
                      "yeni-alan": "Mana",
                      "maliyet": 0,
                      "yeni-alan-3": "Anlık",
                      "yeni-alan-4": "-",
                      "yeni-alan-5": "1 Birim Çevre",
                      "aciklama": "Bir anlık etrafını çevreleyen kılıçlardan oluşan bir basınç alanı meydana getirirsin. Kılıçlar, sen merkezli olmak üzere 1 kare çember alanı etrafındaki herkese basınç hasarı uygular. Eğer enerji kuvveti doğal 20 gelirse, uygulanan hasar delme hasarına dönüşür.",
                      "yeni-alan-6": ""
                    },
                    {
                      "_id": "rmprdxokblpaz",
                      "isim": "Acımasız Alay",
                      "seviye": 0,
                      "yeni-alan-2": "Eylem",
                      "tur": "Efsun",
                      "yeni-alan": "Mana",
                      "maliyet": 0,
                      "yeni-alan-3": "Anlık",
                      "yeni-alan-4": "12 Birim",
                      "yeni-alan-5": "-",
                      "aciklama": "Görebildiğin bir varlığın zihnine erişerek büyüyle çevrelenmiş bir dizi hakaret yağdırırsın. Eğer hedef varlık seni duyabiliyorsa ve zeka değeri -3'ten yüksek ise İRADE testine girer. Sağır ya da zeka değeri -3'ten düşük olan varlıklar otomatik olarak başarılı sayılır. İRADE testinde başarısız olan varlıklar zihinsel hasar alır ve sonraki turunda gerçekleştireceği ilk saldırısı (yakın mesafe ya da uzak menzilli / büyü fark etmez) 1d4 eksi değer alır.",
                      "yeni-alan-6": ""
                    },
                    {
                      "_id": "rmprdyfje7aaq",
                      "isim": "Keskin Görüş",
                      "seviye": 0,
                      "yeni-alan-2": "Eylem",
                      "tur": "Kehanet",
                      "yeni-alan": "Mana",
                      "maliyet": 0,
                      "yeni-alan-3": "1 Dakika",
                      "yeni-alan-4": "Dokunma",
                      "yeni-alan-5": "-",
                      "aciklama": "Dokunacağın istekli bir varlık, süre boyunca görüşü kısıtlayacak etkileri yok sayar ve net görüş mesafesinin 2 katı uzağı görebilir.",
                      "yeni-alan-6": ""
                    },
                    {
                      "_id": "rmprebfxucgpu",
                      "isim": "Buz Bıçağı",
                      "seviye": 1,
                      "yeni-alan-2": "Eylem",
                      "tur": "Oluşturma",
                      "yeni-alan": "Mana",
                      "maliyet": 1,
                      "yeni-alan-3": "Anlık",
                      "yeni-alan-4": "12 Birim",
                      "yeni-alan-5": "1 Birim Çember",
                      "aciklama": "Elinde oluşturduğun buzdan bir bıçağı 12 kare mesafede gördüğün bir konuma ya da hedefe fırlatırsın. Eğer bir hedefe fırlattıysan, hedef kaçınma zarı kullanır. İsabet halinde bıçak anlık bir saplanma ve donma hasarı uygular, ardından 1 kare yarıçaptaki mesafeyi etkileyecek şekilde patlar. Çevrede bulunan varlıklar DAYANIKLILIK testine girerek patlamadan gelen donma hasarına dayanabilir.",
                      "yeni-alan-6": ""
                    },
                    {
                      "_id": "rmprech8garzn",
                      "isim": "Sihirbaz Zırhı",
                      "seviye": 1,
                      "yeni-alan-2": "Eylem",
                      "tur": "Koruma",
                      "yeni-alan": "Mana",
                      "maliyet": 1,
                      "yeni-alan-3": "8 Saat",
                      "yeni-alan-4": "Kendin",
                      "yeni-alan-5": "-",
                      "aciklama": "Dokunduğun bir varlığın etrafını saracak mana ve enerjiden oluşma bir zırh örersin. Bu zırh, fiziksel hasar dahil enerjisel hasarlara karşı koruyucudur. Genellikle saldırı altında kalınması durumunda vücuduna gelecek ortalama derecede fiziksel bir darbeyi ya da büyünün bır kısmını tutarak ölümcül hasar alınmasını engeller. \n\nBu yetenek bir kullanıcı tarafından sadece bir adet olacak şekilde var edilebilir. Sihirbaz zırhını önceden kullanmış bir büyücü, başka biri üzerinde bu büyüyü uygularsa bir öncekinin etkisi ortadan kaybolur.\n\nÜst seviyelere geliştirilebilirse zırhın koruyuculuğu artar ya da birden fazla kişiye tek seferde kullanılabilir.",
                      "yeni-alan-6": "Bu büyü vücudun çevresinde bir zırhın kaplayabileceği alanı kaplarken, ona benzer bir koruyuculuk oluşturmak üzere titreşimlerini bir zırhınkine yakın hale getirir. Bundan dolayı bu büyü, vücudun çevresini sert bir katman ile kapatan herhangi bir kıyafet/zırh varlığında kullanılırsa vücudun çevresinde yoğunlaşamayıp bozulur."
                    },
                    {
                      "_id": "rmpred6n4jxde",
                      "isim": "Dilleri Anla (K)",
                      "seviye": 1,
                      "yeni-alan-2": "Eylem",
                      "tur": "Kehanet",
                      "yeni-alan": "Mana",
                      "maliyet": 1,
                      "yeni-alan-3": "1 Saat",
                      "yeni-alan-4": "Dokunma",
                      "yeni-alan-5": "-",
                      "aciklama": "Büyü süresi boyunca, çevrende konuşulan bütün dilleri anlarsın. Ancak anlayabileceğin diller, büyünün beslendiği diller ile sınırlıdır. Bundan dolayı, büyünün kapsamadığı dilleri anlayamazsın.\n\nBu yetenek, yazılı metinleri de anlamanı sağlar ancak metni anlamak için yazılı olduğu yüzeye dokunman gerekir. Bu yöntemle yaklaşık 1 sayfa metni okumak 30 dakika alır. Bu etki sadece normal şekilde yazılmış diller için geçerlidir.  Şifrelenmiş şekillerle ya da sembollerle oluşturulmuş bulmaca vb. görselleri çözmeni sağlamaz.",
                      "yeni-alan-6": ""
                    },
                    {
                      "_id": "rmpree0p2ttic",
                      "isim": "Enerji Hissetme (K)",
                      "seviye": 1,
                      "yeni-alan-2": "Eylem",
                      "tur": "Kehanet",
                      "yeni-alan": "Mana",
                      "maliyet": 1,
                      "yeni-alan-3": "10 Dakika",
                      "yeni-alan-4": "Dokunma",
                      "yeni-alan-5": "6 Birim",
                      "aciklama": "Süre boyunca, senden 6 birim mesafe uzaklıktaki enerjileri hissedersin. Eğer hissedersen, bunun bir nesneden mi yoksa bir alandan mı geldiğini anlarsın. Bu enerjinin renginden hangi türde olduğunu anlayabilirsin.",
                      "yeni-alan-6": "- Turuncu: Yıkım\n- Buz Mavisi: Kehanet\n- Mor: Oluşturma\n- Yeşil: Koruma\n- Sarı: Dönüştürme\n- Pembe: Cezbetme\n- Mavi: İllüzyon\n- Açık Yeşil: Nekromansi\n- Altın: İnanç\n- Lacivert: Pakt\n- Koyu Kırmızı: Kan\n- Spektrum: Kaos\n- Siyah: Karanlık\n- Beyaz: Aydınlık\n- Turkuaz: Ruh\n- Kızıl: Yaşam"
                    },
                    {
                      "_id": "rmpreexidwq2c",
                      "isim": "Nazar (K)",
                      "seviye": 1,
                      "yeni-alan-2": "Ek Eylem",
                      "tur": "Çürüme",
                      "yeni-alan": "Mana",
                      "maliyet": 1,
                      "yeni-alan-3": "1 Dakika",
                      "yeni-alan-4": "16 Birim",
                      "yeni-alan-5": "-",
                      "aciklama": "Menzilde görebildiğin bir hedefi lanetlersin. Lanet süresi boyunca hedefin senden gelecek bir saldırıdan isabet alması halinde ek olarak çürüme hasarı alır. Ayrıca, büyüyü kullanırken bir nitelik ya da enerji türü seç. Hedefin, başarısız olması halinde seçtiğin nitelik ya da yetenek ile gerçekleştireceği eylemlerde eksi değer alır.\n\nBaşarılı olduğun bir hedefin üstünde kullanılacak bir lanet kaldırma yeteneği, lanet etkisinin kalkmasını sağlayabilir.",
                      "yeni-alan-6": ""
                    },
                    {
                      "_id": "rmprefuxjgzys",
                      "isim": "Hizmetkâr Bul (R)",
                      "seviye": 1,
                      "yeni-alan-2": "Ritüel",
                      "tur": "Oluşturma",
                      "yeni-alan": "Mana",
                      "maliyet": 1,
                      "yeni-alan-3": "24 Saat",
                      "yeni-alan-4": "-",
                      "yeni-alan-5": "-",
                      "aciklama": "1 Saatlik ritüelin ardından seçeceğin hayvan formunda oluşacak bir ruhani hizmetkar çağırırsın. Bu hizmetkar, ritüelin boyunca senin enerjisel çağrını duyarak kendi rızası ile sana bağlanır. Bulmayı arzuladığın hizmetkar türü şunlardan biri olabilir: Yarasa, kedi, yengeç, kurbağa, şahin, kertenkele, ahtapot, baykuş, yılan, sıçan, kuzgun, karga, örümcek, gelincik ya da kapibara. Beliren hizmetkar yüksek ihtimal ile arzuladığın türde olacaktır, ancak ufak bir pay ile arzuların haricinde olacak bir tür de karşına gelebilir (d20 ihtimalde 1 ve 2). \n\nHizmetkarın senden bağımsız olarak hareket eder ancak bir emir verdiğinde o emri uygular. Mücadele sırasında kendi inisiyatif sırasını alır. Saldırma eyleminde bulunamaz ancak diğer türlü eylemleri gerçekleştirebilir. Hizmetkar ölümcül hasar alması durumunda geri çağırılmamak üzere ortadan kaybolur.\n\nHizmetkarı geçici olarak savuşturabilir ve tekrar geri çağırabilirsin. Bu durumda hizmetkar, sadece kendisinin var olabileceği bir cep boyutta uykuya dalar. Bir eylem olarak hizmetkarı 6 kare mesafede tekrar çağırabilirsin. Bu durumdan ayrı olarak, hizmetkarı kalıcı olarak da savuşturabilirsin.",
                      "yeni-alan-6": "Gerekli Malzemeler: 5 kilo kömür (10 Altın) ve tütsü otları"
                    },
                    {
                      "_id": "rmpreh1mqo8vt",
                      "isim": "Korku Sal (K)",
                      "seviye": 1,
                      "yeni-alan-2": "Eylem",
                      "tur": "Efsun",
                      "yeni-alan": "Mana",
                      "maliyet": 1,
                      "yeni-alan-3": "1 Dakika",
                      "yeni-alan-4": "12 Birim",
                      "yeni-alan-5": "-",
                      "aciklama": "Hedefinde görebildiğin bir varlığın üzerindeki ölümlülük hissiyatını körüklersin. Hedefin irade zarı kullanır ve yetenek kuvvetini aşamazsa yetenek süresince senden korkmaya başlar. Bu korku durumu, varlığın sana karşı gerçekleştireceği eylemlerde negatif puan alması ya da -kurtulma ve kuvvet arasındaki fark 10 puandan fazla ise- doğrudan dezavantajlı zar kullanması ile sonuçlanır.\n\nBu varlık üzerinde duyguları bastıran bir büyü kullanılması, korku sal büyüsünün etkisinin sonlanmasına sebep olur.",
                      "yeni-alan-6": ""
                    },
                    {
                      "_id": "rmprehlbiyvyd",
                      "isim": "İnanç Kalkanı",
                      "seviye": 1,
                      "yeni-alan-2": "Eylem",
                      "tur": "İnanç",
                      "yeni-alan": "Mana",
                      "maliyet": 1,
                      "yeni-alan-3": "1 Dakika",
                      "yeni-alan-4": "-",
                      "yeni-alan-5": "-",
                      "aciklama": "Kadimine olan inancından güç alarak çevreni saracak bir bariyer meydana getirirsin. Bu bariyer, geoit şekilde vücudunun sınır alanlarına ulaşan, her yanını koruyan enerjisel bir alandır. Yeteneğin yapılma kuvveti, bu bariyerin dayanıklılığını belirler. Yetenek süresince, bariyere ya da bariyer arkasına geçme amacıyla yapılan her saldırı öncelikle inanç kalkanı tarafından bloke edilir. Eğer yapılan saldırı yeteri kadar kuvvetli ise, kuvvetinin bir kısmını kaybederek kalkanın arkasına geçip sana hasar verebilir.\n\nYeterli kuvvette olan ve kalkan arkasına geçemeyecek kadar kuvvetsiz olan her türlü saldırı, bariyerin saldırılan kısmını zayıflatarak çatlatır. Kuvvetsiz bir kalkan, bir noktasındaki çatlak kırıldığında ortadan kaybolabilirken, kuvvetli bir kalkan daha ağır durumları kaldırabilir ancak çatlağı açılan noktadan savunmasız kalır.",
                      "yeni-alan-6": ""
                    },
                    {
                      "_id": "rmprei8v2v91a",
                      "isim": "Yemek veya Su Oluştur (R)",
                      "seviye": 1,
                      "yeni-alan-2": "Ritüel",
                      "tur": "İnanç",
                      "yeni-alan": "Mana",
                      "maliyet": 1,
                      "yeni-alan-3": "24 Saat",
                      "yeni-alan-4": "-",
                      "yeni-alan-5": "-",
                      "aciklama": "Yetenek süresi boyunca 10 kişiye kadar doyurucu nitelikte yemek veya su oluşturursun. Bu besinler, süre sonuna veya metabolik olarak sindirilene kadar enerjisel nitelik taşır ve yeteneğin enerjisine bağlı durumda bulunur. Süre bitmeden veya sindirilmeden bu yetenek yeniden kullanılırsa, önceden yapılmış besinler ortadan kaybolur, yerine yenileri oluşur.\n\nBu durum, besinler tüketildikten sonra yaşanırsa, besinleri tüketmiş varlıklar aç hissetmeye başlarlar.",
                      "yeni-alan-6": ""
                    },
                    {
                      "_id": "rmprejegnb70i",
                      "isim": "Cadı Oku (K)",
                      "seviye": 1,
                      "yeni-alan-2": "Eylem",
                      "tur": "Yıkım",
                      "yeni-alan": "Mana",
                      "maliyet": 1,
                      "yeni-alan-3": "10 Tur",
                      "yeni-alan-4": "12 Birim",
                      "yeni-alan-5": "-",
                      "aciklama": "Menzilinde görebildiğin bir hedefe elinden çıkan yıldırımlar ile bağlanmaya çalışırsın. Hedef, kaçınma zarında başarısız olursa senden gelen yıldırımlar ile bağlanarak yıldırım hasarı alır. Süre boyunca turlarında eylemini bu etkiyi sürdürmek için kullanabilir ve bağlandığın hedefe otomatik olarak yıldırım hasarı vurmaya devam edebilirsin.\n\nYetenek, hedefin menzilden çıkması ya da konsantrasyonunu bozacak bir etki alman ile süresinden önce sonlanabilir.",
                      "yeni-alan-6": ""
                    },
                    {
                      "_id": "rmprek2x49ig9",
                      "isim": "Sis Bulutu (K)",
                      "seviye": 1,
                      "yeni-alan-2": "Eylem",
                      "tur": "Oluşturma",
                      "yeni-alan": "Mana",
                      "maliyet": 1,
                      "yeni-alan-3": "10 Tur",
                      "yeni-alan-4": "12 Birim",
                      "yeni-alan-5": "2 Birim Yarıçap",
                      "aciklama": "Menzilinde bulunan bir alanın merkezinden parlayarak anında yayılan bir sis bulutu oluşturursun. Bu bulut fiziksel yollarla dağıtılamaz.",
                      "yeni-alan-6": ""
                    },
                    {
                      "_id": "rmprel48zlqw4",
                      "isim": "Emir",
                      "seviye": 1,
                      "yeni-alan-2": "Eylem",
                      "tur": "İnanç",
                      "yeni-alan": "Mana",
                      "maliyet": 1,
                      "yeni-alan-3": "Anlık",
                      "yeni-alan-4": "6 Birim",
                      "yeni-alan-5": "-",
                      "aciklama": "Menzilinde görebildiğin bir varlığın iradesine hükmetmeye çalışarak ona bir emir verirsin. Bu emir şunlardan biri veya basit bir komut olabilir:\n- Bekle: Varlık turunda bir şey yapmaz ve turunu geçer.\n- Silah Bırak: Varlık, silahını yere bırakır.\n- Kaç: Varlık, senden aksi yöne koşar, mevcutsa depar atar.\n- Yere Yat: Varlık yere yatar.",
                      "yeni-alan-6": ""
                    },
                    {
                      "_id": "rmprelujwyh90",
                      "isim": "Sihirli Misil",
                      "seviye": 1,
                      "yeni-alan-2": "Eylem",
                      "tur": "Yıkım",
                      "yeni-alan": "Mana",
                      "maliyet": 1,
                      "yeni-alan-3": "Anlık",
                      "yeni-alan-4": "24 Birim",
                      "yeni-alan-5": "-",
                      "aciklama": "3 parmağından hızla fırlayarak eşzamanlı olarak vuracak misiller fırlatırsın. Misiller aynı anda çıktıkları için eşit kuvvet ve isabet niteliğine sahiptir. Ancak misilleri birden fazla varlığa gidecek şekilde fırlatabilirsin. Farklı rakibe isabet edecek her misil için varlıklar ayrı kaçınma kullanır, ancak bir varlığa birden fazla isabet edecek misiller için tek kaçınma kullanılır.",
                      "yeni-alan-6": ""
                    },
                    {
                      "_id": "rmpremk8lvy4b",
                      "isim": "Basınç Dalgası",
                      "seviye": 1,
                      "yeni-alan-2": "Eylem",
                      "tur": "Yıkım",
                      "yeni-alan": "Mana",
                      "maliyet": 1,
                      "yeni-alan-3": "Anlık",
                      "yeni-alan-4": "-",
                      "yeni-alan-5": "1 Birim",
                      "aciklama": "Sen merkezli olacak şekilde bitişiğindeki karelere yayılacak bir basınç dalgası patlatırsın. Alanda bulunan varlıklar DAYANIKLILIK testine girer. Testte başarısız olan varlıklar kuvvete bağlı olarak senden 3 kare kadar uzağa savrulurken basınç hasarı alır.",
                      "yeni-alan-6": ""
                    },
                    {
                      "_id": "rmpren3vadih5",
                      "isim": "Cezbet",
                      "seviye": 2,
                      "yeni-alan-2": "Eylem",
                      "tur": "Efsun",
                      "yeni-alan": "Mana",
                      "maliyet": 2,
                      "yeni-alan-3": "1 Saat",
                      "yeni-alan-4": "6 Birim",
                      "yeni-alan-5": "-",
                      "aciklama": "Menzilindeki bir insansı varlığı enerjinle cezbedersin. Cezbedeceğin varlık, doğadışı ve kendisinin fark edemeyeceği bir sıradışılıkla kendisini sana yakın ve dosyane hisseder. Bu varlığa zarar vermediğin sürece sana karşı iyimser yaklaşır. Ancak onunla kurmaya çalışacağın iletişim ya da çevresinde yapacağın eylemler, bu dosyaneliği sorgulamasına sebep olabilir.  Yeteneğin etkisi sona erdiğinde bu varlık senin tarafından cezbedildiğinin farkında olur.",
                      "yeni-alan-6": ""
                    },
                    {
                      "_id": "rmprenm9lrvud",
                      "isim": "Kavurucu Işın",
                      "seviye": 2,
                      "yeni-alan-2": "Eylem",
                      "tur": "Yıkım",
                      "yeni-alan": "Mana",
                      "maliyet": 2,
                      "yeni-alan-3": "Anlık",
                      "yeni-alan-4": "12 Birim",
                      "yeni-alan-5": "-",
                      "aciklama": "Parmaklarından sırayla fırlayarak hedeflerine sırayla akın eden 3 adet ışın fırlatırsın. Bu ışınlar, aynı anda fırlamadığı için birbirinden bağımsız isabet değerlerine sahiptir. Çıkacak her bir ışını farklı hedeflere yönlendirebilirsin. Ancak birden fazla ışını aynı hedefe yönlendirmen durumunda hedefin tek kaçınma zarı üzerinden isabet etkileşimi hesaplanır. Yani rakip bir kaçınma kullanır ve ışınların bağımsız isabet zarları bu eşiği geçmeye çalışır.",
                      "yeni-alan-6": ""
                    },
                    {
                      "_id": "rmpreoe95rcc5",
                      "isim": "Kart Spreyi",
                      "seviye": 2,
                      "yeni-alan-2": "Eylem",
                      "tur": "Oluşturma",
                      "yeni-alan": "Mana",
                      "maliyet": 2,
                      "yeni-alan-3": "Anlık",
                      "yeni-alan-4": "-",
                      "yeni-alan-5": "3 Birim 90 Derece Koni",
                      "aciklama": "Baktığın yöndeki alanda enerjisel olarak oluşmuş kartlar fırlatırsın. Alan içinde KAÇINMA testi başarısız olan varlıklar kartların isabeti ve patlamasıyla birlikte basıç hasarı alarak KÖRLEŞİRLER. Kaçınabilenler basıncın bir kısmından etkilenirler.",
                      "yeni-alan-6": ""
                    },
                    {
                      "_id": "rmprep1058roq",
                      "isim": "Sisli Adım",
                      "seviye": 2,
                      "yeni-alan-2": "Ek Eylem",
                      "tur": "Oluşturma",
                      "yeni-alan": "Mana",
                      "maliyet": 2,
                      "yeni-alan-3": "Anlık",
                      "yeni-alan-4": "6 Birim",
                      "yeni-alan-5": "-",
                      "aciklama": "Menzil mesafende görebildiğin bir noktaya sisler içinde kaybolup belirerek ışınlanırsın.",
                      "yeni-alan-6": ""
                    },
                    {
                      "_id": "rmprepjajw958",
                      "isim": "Fırtına Adımı",
                      "seviye": 3,
                      "yeni-alan-2": "Eylem",
                      "tur": "Oluşturma",
                      "yeni-alan": "Mana",
                      "maliyet": 3,
                      "yeni-alan-3": "Anlık",
                      "yeni-alan-4": "18 Birim",
                      "yeni-alan-5": "1 Birim",
                      "aciklama": "Görebildiğin bir noktaya fırtına gibi ışınlanarak konarsın. Konduğun ve ayrıldığın bölgenin merkezinin 2'şer birim bitişiğinde kalan alanda yüksek bir basınç patlaması oluşturursun. Bu bölgedeki alanlarda kalan varlıklar DAYANIKLILIK testini geçemezse kuvvete bağlı olarak 3 birime kadar uzağa fırlayarak yere serilirler.",
                      "yeni-alan-6": ""
                    },
                    {
                      "_id": "rmpreq85e7k3f",
                      "isim": "Kan Laneti: Maruzat",
                      "seviye": 2,
                      "yeni-alan-2": "Tepki Eylem",
                      "tur": "Karanlık",
                      "yeni-alan": "Mana",
                      "maliyet": 2,
                      "yeni-alan-3": "1 Dakika",
                      "yeni-alan-4": "6 Birim",
                      "yeni-alan-5": "-",
                      "aciklama": "Görüşündeki bir yaratık hasar aldığında reaksiyon olarak yaratığın o hasara dayanıklılığının azalmasını sağlarsın.",
                      "yeni-alan-6": "Özel Yetenek: Bu yeteneği kullanabilmek için hikâyesel ya da sınıfsal olarak özel bir durumda olmak gerekir. Özel durumları oyun yöneticiniz ile konuşarak öğrenebilir ve karakterinizin öğrenmesi için anlaşabilirsiniz."
                    },
                    {
                      "_id": "rmprer62x4laf",
                      "isim": "Gümüş Ayin (K)",
                      "seviye": 3,
                      "yeni-alan-2": "Eylem",
                      "tur": "Karanlık",
                      "yeni-alan": "Mana",
                      "maliyet": 3,
                      "yeni-alan-3": "1 Dakika",
                      "yeni-alan-4": "-",
                      "yeni-alan-5": "-",
                      "aciklama": "Silahını kanınla lekeleyerek aydınlıkla kuvvetlendirirsin. Silahın bir miktar ışık yansıtır. Çürüme hasarına karşı dayanıklı hale gelirsin. Çürümeyle ilgili varlıklar, ışıktan rahatsız olarak saldırılarından yanma hasarı alır.",
                      "yeni-alan-6": "Özel Yetenek: Bu yeteneği kullanabilmek için hikâyesel ya da sınıfsal olarak özel bir durumda olmak gerekir. Özel durumları oyun yöneticiniz ile konuşarak öğrenebilir ve karakterinizin öğrenmesi için anlaşabilirsiniz."
                    },
                    {
                      "_id": "rmprerzkuny49",
                      "isim": "Kan Laneti: Bağlama (K)",
                      "seviye": 3,
                      "yeni-alan-2": "Eylem",
                      "tur": "Karanlık",
                      "yeni-alan": "Mana",
                      "maliyet": 3,
                      "yeni-alan-3": "1 Dakika",
                      "yeni-alan-4": "6 Birim",
                      "yeni-alan-5": "-",
                      "aciklama": "Görebildiğin bir yaratığa hükmederek hareketini keser, reaksiyon almasını engellersin. Yaratık, irade testini geçememesi halinde her turunun başında otomatik olarak bu denemeyi tekrarlar.",
                      "yeni-alan-6": "Özel Yetenek: Bu yeteneği kullanabilmek için hikâyesel ya da sınıfsal olarak özel bir durumda olmak gerekir. Özel durumları oyun yöneticiniz ile konuşarak öğrenebilir ve karakterinizin öğrenmesi için anlaşabilirsiniz."
                    },
                    {
                      "_id": "rmpresqoj0f9w",
                      "isim": "Kan Laneti: Mahvoluş",
                      "seviye": 4,
                      "yeni-alan-2": "Eylem",
                      "tur": "Karanlık",
                      "yeni-alan": "Mana",
                      "maliyet": 4,
                      "yeni-alan-3": "Anlık",
                      "yeni-alan-4": "12 Birim",
                      "yeni-alan-5": "-",
                      "aciklama": "Bir yara açmış olduğun varlığa odaklanarak açtığın yaradaki kanın kaynamasını sağlarsın. Kan kaynarken yarayı dağlar, ancak kaynadıkça yanık etkisini artırarak yakma hasarı verir.",
                      "yeni-alan-6": "Özel Yetenek: Bu yeteneği kullanabilmek için hikâyesel ya da sınıfsal olarak özel bir durumda olmak gerekir. Özel durumları oyun yöneticiniz ile konuşarak öğrenebilir ve karakterinizin öğrenmesi için anlaşabilirsiniz."
                    },
                    {
                      "_id": "rmpreu1prw9h3",
                      "isim": "Yara Tesiri",
                      "seviye": 1,
                      "yeni-alan-2": "Eylem",
                      "tur": "Çürüme",
                      "yeni-alan": "Mana",
                      "maliyet": 1,
                      "yeni-alan-3": "Anlık",
                      "yeni-alan-4": "Dokunma",
                      "yeni-alan-5": "-",
                      "aciklama": "Dokunma veya kavrama saldırısı gerçekleştireceğin bir varlığa isabet edebilmen halinde doğrudan açılmış yaralarının genişlemesi veya derinlemesi için bir çürüme enerjisi tesir ettirirsin.",
                      "yeni-alan-6": ""
                    },
                    {
                      "_id": "rmpreunj8g2fc",
                      "isim": "Körlük & Sağırlık",
                      "seviye": 2,
                      "yeni-alan-2": "Eylem",
                      "tur": "Çürüme",
                      "yeni-alan": "Mana",
                      "maliyet": 2,
                      "yeni-alan-3": "1 Dakika",
                      "yeni-alan-4": "6 Birim",
                      "yeni-alan-5": "-",
                      "aciklama": "Menzilde görebildiğin bir varlığın duyularına tesir etmeye çalışıp onu körleştirebilir veya sağırlaştırabilirsin. Varlık İRADE testinde başarısız olması durumunda bu etkiye kapılır.",
                      "yeni-alan-6": ""
                    },
                    {
                      "_id": "rmprewgmx6mb7",
                      "isim": "Ölülerle Konuş (R)",
                      "seviye": 3,
                      "yeni-alan-2": "Ritüel",
                      "tur": "Çürüme",
                      "yeni-alan": "Mana",
                      "maliyet": 3,
                      "yeni-alan-3": "10 Dakika",
                      "yeni-alan-4": "-",
                      "yeni-alan-5": "-",
                      "aciklama": "Konuşturmak üzere bir ceset seç. Bu cesdin konuşabilecek bir ağzı olmalı ve seni düşmanı olarak görmüyor olmalı. 1 dakikalık ritüelin ardından cesedin ruhu kısa süreliğine geri döner ve bu süreçte 5 soru sorma hakkın vardır.\n\nCeset, konuştuğun dili biliyorsa, soracağın sorulara kısa ve genel cevaplar verir. Süre veya 5 soru sonunda yeteneğin etkisi kendiliğinden sonlanır.",
                      "yeni-alan-6": ""
                    },
                    {
                      "_id": "rmprexioksuat",
                      "isim": "Hayvan Hareketlendir (R)",
                      "seviye": 3,
                      "yeni-alan-2": "Ritüel",
                      "tur": "Çürüme",
                      "yeni-alan": "Mana",
                      "maliyet": 3,
                      "yeni-alan-3": "24 Saat",
                      "yeni-alan-4": "1 Km.",
                      "yeni-alan-5": "-",
                      "aciklama": "Giriş seviyesi olarak belirleyeceğin küçük veya minik boyutlarda bir hayvan seç. Bu hayvan üzerinde gerçekleştireceğin ritüel sonunda enerjin yönlenerek bir ruhu taklit eder. Bu taklit sayesinde ölü hayvanın bedenini hareketlendirir ve basit komutlarına uyacak bir hizmetkâra dönüştürürsün. Süre sonunda, vücut işlev görmeyecek derecede parçalandığında, menzil dışında çıkıldığında veya sen istediğinde yeteneğin etkisi sonlanır.",
                      "yeni-alan-6": ""
                    },
                    {
                      "_id": "rmpreym1iek0c",
                      "isim": "Kamp Ateşi (K)",
                      "seviye": 0,
                      "yeni-alan-2": "Eylem",
                      "tur": "Oluşturma",
                      "yeni-alan": "Mana",
                      "maliyet": 0,
                      "yeni-alan-3": "1 Dakika",
                      "yeni-alan-4": "6 Birim",
                      "yeni-alan-5": "-",
                      "aciklama": "Enerjiden meydana gelen bir kamp ateşi oluşturursun. Kamp ateşi, süre boyunca çevresini ısıtır ve tutuşturma özelliğine sahiptir. Enerjisel bir ateş olduğu için fiziksel yollarla söndürülemez.",
                      "yeni-alan-6": ""
                    },
                    {
                      "_id": "rmprez7fj97an",
                      "isim": "Elemental Silah",
                      "seviye": 3,
                      "yeni-alan-2": "Eylem",
                      "tur": "Dönüştürme",
                      "yeni-alan": "Mana",
                      "maliyet": 3,
                      "yeni-alan-3": "1 Saat",
                      "yeni-alan-4": "-",
                      "yeni-alan-5": "-",
                      "aciklama": "Kuşanmakta olduğun silahın üstünde elementsel etkiler uyandırırsın. Bu etkiler, silahınla birine vurdukça element hasarı vermeni sağlar. Uygulayabileceğin elementsel etkiler:\n\n- Asit\n- Buz\n- Ateş\n- Yıldırım\n- Ses\n\nBüyü süresince silahının elinden herhangi bir şekilde ayrılması, elementsel etkinin sonlanmasına sebep olur.",
                      "yeni-alan-6": ""
                    },
                    {
                      "_id": "rmprezycsr5gh",
                      "isim": "Şifa Alanı (K)",
                      "seviye": 3,
                      "yeni-alan-2": "Eylem",
                      "tur": "İnanç",
                      "yeni-alan": "Mana",
                      "maliyet": 3,
                      "yeni-alan-3": "1 Dakika",
                      "yeni-alan-4": "-",
                      "yeni-alan-5": "3 Birim Yarıçap",
                      "aciklama": "Süre boyunca bir iyileştirme alanı salgılarsın. Bu alan içinde bulunan varlıklar, Basit Yara İyileştirme etkisi altındadır. Ancak bu etki, vücutlarındaki derin yaraları da kapsayacak şekildedir.",
                      "yeni-alan-6": ""
                    },
                    {
                      "_id": "rmprf0m8ndorl",
                      "isim": "İyi ve Kötüyü Sapta (K)",
                      "seviye": 1,
                      "yeni-alan-2": "Eylem",
                      "tur": "İnanç",
                      "yeni-alan": "Mana",
                      "maliyet": 1,
                      "yeni-alan-3": "10 Dakika",
                      "yeni-alan-4": "6 Birim",
                      "yeni-alan-5": "-",
                      "aciklama": "Yetenek süresi boyunca, menzilinde bulunan varlıklar arasında Kutsal, Lanetli, Aydınlık, Karanlık niteliğe sahip olanları fark edersin.",
                      "yeni-alan-6": ""
                    },
                    {
                      "_id": "rmprf19mkinas",
                      "isim": "Göksel Pelerin",
                      "seviye": 4,
                      "yeni-alan-2": "Eylem",
                      "tur": "Pakt",
                      "yeni-alan": "-",
                      "maliyet": "",
                      "yeni-alan-3": "10 Dakika",
                      "yeni-alan-4": "-",
                      "yeni-alan-5": "-",
                      "aciklama": "Enerjisi tükenene kadar etrafını göksel enerjiden oluşan bir pelerinle kaplarsın. Pelerinin üstünde d6 miktarda parlak yıldız belirir. Birisi sana başarılı bir saldırı yaptığında bu yıldızlardan biri patlayarak saldırgana bir miktar ışıma hasarı verirken onu körleştirir",
                      "yeni-alan-6": ""
                    },
                    {
                      "_id": "rmprf2hi8ebdi",
                      "isim": "Kozmos Duvarı",
                      "seviye": 3,
                      "yeni-alan-2": "Eylem",
                      "tur": "Pakt",
                      "yeni-alan": "-",
                      "maliyet": "",
                      "yeni-alan-3": "1 Dakika",
                      "yeni-alan-4": "6 Birim",
                      "yeni-alan-5": "",
                      "aciklama": "En fazla 6 birim genişliğinde, 2 birim yüksekliğinde ve kalınlığında uzayı aynalayan bir duvar oluşturursun. Duvar arka tarafın görülmesini engeller fakat hareketi engellemez. Duvarın içinden geçmeye çalışan, aptal olarak sayılmayacak yüksek zeka seviyesine sahip her varlık zihinsel olarak duvara dayanmak zorundadır. Zihinsel dayanıklılığı yetersiz kalan varlıklar her tur zihinsel kurtulmayı geçene kadar duvarın içindeki karanlıkta kaybolup sınırlarından çıkmayacak şekilde rastgele hareket eder ve süre boyunca zihinsel hasar alır. Zihinsel dayanıklılığı yeterli olan varlıklar karanlıkta kaybolmadan karşı tarafa geçebilir fakat geçiş esnasında bir miktar zihinsel hasar alırlar.",
                      "yeni-alan-6": ""
                    },
                    {
                      "_id": "rmprf36kreykb",
                      "isim": "Düzlem Geçidi",
                      "seviye": 4,
                      "yeni-alan-2": "Eylem",
                      "tur": "Oluşturma",
                      "yeni-alan": "Mana",
                      "maliyet": 4,
                      "yeni-alan-3": "Anlık",
                      "yeni-alan-4": "100 Birim",
                      "yeni-alan-5": "-",
                      "aciklama": "Menzilde görebildiğin veya arkasını hayal edebildiğin bir engelin ardında, yanında 3 kişiye kadar orta-büyük boyutta varlıkla birlikte ışınlanabilirsin.",
                      "yeni-alan-6": ""
                    },
                    {
                      "_id": "rmprf3vq1clwf",
                      "isim": "Vampirik Dokunuş",
                      "seviye": 3,
                      "yeni-alan-2": "Eylem",
                      "tur": "Karanlık",
                      "yeni-alan": "Mana",
                      "maliyet": 3,
                      "yeni-alan-3": "Anlık",
                      "yeni-alan-4": "Dokunma",
                      "yeni-alan-5": "-",
                      "aciklama": "Yakın mesafe menzilindeki bir hedefe elinle yakın dövüş saldırısı gerçekleştirirsin. Elin hamle sırasında enerjiyle bezenir. Temas edebilmen halinde hedefin yaşam enerjisini kendi yaralarını iyileştirmek üzere dönüştürürsün.",
                      "yeni-alan-6": ""
                    },
                    {
                      "_id": "rmprf4my375i1",
                      "isim": "Gönderi",
                      "seviye": 3,
                      "yeni-alan-2": "Eylem",
                      "tur": "Dönüştürme",
                      "yeni-alan": "Mana",
                      "maliyet": 3,
                      "yeni-alan-3": "Anlık",
                      "yeni-alan-4": "-",
                      "yeni-alan-5": "-",
                      "aciklama": "Tanıdığın ve aynı düzlemde olduğun bir varlığa en fazla 25 kelimeden oluşan bir mesaj gönderirsin. Bu varlık, mesajın senden geldiğini anlar ve anında aynı kelime sınırında bir karşılık verebilir. Anında karşılık vermezse yeteneğin etkisi sonlanır.",
                      "yeni-alan-6": ""
                    },
                    {
                      "_id": "rmprf5koqj42r",
                      "isim": "Paramparça Et",
                      "seviye": 2,
                      "yeni-alan-2": "Eylem",
                      "tur": "Yıkım",
                      "yeni-alan": "Mana",
                      "maliyet": 2,
                      "yeni-alan-3": "Anlık",
                      "yeni-alan-4": "12 Birim",
                      "yeni-alan-5": "3 Birim Yarıçap",
                      "aciklama": "Menzilinde seçeceğin bir alanda, 3 birim yarıçaplı ve 2 birim yüksekliğinde bir silindirik alanda aşağı doğru şiddetli bir basınç kuvveti oluşturursun. Alan içinde kalan varlıklar DAYANIKLILIK testini geçemezse yere serilerek mıhlanırlar. DAYANIKLILIK testini geçebilen varlıklar yere serilmez ancak basınç hasarından yine de etkilenirler.",
                      "yeni-alan-6": ""
                    },
                    {
                      "_id": "rmprf6gbkbyyg",
                      "isim": "Bulanıklık (K)",
                      "seviye": 2,
                      "yeni-alan-2": "Eylem",
                      "tur": "İllüzyon",
                      "yeni-alan": "Mana",
                      "maliyet": 2,
                      "yeni-alan-3": "1 Dakika",
                      "yeni-alan-4": "-",
                      "yeni-alan-5": "-",
                      "aciklama": "Bedenin seni görebilen herkes için titreşerek bulanıklaşır. Süre boyunca tüm varlıklar sana karşı saldırılarının isabetlerini dezavantajlı gerçekleştirirler. Eğer saldıran varlık, duyu olarak görüşe ihtiyaç duymuyorsa ya da illüzyonu fark etme durumuna sahipse yetenekten etkilenmez.",
                      "yeni-alan-6": ""
                    },
                    {
                      "_id": "rmprf6xiyyqwo",
                      "isim": "Karanlık (K)",
                      "seviye": 2,
                      "yeni-alan-2": "Eylem",
                      "tur": "Oluşturma",
                      "yeni-alan": "Mana",
                      "maliyet": 2,
                      "yeni-alan-3": "1 Dakika",
                      "yeni-alan-4": "6 Birim",
                      "yeni-alan-5": "4 Birim Küre",
                      "aciklama": "Menzilinde seçeceğin bir noktanın çevresine yayılacak enerjisel bir karanlık alan meydana getirirsin. Bu alan, duvarlar gibi fiziksel engellerin ötesine taşabilir. \n\nDoğal olarak karanlıkta görme yetisi bulunan varlıklar bu yeteneğin içinde göremez ve fiziksel ışık bu alanın içini aydınlatamaz.\n\nEğer seçilen nokta hareket halinde bir nokta ise, oluşan karanlık alan bu noktayla birlikte hareket eder.",
                      "yeni-alan-6": "Bu yeteneğin alanı 2. seviye ya da daha düşük seviye bir yetenek ile oluşturulmuş ışık etkisiyle örtüşürse, ışığı oluşturan yetenek def edilir. Ancak kritik başarı ile oluşturulmuş alt bir ışık yeteneği karanlığın içinde var olabilir. Bu durumda, ışığın aydınlatabileceği alan 2 Birimdir."
                    },
                    {
                      "_id": "rmprf7q1a61aj",
                      "isim": "Ateş Topu",
                      "seviye": 3,
                      "yeni-alan-2": "Eylem",
                      "tur": "Yıkım",
                      "yeni-alan": "Mana",
                      "maliyet": 3,
                      "yeni-alan-3": "Anlık",
                      "yeni-alan-4": "12 Birim",
                      "yeni-alan-5": "2 Birim Yarıçap",
                      "aciklama": "Menzilinde gördüğün bir hedef ya da noktaya gürleyen bir ateş topu fırlatırsın. Ateş topu düştüğü noktadan 2 birim uzağa hasar verecek şekilde patlar ve çevrede tutuşabilecek şeyleri ateşe verir.",
                      "yeni-alan-6": ""
                    },
                    {
                      "_id": "rmprf8b924skv",
                      "isim": "Korku",
                      "seviye": 3,
                      "yeni-alan-2": "Eylem",
                      "tur": "Efsun",
                      "yeni-alan": "Mana",
                      "maliyet": 3,
                      "yeni-alan-3": "1 Dakika",
                      "yeni-alan-4": "6 Birim",
                      "yeni-alan-5": "-",
                      "aciklama": "Menzilinde görebileceğin bir varlığın zihnine dalarak sana karşı yoğun bir korkuya kapılmasını sağlamaya çalışırsın. İRADE testinde başarısız olursa, varlık turundaki hareketinin tamamını senden aksi yöne kaçmak için kullanmak zorundadır. İRADE testinin farkının 6'dan fazla gelmesi durumunda, korkan varlık kuşandığı silahını elinden düşürür.",
                      "yeni-alan-6": ""
                    },
                    {
                      "_id": "rmprf8tg3967c",
                      "isim": "Akıl Karışıklığı",
                      "seviye": 4,
                      "yeni-alan-2": "Eylem",
                      "tur": "Efsun",
                      "yeni-alan": "Mana",
                      "maliyet": 4,
                      "yeni-alan-3": "1 Dakika",
                      "yeni-alan-4": "12 Birim",
                      "yeni-alan-5": "2 Birim Yarıçap",
                      "aciklama": "Menzilinde seçeceğin bir noktanın 2 birim çevresinde bulunan bütün varlıkların zihinlerine sızarak bir akıl karışıklığı meydana getirmeye çalışırsın. Alanın içinde kalan varlıklar İRADE testini geçemezse varlıkların her biri için bağımsız olarak şu etkilerden biri gerçekleşir:\n\n1d10 Sonucunda,\n1.\tVarlık tüm hareketini rastgele bir yöne hareket etmek için kullanır. Yönü belirlemek için 1d8 at ve zarın her yüzüne bir yön belirle. Varlık bu sırasında eylem kullanmaz.\n2-6.\tVarlık bu sırasında hareket etmez ve eylem kullanmaz.\n7-8.\tVarlık eylemini kullanıp menzilindeki rastgele bir varlığa yakın dövüş saldırısı yapar. Eğer menzilinde bir varlık yoksa, bu sırasında hiçbir şey yapmaz.\n9-10.\tVarlık normal bir şekilde davranıp hareket edebilir.\n\nYetenek etkisindeki varlıklar her tur sonunda, bu etkiden kurtulmak için yeniden İRADE testine girebilir.",
                      "yeni-alan-6": ""
                    },
                    {
                      "_id": "rmprf9hifwdej",
                      "isim": "Hançer Bulutu (K)",
                      "seviye": 2,
                      "yeni-alan-2": "Eylem",
                      "tur": "Oluşturma",
                      "yeni-alan": "Mana",
                      "maliyet": 2,
                      "yeni-alan-3": "1 Dakika",
                      "yeni-alan-4": "12 Birim",
                      "yeni-alan-5": "1 Birim",
                      "aciklama": "Menzilinde seçeceğin bir alanda havada uçuşan hançerler meydana getirirsin. Bir varlık bu alana girerse veya bu alan varlığın bulunduğu alanda oluşursa ÇEVİKLİK testine girer. Testi geçmesi halinde hançerlerin bir kısmından kaçınmayı başarabilir, ancak her türlü hançerlerden kesme hasarı alır.",
                      "yeni-alan-6": ""
                    },
                    {
                      "_id": "rmprfa24yy5j8",
                      "isim": "Basit Yaraları İyileştir",
                      "seviye": 1,
                      "yeni-alan-2": "Eylem",
                      "tur": "Yıkım",
                      "yeni-alan": "Mana",
                      "maliyet": 1,
                      "yeni-alan-3": "Anlık",
                      "yeni-alan-4": "Dokunma",
                      "yeni-alan-5": "-",
                      "aciklama": "Açık yarası bulunan bir varlığın yarasına dokunarak yarayı kapanacak şekilde iyileştirmeye çalışırsın. \n\nEğer yara derinse yetenek işlevsiz kalır. Ancak derin değil ve genişse, yaranın bir kısmı iyileşir.",
                      "yeni-alan-6": ""
                    },
                    {
                      "_id": "rmprfaq8pu4n0",
                      "isim": "Tamirat (R)",
                      "seviye": 0,
                      "yeni-alan-2": "Ritüel",
                      "tur": "Dönüştürme",
                      "yeni-alan": "Mana",
                      "maliyet": 0,
                      "yeni-alan-3": "1 Dakika",
                      "yeni-alan-4": "-",
                      "yeni-alan-5": "-",
                      "aciklama": "Süre boyunca odaklanarak gerçekleştireceğin bir ritüel sonucunda genel materyallerden yapılmış bir nesnedeki basit hasarı tamir edersin. Bu hasar bir kılıçtaki çatlak, kırılmış bir anahtar (kilit kısmı harici), bir matarada sızdıran bir çatlak gibi şeyler olabilir. Bu hasarın boyutu 30 santimetreden düşükse iz bırakmadan tamir olur.\n\nBu yetenek, kırılmış enerjisel bir eşyayı tamir edebilir ancak kaybettiği enerjisel özelliği geri getiremez.",
                      "yeni-alan-6": ""
                    },
                    {
                      "_id": "rmprfbhcsoiwz",
                      "isim": "Görünmez Hizmetkâr (R)",
                      "seviye": 1,
                      "yeni-alan-2": "Ritüel",
                      "tur": "Oluşturma",
                      "yeni-alan": "Mana",
                      "maliyet": 1,
                      "yeni-alan-3": "1 Saat",
                      "yeni-alan-4": "-",
                      "yeni-alan-5": "-",
                      "aciklama": "Ritüel süresi sonunda vereceğin basit görevleri yerine getirecek görünmez, akılsız ve şekilsiz bir hizmetkâr meydana getirirsin. Hizmetkâr görünmez olsa da enerjisel ve fiziksel olarak engellere takılıp hasar alabilecek niteliktedir.\n\nMücadelede her turunda bir ek eylem olarak hizmetçine 3 birime kadar hareket etmesi ve bir nesneyle etkileşime geçebilmesi üzerine komut verebilirsin. Hizmetkâr bir şeyleri getirme, temizlik, tamir, kıyafet katlama, ateş yakma, yemek servis etme gibi insan bir hizmetkârın yapabileceği görevleri yerine getirebilir. Bir emir verdiğinde, hizmetkâr görevi yapabildiği en iyi şekilde yerine getirmeye çalışıp bitirir, sonrasında yeni emri bekler.\n\nHizmetkâr 12 bitim (60ft.) mesafeden fazla uzaklaşmasına sebep olacak bir harekette bulunursa yetenek sonlanır.",
                      "yeni-alan-6": "Materyal Gereksinimi: Avuçta sıkılabilecek büyüklükte bir tutam halat ve yarı kesilmiş bir odun."
                    },
                    {
                      "_id": "rmprfcb54w608",
                      "isim": "Şifa Ateşi",
                      "seviye": 2,
                      "yeni-alan-2": "Eylem",
                      "tur": "Yıkım",
                      "yeni-alan": "Mana",
                      "maliyet": 2,
                      "yeni-alan-3": "Anlık",
                      "yeni-alan-4": "Dokunma",
                      "yeni-alan-5": "-",
                      "aciklama": "Elinde gürleyen bir alev oluşturarak alevin temas ettiği bütün yaraları iyileştirmeye çalışırsın. Alev, vücuda temas ettiği ve hacimsel olarak kapladığı alandaki kanamaya sebep olan yaraların hepsini iyileştirme özelliğine sahiptir. Kemik kırığı gibi yaraları iyileştiremez.",
                      "yeni-alan-6": "Özel Yetenek: Bu yeteneği kullanabilmek için hikâyesel ya da sınıfsal olarak özel bir durumda olmak gerekir. Özel durumları oyun yöneticiniz ile konuşarak öğrenebilir ve karakterinizin öğrenmesi için anlaşabilirsiniz."
                    },
                    {
                      "_id": "rmprfcyq5pex4",
                      "isim": "Zehirden Korunma",
                      "seviye": 2,
                      "yeni-alan-2": "Eylem",
                      "tur": "Koruma",
                      "yeni-alan": "Mana",
                      "maliyet": 2,
                      "yeni-alan-3": "1 Saat",
                      "yeni-alan-4": "Dokunma",
                      "yeni-alan-5": "-",
                      "aciklama": "Bir varlığa dokunursun. Eğer zehirlenme etkisi altındaysa vücuduna tesir eden zehir ortadan kalkar. Eğer varlık birden çok zehirden etkileniyorsa, tesir ettiğini bildiğin veya rasgele bir tanesini ortadan kaldırırsın.\n\nSüre boyunca, hedefin zehirlenmeye karşı gireceği testlerde avantajlı olur ve zehir etkilerine karşı dirençli olur.",
                      "yeni-alan-6": "Bu yetenek sadece bir valrık üzerinde etkin olabilir. Mevcut olarak etkinken başka bir varlıkta kullanılması halinde, bir önceki varlıktaki etkinliği sonlanır."
                    },
                    {
                      "_id": "rmprfdnexfy6o",
                      "isim": "Rüya (R)",
                      "seviye": 5,
                      "yeni-alan-2": "Ritüel",
                      "tur": "Efsun",
                      "yeni-alan": "Mana",
                      "maliyet": 5,
                      "yeni-alan-3": "8 Saat",
                      "yeni-alan-4": "-",
                      "yeni-alan-5": "-",
                      "aciklama": "Aynı düzlemde bulunan ve tanıdığın bir varlığı hedef alırsın. 1 dakikalık ritüelin ardından kendin veya dokunduğun istekli bir varlık, bir rüya habercisi olarak hareket etmek üzere trans haline girer.\n\nEğer hedef uykudaysa, haberci hedefin rüyalarında belirir ve yetenek süresi boyunca uykuda kaldığı sürece hedefle sohbet edebilir. Aynı zamanda, haberci rüyayı şekillendirme yetisine sahiptir. Bu şekilde manzaralar, nesneler ve başka görüntüler meydana getirebilir. Haberci istediği zaman trans halinden çıkarak yeteneği sonlandırabilir. Rüyayı gören hedef, uyandığı zaman gördüklerini eksiksiz hatırlar. \n\nEğer yetenek kullanıldığında hedef uyanıksa, haberci bunu bilir ve transı sonlandırabilir ya da hedefin uykuya dalmasını trans halinde bekleyebilir.\n\nHaberci, bir mesaj iletmek yerine doğrudan hedefe bir kâbus gördürebilir. Bu durumda en fazla on kelimelik bir mesaj iletilir ve hedef İRADE testine girer. Testte başarısız olunması durumunda görülen kâbusun etkisinden dolayı dinlenme durumunda hiçbir toparlanma etkisi elde edemez.",
                      "yeni-alan-6": ""
                    },
                    {
                      "_id": "rmprfeaduyk1g",
                      "isim": "Binek Oluştur (R)",
                      "seviye": 2,
                      "yeni-alan-2": "Ritüel",
                      "tur": "Oluşturma",
                      "yeni-alan": "Mana",
                      "maliyet": 2,
                      "yeni-alan-3": "1 Saat",
                      "yeni-alan-4": "-",
                      "yeni-alan-5": "-",
                      "aciklama": "Yerden enerjisel olarak meydana gelecen bir binek meydana getirirsin. Bu binek, herhangi bir savaş özelliğine sahip değildir, fiziksel ve enerjisel olarak etkileşime geçilebilir yapıdadır. Binek ölene veya sen yeteneği sonlandırana kadar varlığını korur.",
                      "yeni-alan-6": ""
                    },
                    {
                      "_id": "rmprfeuio7b64",
                      "isim": "Dondurucu Koni",
                      "seviye": 9,
                      "yeni-alan-2": "Eylem",
                      "tur": "Yıkım",
                      "yeni-alan": "Mana",
                      "maliyet": 12,
                      "yeni-alan-3": "Anlık",
                      "yeni-alan-4": "-",
                      "yeni-alan-5": "12 Birim 60 Derece Koni",
                      "aciklama": "Ellerini doğrulttuğun alanda aniden oluşacak bir soğuk dalgası, alan içindekileri doğru fırlayarak önüne çarptığı hedeflere yüksek soğuk hasarı uygular. Alan içinde kalan varlıklar DAYANIKLILIK testine girerek soğuğun bir kısmına dayanabilirler. Alan sınırında kalan varlıklar kaçınma testlerinde başarılı olursa soğuk dalgasının bir kısmından kaçınabilirler.",
                      "yeni-alan-6": ""
                    },
                    {
                      "_id": "rmprffmting6b",
                      "isim": "Karşı Büyü",
                      "seviye": 3,
                      "yeni-alan-2": "Tepki Eylem",
                      "tur": "Koruma",
                      "yeni-alan": "Mana",
                      "maliyet": 3,
                      "yeni-alan-3": "Anlık",
                      "yeni-alan-4": "12 Birim",
                      "yeni-alan-5": "-",
                      "aciklama": "12 birim menzilindeki bir varlık enerjisel yetenek kullanırken, tepki olarak yeteneğini engelleyebilirsin. Engellemeye çalıştığın yetenek, seviye olarak 3 veya daha alt bir seviyedeyse, enerji değeri 1-2 gelmediği sürece anında sonlanır. 3. seviyeden yüksek bir etkiyi kaldırmak için, gerçekleştirilen yetenek seviyesiyle kuvvetinin dahil olduğu bir sınırı geçmen gerekir. Bu sınır şu şekilde hesaplanır:\n\nSınır = (Yetenek Seviyesi - Lanet Kaldırma Yeteneği Seviyesi) + (Bedel Manası - Lanet Kaldırma Manası) + Yetenek Kuvvet Miktarı\n\nÖrneğin, 5. Seviye 7 Mana ve 12 kuvvetle kullanan bir yeteneğin etkisini 3. Seviye Lanet Kaldırma ile kaldırmak için:\n(5-3) + (7-3) + 12 = 2 + 4 + 12 = 18 sınırı aşılmalıdır.",
                      "yeni-alan-6": ""
                    },
                    {
                      "_id": "rmprfg3xtj23b",
                      "isim": "Enerjiyi Defet",
                      "seviye": 3,
                      "yeni-alan-2": "Eylem",
                      "tur": "Koruma",
                      "yeni-alan": "Mana",
                      "maliyet": 3,
                      "yeni-alan-3": "Anlık",
                      "yeni-alan-4": "Dokunma",
                      "yeni-alan-5": "-",
                      "aciklama": "Anlık dokunma şeklinde enerjisel bir etkiyi sonlandırmaya çalışırsın. Bu etki, bir yeteneğin sebep olduğu varlık üstünde, alanda veya doğrudan farklı sebeplerce bir yerde bulunan bir etki olabilir. Etkiyi kaldırmak için şu kurallar izlenir:\n\nKaldırmaya çalıştığın etki, seviye olarak 3 veya daha alt bir seviyedeyse, enerji değeri 1-2 gelmediği sürece anında sonlanır. 3. seviyeden yüksek bir etkiyi kaldırmak için, gerçekleştirilen yetenek seviyesiyle kuvvetinin dahil olduğu bir sınırı geçmen gerekir. Bu sınır şu şekilde hesaplanır:\n\nSınır = (Yetenek Seviyesi - Lanet Kaldırma Yeteneği Seviyesi) + (Bedel Manası - Lanet Kaldırma Manası) + Yetenek Kuvvet Miktarı\n\nÖrneğin, 5. Seviye 7 Mana ve 12 kuvvetle kullanan bir yeteneğin etkisini 3. Seviye Lanet Kaldırma ile kaldırmak için:\n(5-3) + (7-3) + 12 = 2 + 4 + 12 = 18 sınırı aşılmalıdır.",
                      "yeni-alan-6": ""
                    },
                    {
                      "_id": "rmprfgpjetjv8",
                      "isim": "Bariyer",
                      "seviye": 3,
                      "yeni-alan-2": "Tepki Eylem",
                      "tur": "Koruma",
                      "yeni-alan": "Mana",
                      "maliyet": 3,
                      "yeni-alan-3": "Anlık",
                      "yeni-alan-4": "12 Birim",
                      "yeni-alan-5": "-",
                      "aciklama": "Menzilinde görebildiğin bir varlık herhangi bir şekilde saldırıya uğrarken, saldırıdan onu korumak üzere sonraki turuna kadar var olacak bir koruyucu bariyeri varlığın çevresinde meydana getirirsin.",
                      "yeni-alan-6": ""
                    },
                    {
                      "_id": "rmprfh7pm6fh1",
                      "isim": "Yenilenme",
                      "seviye": 5,
                      "yeni-alan-2": "Eylem",
                      "tur": "Yıkım",
                      "yeni-alan": "Mana",
                      "maliyet": 5,
                      "yeni-alan-3": "Anlık",
                      "yeni-alan-4": "-",
                      "yeni-alan-5": "-",
                      "aciklama": "Bir varlığa dokunarak doğal iyileşme hızını artırırsın. Bu sayede varlığın vücudunda iyileşmekte olan yaralar normale kıyasla olağanüstü derecede hızlı iyileşmeye başlar. Yaralar kapanır, kemikler kaynar, zedelenmiş sinirler özelliğini toparlar.",
                      "yeni-alan-6": ""
                    },
                    {
                      "_id": "rmprfhpbe1csz",
                      "isim": "Ruh Kafesi",
                      "seviye": 6,
                      "yeni-alan-2": "Eylem",
                      "tur": "Çürüme",
                      "yeni-alan": "Mana",
                      "maliyet": 10,
                      "yeni-alan-3": "8 Saat",
                      "yeni-alan-4": "12 Birim",
                      "yeni-alan-5": "-",
                      "aciklama": "Çevrende bir varlık öldüğü zaman, materyal bileşen olarak kulalndığın bir kafesin içine hapsetmek üzere ruhunu kancalarsın. İRADE testine giren ruh, testte başarısız olursa belirlediğin kafesin içine hapsolacak şekilde süre boyunca kancalanır.\n\nKancalanmış bir ruh, yetenek süresi boyunca ruhun enerjisini 6 kez kullanabilirsin. Bu kullanım şunlardan biri olabilir:\n\n- Yaşam Çal: Ek Eylem olarak ruhun bütünlüğünün 1/6'sını kullanarak yaralarını iyileştirebilir veya yaşam enerjini yenileyebilirsin.\n- Sorgula: Ruha bir soru sorarak kısa bir telepatik cevap alırsın. Bu cevap hangi dil kullanılırsa kullanılsın anlaşılabilir seviyededir. Ruh, sadece hayatta bildiklerini bilir, ancak dürüstçe ve elinden gelen en iyi şekilde cevap verir. Cevap birkaç cümleden fazla olamaz ve kriptik olabilir.\n- Öngörü: Ek eylem kullanarak ruhun belirli parçasını feda ederek algılarını olağanüstü düzeyde yükseltirsin. Bir sonraki saldırı, yetenek ya da test zarını avantajlı olarak kullanırsın. Eğer bu etkiyi bir sonraki turuna kadar kullanmazsan, etki ortadan kaybolur.\n- Ölünün Gözleri: Eylemini kullanarak ruhunu kancaladığın varlığın hayatında görmüş olduğu bir yerin adını verirsin. Eğer tanımladığın yer aynı düzlemde ise bu bölgede görünmez bir sensör meydana gelir. Sen konsantre olduğun sürece 10 dakika boyunca sensör bu alanda kalır. Trans haline girerek bu sensörden görüp duyabilirsin. Sensörü görebilen bir varlık, ruhunu kancaladığın varlığın acı içindeki halini görür.",
                      "yeni-alan-6": ""
                    },
                    {
                      "_id": "rmprfi74ajhnh",
                      "isim": "Gerçek Görüş",
                      "seviye": 5,
                      "yeni-alan-2": "Eylem",
                      "tur": "Kehanet",
                      "yeni-alan": "Mana",
                      "maliyet": 5,
                      "yeni-alan-3": "1 Saat",
                      "yeni-alan-4": "6 Birim",
                      "yeni-alan-5": "-",
                      "aciklama": "Ruhlar ötesi alemler ve kozmik enerjiden oluşan, normal gözün göremediği enerjileri görmeye başlarsın. Bu duruma görünmezlik etkisindeki şeyleri, illüzyonları görmek gibi durumlar da dahildir.",
                      "yeni-alan-6": ""
                    },
                    {
                      "_id": "rmprfj1ojy5t7",
                      "isim": "Düzlem Kayması",
                      "seviye": 8,
                      "yeni-alan-2": "Eylem",
                      "tur": "Oluşturma",
                      "yeni-alan": "Mana",
                      "maliyet": 14,
                      "yeni-alan-3": "Anlık",
                      "yeni-alan-4": "-",
                      "yeni-alan-5": "-",
                      "aciklama": "Sen ve el ele tutuşarak çember oluşturabileceğin 8 farklı varlık, bilgisine sahip olduğun bir düzleme geçiş yapabilirsiniz. \n\nGeçiş yapmak için bilgin dahilindeki konumu belirtmen yeterlidir (İskidya'daki Bereket Ağacı, Moria Madenleri, Cehennemin 4. Katı gibi...). \n\nAlternatif olarak, farklı bir düzlemde sembolünü bildiğin bir ışınlanma çemberinin olduğu konuma da geçiş yapmayı tercih edebilirsin.",
                      "yeni-alan-6": ""
                    },
                    {
                      "_id": "rmprfjmrjclcq",
                      "isim": "Dönüş Çağrısı",
                      "seviye": 10,
                      "yeni-alan-2": "Eylem",
                      "tur": "Oluşturma",
                      "yeni-alan": "Mana",
                      "maliyet": 15,
                      "yeni-alan-3": "Anlık",
                      "yeni-alan-4": "-",
                      "yeni-alan-5": "-",
                      "aciklama": "Sen ve biriminin bitişiğinde bulunan belirlediğin istekli varlıklar, daha önceden belirlediğin bir güvenli alana ışınlanırsınız. \n\nGüvenli alanı belirlemek için öncelikle bu yeteneğin ritüel safhasını gerçekleştirmelisin. Ritüel, belirlediğin alanın zeminine ve varsa diğer yüzeylerine çizeceğin belirli semboller dizisi ve onların ortasında bu yeteneği belirli aralıklarla kullanarak 1 hafta boyunca hazırlaman ile gerçekleşir.",
                      "yeni-alan-6": ""
                    },
                    {
                      "_id": "rmprfk8346cfs",
                      "isim": "Rejenerasyon",
                      "seviye": 12,
                      "yeni-alan-2": "Eylem",
                      "tur": "Yıkım",
                      "yeni-alan": "Mana",
                      "maliyet": 24,
                      "yeni-alan-3": "Anlık",
                      "yeni-alan-4": "-",
                      "yeni-alan-5": "-",
                      "aciklama": "Bir hedefe dokunarak doğal iyileşme kapasitesini olağan dışı şekilde artırırsın. Yaklaşık 30 dakikalık süre içinde, varlığın açık yaraları kapanır, kırık kemikleri kaynaşır, hasar görmüş sinirleri eski haline döner. Eğer hedefin eksik bir uzvu varsa (Parmak, bacak, kuyruk vb.) yeniden oluşur. Eğer kopmuş uzuv ilgili kısma tutturulursa, uzuv yeniden çıkmak yerine kaynaşarak özelliğini yeniden kazanır.",
                      "yeni-alan-6": ""
                    },
                    {
                      "_id": "rmprfkp5bn8o7",
                      "isim": "İnziva (R)",
                      "seviye": 15,
                      "yeni-alan-2": "Ritüel",
                      "tur": "Kehanet",
                      "yeni-alan": "Mana",
                      "maliyet": 50,
                      "yeni-alan-3": "1 Gün+",
                      "yeni-alan-4": "-",
                      "yeni-alan-5": "-",
                      "aciklama": "3 Saatlik bir ritüel sonucunda dokunacağın bir varlık ya da nesne gizlenebilir ve süre boyunca tespit edilemez.\n\nYetenek kullanılndığında dokunulan nesne görünmezlik durumuna girer ve kehanet yeteneklerinin hedefi olamaz, ya da bu yeteneklerle oluşturulan sensörlerce algılanamaz.\n\nEğer hedef bir varlıksa, hayatı askıya alınmış bir duruma geçer. Zaman onun için akmayı bırakır ve herhangi bir şekilde yaşlanmaz.\n\nYeteneğin bitmesi için bir durum belirleyebilirsin. Bu durum, istediğin her şey olabilir ancak hedefin 10km yakınında gerçekleşmeli veya görünmelidir. Örnek olarak, 1000 yıl geçince ya da bölgeye bir Kadim giriş yaptığında şeklinde bir şart konulabilir. Hedefin hasar alması halinde yetenek etkileri sonlanır.",
                      "yeni-alan-6": ""
                    },
                    {
                      "_id": "rmprflex2fsxk",
                      "isim": "Kurutma",
                      "seviye": 4,
                      "yeni-alan-2": "Eylem",
                      "tur": "Çürüme",
                      "yeni-alan": "Mana",
                      "maliyet": 4,
                      "yeni-alan-3": "Anlık",
                      "yeni-alan-4": "6 Birim",
                      "yeni-alan-5": "-",
                      "aciklama": "Menzilindeki bir hedefin bedenindeki sıvıları kurutmaya çalışırsın. Eğer bu varlık bitki veya benzer statüde bir varlıksa, yeteneğe karşı kırılgandır.",
                      "yeni-alan-6": ""
                    },
                    {
                      "_id": "rmprfm2beum3o",
                      "isim": "Gölgealev Pelerini",
                      "seviye": 4,
                      "yeni-alan-2": "Eylem",
                      "tur": "Koruma",
                      "yeni-alan": "Mana",
                      "maliyet": 4,
                      "yeni-alan-3": "1 Dakika",
                      "yeni-alan-4": "-",
                      "yeni-alan-5": "-",
                      "aciklama": "Etrafını çevreleyen gölgealevden oluşma bir pelerin meydana getirirsin. Sana karşı gerçekleştirilen her yakın mesafe saldırısına karşı pelerin tepki olarak gölgealevlerini saldırganın üzerine salar.",
                      "yeni-alan-6": "Özel Şart: Bu yeteneğe sahip olmak için Gölgealev ile ilgili temelleri karşılıyor olmalısınız."
                    },
                    {
                      "_id": "rmprfmrz6vhwa",
                      "isim": "Kişi Zaptetme (K)",
                      "seviye": 8,
                      "yeni-alan-2": "Eylem",
                      "tur": "Efsun",
                      "yeni-alan": "Mana",
                      "maliyet": 14,
                      "yeni-alan-3": "1 Dakika",
                      "yeni-alan-4": "12 Birim",
                      "yeni-alan-5": "-",
                      "aciklama": "İki elini de kullanarak odaklanacağın bir insansıyı PARALİZ durumuna sokmaya çalışırsın. İRADE testini geçemeyen bir insansı, olduğu pozisyonda kasılıp kalır, hareket edemez veya eylemde bulunamaz. \n\nYetenekten etkilenen varlık, her turunun başında tekrar İRADE testi vererek bu etkiden kurtulmaya çalışabilir.",
                      "yeni-alan-6": ""
                    },
                    {
                      "_id": "rmprfnjozv0yq",
                      "isim": "Yanan Eller",
                      "seviye": 1,
                      "yeni-alan-2": "Eylem",
                      "tur": "Yıkım",
                      "yeni-alan": "Mana",
                      "maliyet": 1,
                      "yeni-alan-3": "Anlık",
                      "yeni-alan-4": "-",
                      "yeni-alan-5": "3 Birim Koni",
                      "aciklama": "Ellerini uzattığın bir yöne doğru gürleyecek bir alev dalgası fırlatırsın. ÇEVİKLİK testini geçemeyen varlıklar gelen alev dalgasından yanma hasarı alır, geçebilenler hasarın bir kısmından kaçınabilir.",
                      "yeni-alan-6": ""
                    },
                    {
                      "_id": "rmprfo2gunq1q",
                      "isim": "Su Duvarı (K)",
                      "seviye": 3,
                      "yeni-alan-2": "Eylem",
                      "tur": "Oluşturma",
                      "yeni-alan": "Mana",
                      "maliyet": 3,
                      "yeni-alan-3": "1 Dakika",
                      "yeni-alan-4": "6 Birim",
                      "yeni-alan-5": "6 Birim Uzun 2 Birim Yüksek",
                      "aciklama": "Menzilde belirlediğin bir alanda başlayıp uzanacak şekilde enerjisel bir su duvarı oluşturursun. Duvarın görüntüsü yerden yukarıya akan bir su akıntısı bloğu gibidir. Duvarın içinde kalmış ya da içine girecek olan varlıklar basınç ve soğuk hasarı alırken, dışarıdan duvara doğru gerçekleştirilen menzilli saldırılar duvarın etkisiyle kırılır.",
                      "yeni-alan-6": ""
                    },
                    {
                      "_id": "rmprfp0peg6v3",
                      "isim": "Delilik Tacı (K)",
                      "seviye": 2,
                      "yeni-alan-2": "Eylem",
                      "tur": "Efsun",
                      "yeni-alan": "Mana",
                      "maliyet": 2,
                      "yeni-alan-3": "1 Dakika",
                      "yeni-alan-4": "12 Birim",
                      "yeni-alan-5": "-",
                      "aciklama": "Menzilinde seçeceğin bir hedefin başında çarpık ve dikenli bir taç belirir. Varlık, İRADE testini geçememesi durumunda delirir ve mesafe olarak en yakınındaki varlığa saldırmaya meyilli hale gelir.\n\nEtki altına girmiş olan bir varlık, yetenek süresi boyunca kendi turunun sonunda bir İRADE testi ile bu etkiyi sonlandırmaya çalışabilir.",
                      "yeni-alan-6": ""
                    },
                    {
                      "_id": "rmprfplvy1q9p",
                      "isim": "Öleni Esirge (K)",
                      "seviye": 1,
                      "yeni-alan-2": "Eylem",
                      "tur": "Çürüme",
                      "yeni-alan": "Mana",
                      "maliyet": 1,
                      "yeni-alan-3": "1 Saat",
                      "yeni-alan-4": "-",
                      "yeni-alan-5": "-",
                      "aciklama": "Dokunacağın bir varlık, kanamadan dolayı yaralı ise, yetenek süresi boyunca varlığın kanamasını baskılayarak stabilize edersin.",
                      "yeni-alan-6": ""
                    },
                    {
                      "_id": "rmprfq44nh35d",
                      "isim": "Zayıflatma Işını (K)",
                      "seviye": 2,
                      "yeni-alan-2": "Eylem",
                      "tur": "Çürüme",
                      "yeni-alan": "Mana",
                      "maliyet": 2,
                      "yeni-alan-3": "1 Dakika",
                      "yeni-alan-4": "12 Birim",
                      "yeni-alan-5": "-",
                      "aciklama": "Menzilindeki bir hedefe elinden çıkacak uğursuz bir enerji ışını gönderirsin. İsabet halinde, hedef isabet aldığı yerden çürüme tesirinde kalır ve seçeceğin 1 niteliği süre boyunca kuvvetine bağlı olarak eksi değer alır. (Her 5 kuvvette -1)",
                      "yeni-alan-6": ""
                    },
                    {
                      "_id": "rmprfqpoy91gw",
                      "isim": "Işık Kıskacı",
                      "seviye": 3,
                      "yeni-alan-2": "Eylem",
                      "tur": "Aydınlık",
                      "yeni-alan": "Mana",
                      "maliyet": 3,
                      "yeni-alan-3": "Anlık",
                      "yeni-alan-4": "12 Birim",
                      "yeni-alan-5": "2 Birim Yarıçap & Yüksek Silindir",
                      "aciklama": "Menzilde görebildiğin bir noktada oluşturacağın silindirik bir alanı kaplayan ışık alanı oluşturursun. Alan içinde kalan varlıklar DAYANIKLILIK testine girer. Testi geçemeyen varlıklar IŞIMA YANIĞI hasarı alırken KÖRLÜK etkisinde kalırlar. (Kuvvete bağlı her 5 kuvvet için +1 tur)",
                      "yeni-alan-6": ""
                    },
                    {
                      "_id": "rmprfrstrd4au",
                      "isim": "Gölge Kıskacı (K)",
                      "seviye": 3,
                      "yeni-alan-2": "Eylem",
                      "tur": "Karanlık",
                      "yeni-alan": "Mana",
                      "maliyet": 3,
                      "yeni-alan-3": "1 Dakika",
                      "yeni-alan-4": "12 Birim",
                      "yeni-alan-5": "2 Birim Geniş & Yüksek Silindir",
                      "aciklama": "Menzilde görebildiğin noktada silindirik bir alan oluşturmak üzere yoğunlaşırsın. Alan içinde kalan varlıklar, alanda belirerek onları sarmalamaya çalışan gölge dokunaçlara karşı ÇEVİKLİK testine girer. \n\nDokunmayı başaran dokunaçlar, varlıkları sarmalayarak basınç ve karanlık hasarı uygulayarak yere sabitler. Sabitlenen varlıklar her tur KUVVET testine girerek bu kavramadan kurtulabilir.",
                      "yeni-alan-6": ""
                    },
                    {
                      "_id": "rmprfsups0bsa",
                      "isim": "Feda",
                      "seviye": 1,
                      "yeni-alan-2": "Tepki Eylem",
                      "tur": "Kan",
                      "yeni-alan": "Mana",
                      "maliyet": 1,
                      "yeni-alan-3": "Anlık",
                      "yeni-alan-4": "-",
                      "yeni-alan-5": "-",
                      "aciklama": "Kan akıtmak suretiyle verdiğin bir yakın mesafe saldırısı sonucunda hızlı tepki olarak rakibin yarasından kanı çekip kendi yarana aktararak iyileştirici bir yama etkisi göstermesini sağlayabilirsin.",
                      "yeni-alan-6": ""
                    },
                    {
                      "_id": "rmprftkzv8g3r",
                      "isim": "Kan Kaynat",
                      "seviye": 2,
                      "yeni-alan-2": "Eylem",
                      "tur": "Kan",
                      "yeni-alan": "Mana",
                      "maliyet": 2,
                      "yeni-alan-3": "1 Dakika",
                      "yeni-alan-4": "-",
                      "yeni-alan-5": "-",
                      "aciklama": "Kendi vücudundaki kanı kaynatarak belirlediğin bir niteliğine artı değer alabilirsin. (Her 5 kuvvet için +1)\n\nBu yeteneği tekrar kullanman halinde, diğer etki ortadan kaybolur.",
                      "yeni-alan-6": ""
                    },
                    {
                      "_id": "rmprfu258mqbn",
                      "isim": "Kan Duyusu (K)",
                      "seviye": 1,
                      "yeni-alan-2": "Eylem",
                      "tur": "Kan",
                      "yeni-alan": "Mana",
                      "maliyet": 1,
                      "yeni-alan-3": "10 Dakika",
                      "yeni-alan-4": "-",
                      "yeni-alan-5": "6 Birim Yarıçap",
                      "aciklama": "Süre boyunca menzil alanında bulunan serbest kan kaynaklarını ve vücudunda kan dolaşan canlıları konum ve hacim olarak fark edebilirsin.",
                      "yeni-alan-6": ""
                    },
                    {
                      "_id": "rmprfupsj9zjx",
                      "isim": "Kan Şifası",
                      "seviye": 2,
                      "yeni-alan-2": "Eylem",
                      "tur": "Kan",
                      "yeni-alan": "Mana",
                      "maliyet": 2,
                      "yeni-alan-3": "Anlık",
                      "yeni-alan-4": "-",
                      "yeni-alan-5": "-",
                      "aciklama": "Açık bir yaraya odaklanıp yaradaki kanın özelliğini orayı iyileştirip kapatacak şekilde dönüştürürsün.",
                      "yeni-alan-6": ""
                    },
                    {
                      "_id": "rmprfv4fumso6",
                      "isim": "Kan Alevi",
                      "seviye": 2,
                      "yeni-alan-2": "Eylem",
                      "tur": "Kan",
                      "yeni-alan": "Mana",
                      "maliyet": 2,
                      "yeni-alan-3": "Anlık",
                      "yeni-alan-4": "6 Birim",
                      "yeni-alan-5": "-",
                      "aciklama": "Menzilinde açık yarası olan bir varlığın yaralarındaki kanı kaynatarak yanma yasarı uygularsın.",
                      "yeni-alan-6": ""
                    },
                    {
                      "_id": "rmprfvn57rlq7",
                      "isim": "Kan Tuzağı",
                      "seviye": 3,
                      "yeni-alan-2": "Eylem",
                      "tur": "Kan",
                      "yeni-alan": "Mana",
                      "maliyet": 3,
                      "yeni-alan-3": "Anlık",
                      "yeni-alan-4": "6 Birim",
                      "yeni-alan-5": "-",
                      "aciklama": "Menzilde bulunan bir noktaya belirlediğin bir kan miktarı ile oluşacak bir mühür yerleştirirsin. \n\nMühür, 1 saat boyunca bu alanda kalır ve senin tetiklemen ile patlayarak basınç ve şarapnel hasarı uygular.",
                      "yeni-alan-6": ""
                    },
                    {
                      "_id": "rmprfw3ygp74v",
                      "isim": "Kan Aynası",
                      "seviye": 4,
                      "yeni-alan-2": "Eylem",
                      "tur": "Kan",
                      "yeni-alan": "Mana",
                      "maliyet": 4,
                      "yeni-alan-3": "1 Dakika",
                      "yeni-alan-4": "6 Birim",
                      "yeni-alan-5": "-",
                      "aciklama": "Menzilinde boş bir noktada havada süzülen bir kandan ayna meydana getirirsin. Bu aynanın karşısında duracak bir varlığın yansıması o anda arzuladığı şeyin görsel bir tasfirini oluşturur.",
                      "yeni-alan-6": ""
                    },
                    {
                      "_id": "rmprfwp7purqd",
                      "isim": "Zihin Dikeni",
                      "seviye": 0,
                      "yeni-alan-2": "Eylem",
                      "tur": "Efsun",
                      "yeni-alan": "Mana",
                      "maliyet": 0,
                      "yeni-alan-3": "Anlık",
                      "yeni-alan-4": "12 Birim",
                      "yeni-alan-5": "-",
                      "aciklama": "Menzilindeki bir varlığın zihinsel olarak dikkatini kırmaya çalışırsın. Odaklanacağın bir varlık İRADE testinde başarısız olursa, bir sonraki test zarında 1d4 eksi tesir alır.",
                      "yeni-alan-6": ""
                    },
                    {
                      "_id": "rmprfx3si3krr",
                      "isim": "Esinti",
                      "seviye": 0,
                      "yeni-alan-2": "Eylem",
                      "tur": "Dönüştürme",
                      "yeni-alan": "Mana",
                      "maliyet": 0,
                      "yeni-alan-3": "Anlık",
                      "yeni-alan-4": "6 Birim",
                      "yeni-alan-5": "1 Birim",
                      "aciklama": "Menzilinde görebildiğin bir alandaki havayı manüple etmeye çalışırsın. Bu alanda şu etkilerden biri meydana gelebilir:\n\n\n- Seçtiğiniz Orta veya daha küçük bir varlık, KUVVET testinde başarısız olursa senin tarafından 1 birim geriye doğru itilir. \n- Ne tutulan ne de taşınan ve 2 kilodan daha ağır olmayan bir nesneyi hareket ettirebilecek küçük bir hava patlaması meydana getirirsin. Nesne senden 2 Birim uzağa itilir. Hasara neden olacak kadar güçlü bir şekilde itilmez.\n- Havayı kullanarak yaprakların hışırdamasına, rüzgarın kepenkleri çarparak kapatmasına veya giysilerinizin bir esintide dalgalanmasına neden olmak gibi zararsız bir duyusal etki meydana getirirsin.",
                      "yeni-alan-6": ""
                    },
                    {
                      "_id": "rmprfxoenvc8g",
                      "isim": "Uçuş (K)",
                      "seviye": 3,
                      "yeni-alan-2": "Eylem",
                      "tur": "Dönüştürme",
                      "yeni-alan": "Mana",
                      "maliyet": 3,
                      "yeni-alan-3": "10 Dakika",
                      "yeni-alan-4": "-",
                      "yeni-alan-5": "-",
                      "aciklama": "Kendin veya istekli bir varlığa dokunarak uçuş niteliği kazandırırsın. Süre boyunca etki altındaki varlık 12 Birimlik uçuş hızı kazanır ve havada asılı kalabilir. Yetenek sona erdiğinde varlık havadaysa ve düşüşü durdurabilecek ek bir özelliği yoksa düşmeye başlar.",
                      "yeni-alan-6": ""
                    },
                    {
                      "_id": "rmprfy6b27j0d",
                      "isim": "Kromatik Küre",
                      "seviye": 1,
                      "yeni-alan-2": "Eylem",
                      "tur": "Yıkım",
                      "yeni-alan": "Mana",
                      "maliyet": 1,
                      "yeni-alan-3": "Anlık",
                      "yeni-alan-4": "12 Birim",
                      "yeni-alan-5": "-",
                      "aciklama": "Menzilinde görebildiğin bir hedefe rasgele hasar türüne sahip olacak bir küre fırlatırsın. Bu küre, şu hasar türlerine sahip olabilir:\n\n- Ateş\n- Soğuk\n- Basınç\n- Yıldırım\n- Asit",
                      "yeni-alan-6": ""
                    },
                    {
                      "_id": "rmprfztkx9dpv",
                      "isim": "Duyguları Bastır (K)",
                      "seviye": 2,
                      "yeni-alan-2": "Eylem",
                      "tur": "Efsun",
                      "yeni-alan": "Mana",
                      "maliyet": 2,
                      "yeni-alan-3": "1 Dakika",
                      "yeni-alan-4": "-",
                      "yeni-alan-5": "-",
                      "aciklama": "Dokunacağın bir varlığın üstündeki korkma ve cezbedilme etkilerini dindirirsin. Süre boyunca etki altındaki varlık, korkma ve cezbedilme etkilerine karşı bağışıklı halde olur.",
                      "yeni-alan-6": ""
                    },
                    {
                      "_id": "rmprg0djbac9b",
                      "isim": "Yıldırım Mızrağı",
                      "seviye": 4,
                      "yeni-alan-2": "Eylem",
                      "tur": "Yıkım",
                      "yeni-alan": "Mana",
                      "maliyet": 4,
                      "yeni-alan-3": "Anlık",
                      "yeni-alan-4": "24 Birim",
                      "yeni-alan-5": "-",
                      "aciklama": "Menzilde göreceğin bir hedefe elinde beliren yıldırımdan bir mızrak fırlatırsın. İsabet halinde hedef DAYANIKLILIK testine girerek yıldırım hasarı alır. Testi başarısız olan varlık SPAZM etkisi altında kalarak kuvvete bağlı olacak şekilde tur sayısı boyunca vücut hareketi gerektiren eylemlerine eksi değer alır. (Her 5 kuvvet için +1 tur)",
                      "yeni-alan-6": ""
                    },
                    {
                      "_id": "rmprg134uu35z",
                      "isim": "Sersemleten Çarpma",
                      "seviye": 3,
                      "yeni-alan-2": "Tepki Eylem",
                      "tur": "İnanç",
                      "yeni-alan": "Mana",
                      "maliyet": 3,
                      "yeni-alan-3": "Anlık",
                      "yeni-alan-4": "-",
                      "yeni-alan-5": "-",
                      "aciklama": "Bir hedefe silahınla yakın menzilli saldırı isabet ettirmen durumunda anlık tepki olarak rakibi çarparak sersemletebilirsin. Sersemletmen karşılığında basıç hasarı alarak DAYANIKLILIK testine giren hedef, başarısız olması durumunda kuvvete bağlı olarak belirli tur sayısı kadar süre boyunca eylemlerine 1d4 değerde eksi alır. (her 5 kuvvet için +1 tur).\n\nYetenek kuvvetinin kritik başarılı gelmesi durumunda, hedef sonraki turunun sonuna kadar SERSEMLEMİŞ kondisyonunda olur.",
                      "yeni-alan-6": ""
                    },
                    {
                      "_id": "rmprg1r1ck1hs",
                      "isim": "Yakan Çarpma",
                      "seviye": 4,
                      "yeni-alan-2": "Tepki Eylem",
                      "tur": "İnanç",
                      "yeni-alan": "Mana",
                      "maliyet": 4,
                      "yeni-alan-3": "Anlık",
                      "yeni-alan-4": "-",
                      "yeni-alan-5": "-",
                      "aciklama": "Silahınla yakın menzilli saldırı isabet ettirmen halinde hasar veren hamleni takiben rakibini alevler içinde bırakabilirsin. (Her 5 kuvvet için +1 tur)\n\nKuvvetine bağlı olarak rakibin üstündeki alevler bir süre üstünde kalarak onu yakmaya devam eder. Bu alevler, fiziki yollarla söndürülemez.",
                      "yeni-alan-6": ""
                    },
                    {
                      "_id": "rmprg27arw2qu",
                      "isim": "Yıldırım Çapası",
                      "seviye": 5,
                      "yeni-alan-2": "Eylem",
                      "tur": "Yıkım",
                      "yeni-alan": "Mana",
                      "maliyet": 5,
                      "yeni-alan-3": "Anlık",
                      "yeni-alan-4": "12 Birim",
                      "yeni-alan-5": "1 Birim (Hedef Çevresi)",
                      "aciklama": "Elinde gürleyerek beliren materyalize olmuş bir yıldırım, fırlatacağın bir hedefe saplanarak dağılır ve isabet ettiği hedefle birlikte bitişiğindeki her birime sıçarayarak yıldırım hasarı uygular. Hasar alan varlıklar DAYANIKLILIK testini geçemezse d4 tur boyunca yetenek kuvvetine bağlı olarak eylemlerinde eksi ceza alırlar (Her 4 kuvvet için -1)",
                      "yeni-alan-6": ""
                    }
                  ]
                }
              },
              {
                "id": "enerji-akimlari",
                "title": "ENERJİ AKIMLARI",
                "body": "",
                "mode": "table",
                "table": {
                  "columns": [
                    {
                      "id": "isim",
                      "label": "İSİM",
                      "type": "text",
                      "showInTable": true,
                      "snapZone": "none"
                    },
                    {
                      "id": "yeni-alan",
                      "label": "BEDEL (AKIM)",
                      "type": "text",
                      "showInTable": true,
                      "snapZone": "top"
                    },
                    {
                      "id": "yeni-alan-2",
                      "label": "DENEYİM PUANI",
                      "type": "number",
                      "showInTable": true,
                      "snapZone": "top"
                    },
                    {
                      "id": "yeni-alan-3",
                      "label": "AÇIKLAMA",
                      "type": "textarea",
                      "showInTable": false
                    },
                    {
                      "id": "yeni-alan-4",
                      "label": "NOT",
                      "type": "textarea",
                      "showInTable": false
                    }
                  ],
                  "rows": [
                    {
                      "_id": "rmprh8l17nrem",
                      "isim": "Sessiz Akım",
                      "yeni-alan": "1",
                      "yeni-alan-2": 300,
                      "yeni-alan-3": "Gerçekleştireceğin enerjisel yeteneklerde yetenek sözlerini sarf etmezsin. Etkiyi uyandırmak için 1 akım harcarsın.",
                      "yeni-alan-4": ""
                    },
                    {
                      "_id": "rmprh8v94mkp8",
                      "isim": "Dikkatli Akım",
                      "yeni-alan": "1/Karakter",
                      "yeni-alan-2": 400,
                      "yeni-alan-3": "Karakterin gerçekleştireceği alan etkili ya da rasgele hedef seçen enerjisel yetenekler, dost olarak belirlenen karakterleri hedef almaz, etkilemez. Bu etkinin uyandırılmasında muaf tutulan her karakter başına bir enerji akımı harcanır.",
                      "yeni-alan-4": ""
                    },
                    {
                      "_id": "rmprh98qsfvey",
                      "isim": "İkiz Akım",
                      "yeni-alan": "Yetenek Seviyesi",
                      "yeni-alan-2": 400,
                      "yeni-alan-3": "Karakterin gerçekleştirdiği enerjisel yetenek ikiye bölünerek fazladan bir hedefe daha yönlenir. Bu etkinin uyanabilmesi için karakterin kullandığı yeteneğin seviyesine eşdeğer miktarda Enerji Akımı kullanması gerekir.",
                      "yeni-alan-4": ""
                    },
                    {
                      "_id": "rmprh9jzs0wng",
                      "isim": "Akım Ayarlama",
                      "yeni-alan": "1",
                      "yeni-alan-2": 300,
                      "yeni-alan-3": "Karakterin yaptığı enerjisel yeteneğin kuvvetini belirlemek için kullanılmış zarı yeniden kullanmasını sağlar. Bu etkiyi uyandırmak için 1 Akım Yükü kullanılır. Yeniden kullanılan zarın değeri geçerli kabul edilir.",
                      "yeni-alan-4": ""
                    },
                    {
                      "_id": "rmprh9u96g5uj",
                      "isim": "Akım Kuvvetlendirme",
                      "yeni-alan": "2",
                      "yeni-alan-2": 400,
                      "yeni-alan-3": "Gerçekleştirdiğin bir enerjisel yeteneğin kuvvet zarına d10 eklersin. Etkiyi meydana getirmek için 2 Akım puanı harcarsın.\n\nBilinen sahir yeteneklerin arasında bilinen en yüksek seviyenin her 4 yükselişinde bu akım yeteneğine seviye atlatabilirsin. Seviye atlatmak için aynı deneyim puanı tekrar gereklidir. Seviye atlattığın zaman harcayacağın enerji akımı 2 katına çıkarken +1d10 zar eklenir.",
                      "yeni-alan-4": "Özel Gereksinim: En az 1 adet 4. Seviye Sahir yeteneği."
                    },
                    {
                      "_id": "rmprha7nxyg7v",
                      "isim": "Uzak Akım",
                      "yeni-alan": "1",
                      "yeni-alan-2": 300,
                      "yeni-alan-3": "Karakterin yaptığı enerjisel yeteneğin ulaşabileceği menzilin uzaklığı, -sistemde kullanılması tercih edilen zar türüne göre- atılacak bir d10 ya da d20 ile belirlenerek en fazla 2'ye katlanarak artar. Bu etkiyi uyandırmak için 1 Akım Yükü harcanır.",
                      "yeni-alan-4": ""
                    },
                    {
                      "_id": "rmprhagjj9dh4",
                      "isim": "Uzun Akım",
                      "yeni-alan": "1",
                      "yeni-alan-2": 300,
                      "yeni-alan-3": "Karakterin gerçekleştirdiği süreli yeteneklerin süresi, zar ile belirlenerek iki katına çıkarılabilir. Bu etki katlanarak artabilir. Ancak, temeli 1 dakika, 10 dakika, 30 dakika ve 1 saat olan büyülerde en fazla 24 saate dayanacak kadar katlanabilir. Süresi 1 günden fazla olan büyülerde ise bu etki en fazla 1 aya kadar; 1 ay olan büyülerde ise 6 aya kadar katlanabilir. Süre bakımından katlanacak zamanın temeli ne kadar uzunsa, GM tarafından harcanacak enerji akımı miktarı artırılarak dengelenmelidir. Bu etkiyi uyandırmak için 1 Akım Yükü harcanır.",
                      "yeni-alan-4": ""
                    },
                    {
                      "_id": "rmprhasqxaqs1",
                      "isim": "Seri Akım",
                      "yeni-alan": "2",
                      "yeni-alan-2": 400,
                      "yeni-alan-3": "Karakterin gerçekleştirmeye çalıştığı yeteneği hızlandırarak ek eylemde kullanılmasını sağlayabilir. Bu etkiyi uyandırmak için 2 Akım Yükü harcanır.",
                      "yeni-alan-4": "Özel Gereksinim: En az 1 adet 4. Seviye Sahir yeteneği."
                    },
                    {
                      "_id": "rmprhb48401al",
                      "isim": "Hareketsiz Akım",
                      "yeni-alan": "1",
                      "yeni-alan-2": 300,
                      "yeni-alan-3": "Gerçekleştireceğin enerjisel yeteneği kullanmak için hareket gereksiniminden muaf olursun. Etkiyi meydana getirmek için 1 akım harcarsın.",
                      "yeni-alan-4": ""
                    }
                  ]
                }
              },
              {
                "id": "fiziksel-yetenekler",
                "title": "FİZİKSEL YETENEKLER",
                "mode": "table",
                "table": {
                  "columns": [
                    {
                      "id": "isim",
                      "label": "İSİM",
                      "type": "text",
                      "showInTable": true,
                      "snapZone": "none"
                    },
                    {
                      "id": "seviye",
                      "label": "SEVİYE",
                      "type": "number",
                      "showInTable": true,
                      "snapZone": "top"
                    },
                    {
                      "id": "tur",
                      "label": "EYLEM TÜRÜ",
                      "type": "text",
                      "showInTable": true,
                      "snapZone": "top"
                    },
                    {
                      "id": "maliyet",
                      "label": "STAMİNA",
                      "type": "number",
                      "showInTable": true,
                      "snapZone": "top"
                    },
                    {
                      "id": "yeni-alan",
                      "label": "YETENEK DALI",
                      "type": "text",
                      "showInTable": true,
                      "snapZone": "top"
                    },
                    {
                      "id": "yeni-alan-2",
                      "label": "ALAN",
                      "type": "text",
                      "showInTable": true,
                      "snapZone": "top"
                    },
                    {
                      "id": "yeni-alan-3",
                      "label": "GEREKSİNİM",
                      "type": "text",
                      "showInTable": true,
                      "snapZone": "top"
                    },
                    {
                      "id": "aciklama",
                      "label": "AÇIKLAMA",
                      "type": "textarea",
                      "showInTable": false,
                      "snapZone": "bottom"
                    },
                    {
                      "id": "yeni-alan-4",
                      "label": "NOT",
                      "type": "textarea",
                      "showInTable": false
                    }
                  ],
                  "rows": [
                    {
                      "_id": "rmprgks1xuu06",
                      "isim": "Depar",
                      "seviye": 1,
                      "tur": "Eylem",
                      "maliyet": 1,
                      "yeni-alan": "Genel",
                      "yeni-alan-2": "-",
                      "aciklama": "Turunda kullanacağın hareket tipinin mesafesini ikiye katlarsın."
                    },
                    {
                      "_id": "rmprglcm6cp25",
                      "isim": "Sıvışma",
                      "seviye": 2,
                      "tur": "Eylem",
                      "maliyet": 2,
                      "yeni-alan": "Genel",
                      "yeni-alan-2": "-",
                      "aciklama": "Hareketlerin çevrendeki varlıkların fırsat saldırılarını tetiklemez.",
                      "yeni-alan-3": ""
                    },
                    {
                      "_id": "rmprgmek3k2ku",
                      "isim": "Ağır Saldırı",
                      "seviye": 2,
                      "tur": "Eylem",
                      "maliyet": 2,
                      "yeni-alan": "Genel",
                      "yeni-alan-2": "-",
                      "yeni-alan-3": "-",
                      "aciklama": "Birincil silahınla ağır bir saldırı gerçekleştirirsin. Bu saldırı, d6 ek kuvvet olacak şekilde fazladan bir kuvvet uygulamanı sağlar.",
                      "yeni-alan-4": "Geliştirilebilir Yetenek: Bu yeteneğe seviye atlatmak, kullanılacak ek kuvvet zarının azami değerinin +2 artmasını sağlar. Ek kuvvet zarının değer d12'ye ulaştığı zaman, zar miktarı ikiye bölünür ve bölünen zarlar da d12'ye ulaştıktan sonra aynı düzende bölünerek devam eder. Örneğin, 5. Seviye yetenekteki ek kuvvet zarı 2d6 olarak atılır, 6. seviye olduğunda 1d8+1d6 şeklinde devam eder."
                    },
                    {
                      "_id": "rmprgnqh6o7ar",
                      "isim": "Ek Saldırı",
                      "seviye": 2,
                      "tur": "Ek Eylem",
                      "maliyet": 2,
                      "yeni-alan": "Genel",
                      "yeni-alan-2": "-",
                      "yeni-alan-3": "-",
                      "aciklama": "Eylem olarak tekil hedefe uygulanan bir yakın mesafe saldırısı gerçekleştirdikten sonra, saldırıdan aldığın momentum ile aynı veya net alanında erişebileceğin bir hedefe fazladan bir saldırı gerçekleştirirsin.",
                      "yeni-alan-4": ""
                    },
                    {
                      "_id": "rmprgo8mdvomq",
                      "isim": "Karşı Saldırı",
                      "seviye": 3,
                      "tur": "Tepki Eylem",
                      "maliyet": 3,
                      "yeni-alan": "Genel",
                      "yeni-alan-2": "-",
                      "yeni-alan-3": "-",
                      "aciklama": "Rakibinden gelen bir yakın mezilli saldırıyı savuşturman durumunda, rakibin turunun arasına girerek tepki olarak birincil silahın ile bir saldırı gerçekleştirirsin.",
                      "yeni-alan-4": ""
                    },
                    {
                      "_id": "rmprgon0io64b",
                      "isim": "Kırıcı Karşılama",
                      "seviye": 3,
                      "tur": "Tepki Eylem",
                      "maliyet": 3,
                      "yeni-alan": "Genel",
                      "yeni-alan-2": "-",
                      "yeni-alan-3": "-",
                      "aciklama": "Rakibinden gelen bir yakın mezilli saldırıyı silahınla bloklayarak karşılamaya çalışırsın. Başarılı bir karşılama sonucunda rakibinin gardını kıracak şekilde bir hamle meydana gelir. Gardı kırılan rakibinin turu sonlanır ve tur ona gelene kadar alacağı ilk saldırıya karşı ek puanlarından arındırılmış şekilde dezavantajlı savuşturma yapmaya çalışır.",
                      "yeni-alan-4": ""
                    },
                    {
                      "_id": "rmprgp2uzbpbz",
                      "isim": "Seri Darbe",
                      "seviye": 4,
                      "tur": "Eylem",
                      "maliyet": 4,
                      "yeni-alan": "Kılıç Sanatları",
                      "yeni-alan-2": "-",
                      "yeni-alan-3": "-",
                      "aciklama": "Kılıcınla seri bir şekilde birbirini takip eden iki hamle gerçekleştirirsin. Bu hamleler rakibin savuşturmasına arka arkaya eksi puan verebilir.",
                      "yeni-alan-4": ""
                    },
                    {
                      "_id": "rmprgq2kfgef8",
                      "isim": "Sıyrılma",
                      "seviye": 4,
                      "tur": "Tepki Eylem",
                      "maliyet": 4,
                      "yeni-alan": "Çeviklik",
                      "yeni-alan-2": "-",
                      "yeni-alan-3": "Çeviklik 3. Seviye",
                      "aciklama": "Bir yakın mesafe saldırısıyla isabet aldığın zaman, saldırının sana temas ettiği anda reflekslerini konuşturarak alacağın hamlenin bir kısmından sıyrılarak hasarı azaltmaya çalışırsın.",
                      "yeni-alan-4": ""
                    },
                    {
                      "_id": "rmprgqt5z1jkl",
                      "isim": "Silahsızlandır",
                      "seviye": 3,
                      "tur": "Tepki Eylem",
                      "maliyet": 2,
                      "yeni-alan": "Genel",
                      "yeni-alan-2": "-",
                      "yeni-alan-3": "-",
                      "aciklama": "Rakibine başarılı bir şekilde gerçekleştirdiğin fiziksel saldırının ardından tepki olarak rakibinin silahını kancalayarak elinden çekip fırlatmaya çalışırsın. KUVVET mücadelesinde galip gelirsen, rakibin silahını 2 birim uzaklıkta bir noktaya fırlatırsın.",
                      "yeni-alan-4": ""
                    },
                    {
                      "_id": "rmprgrfvktm0o",
                      "isim": "Süpürme Saldırısı",
                      "seviye": 3,
                      "tur": "Eylem",
                      "maliyet": 3,
                      "yeni-alan": "Genel",
                      "yeni-alan-2": "Net Alan",
                      "yeni-alan-3": "-",
                      "aciklama": "Net saldırı alanlarını kapsayan, Birincil silahını tuttuğun elinin tarafından başlatacağın ve bu alanı diğer tarafa doğru süpürecek şekilde bir silah savurma hamlesi gerçekleştirirsin. Saldırın için sırada olan her varlık bir savuşturma hamlesi kullanır. Hamlesi başarısız olan varlık kuvvete bağlı olarak hamleden etkilenir, saldırı bir sonraki hedefe devam eder. Eğer bir varlık saldırıyı durduracak bir savuşturma uygularsa süpürme tamamlanmadan sonlanabilir.",
                      "yeni-alan-4": ""
                    },
                    {
                      "_id": "rmprgrvvuixi1",
                      "isim": "Duruş: Geçitkıran (O)",
                      "seviye": 4,
                      "tur": "Odaklanma",
                      "maliyet": 2,
                      "yeni-alan": "Genel",
                      "yeni-alan-2": "-",
                      "yeni-alan-3": "-",
                      "aciklama": "Gardını alıp kendini odaklayarak, menziline giren varlıklara sınırlandırma olmadan fırsat saldırısı gerçekleştirebilirsin. Gerçekleştirdiğin her fırsat saldırısı 2 STAMINA tüketir.",
                      "yeni-alan-4": ""
                    },
                    {
                      "_id": "rmprgsgwcduol",
                      "isim": "Manevra: Hassas Saldırı",
                      "seviye": 2,
                      "tur": "Tepki Eylem",
                      "maliyet": 2,
                      "yeni-alan": "Kılıç Sanatları",
                      "yeni-alan-2": "-",
                      "yeni-alan-3": "-",
                      "aciklama": "Yakın menzilli saldırının başarısız olması durumunda, ek bir d6 kullanarak mevcut isabet zarına sonucu ekleyebilirsin.",
                      "yeni-alan-4": ""
                    },
                    {
                      "_id": "rmprgt3oshtgp",
                      "isim": "Geçit Kesen",
                      "seviye": 4,
                      "tur": "Tepki Eylem",
                      "maliyet": 3,
                      "yeni-alan": "Genel",
                      "yeni-alan-2": "-",
                      "yeni-alan-3": "Silah Yetkinliği 3. Seviye",
                      "aciklama": "Fırsat saldırısını görmezden gelen yeteneklere karşı özel bir fırsat saldırısı gerçekleştirebilirsin.",
                      "yeni-alan-4": ""
                    },
                    {
                      "_id": "rmprgty6rg1g9",
                      "isim": "Manevra: Çelme",
                      "seviye": 2,
                      "tur": "Tepki Eylem",
                      "maliyet": 2,
                      "yeni-alan": "Genel",
                      "yeni-alan-2": "-",
                      "yeni-alan-3": "-",
                      "aciklama": "Bir rakibe yakın menzilli saldırınla vurman durumunda, ek bir kuvvet zarı kullanarak anında karaktere çelme takıp yere düşürmeyi denersin. KUVVET testinde başarısız olması durumunda rakip yere serilir.",
                      "yeni-alan-4": ""
                    }
                  ]
                }
              },
              {
                "id": "savas-sanatlari",
                "title": "SAVAŞ SANATLARI",
                "mode": "table",
                "table": {
                  "columns": [
                    {
                      "id": "isim",
                      "label": "İSİM",
                      "type": "text",
                      "showInTable": true,
                      "snapZone": "none"
                    },
                    {
                      "id": "seviye",
                      "label": "SEVİYE",
                      "type": "number",
                      "showInTable": true,
                      "snapZone": "top"
                    },
                    {
                      "id": "yeni-alan",
                      "label": "ENERJİ",
                      "type": "text",
                      "showInTable": true,
                      "snapZone": "top"
                    },
                    {
                      "id": "tur",
                      "label": "EYLEM TÜRÜ",
                      "type": "text",
                      "showInTable": true,
                      "snapZone": "top"
                    },
                    {
                      "id": "maliyet",
                      "label": "STAMİNA",
                      "type": "number",
                      "showInTable": true,
                      "snapZone": "top"
                    },
                    {
                      "id": "yeni-alan-2",
                      "label": "BEDEL",
                      "type": "text",
                      "showInTable": true,
                      "snapZone": "top"
                    },
                    {
                      "id": "yeni-alan-3",
                      "label": "SÜRE",
                      "type": "text",
                      "showInTable": true,
                      "snapZone": "top"
                    },
                    {
                      "id": "yeni-alan-4",
                      "label": "MENZİL",
                      "type": "text",
                      "showInTable": true,
                      "snapZone": "top"
                    },
                    {
                      "id": "yeni-alan-5",
                      "label": "ALAN",
                      "type": "text",
                      "showInTable": false,
                      "snapZone": "top"
                    },
                    {
                      "id": "yeni-alan-6",
                      "label": "AÇIKLAMA",
                      "type": "textarea",
                      "showInTable": false
                    },
                    {
                      "id": "yeni-alan-7",
                      "label": "NOT",
                      "type": "textarea",
                      "showInTable": false
                    }
                  ],
                  "rows": [
                    {
                      "_id": "rmprgxq8tot3p",
                      "isim": "Basınç Patlaması",
                      "seviye": 1,
                      "yeni-alan": "Yıkım",
                      "tur": "Eylem",
                      "maliyet": 1,
                      "yeni-alan-2": "1 Mana",
                      "yeni-alan-3": "Anlık",
                      "yeni-alan-4": "-",
                      "yeni-alan-5": "-",
                      "yeni-alan-6": "Silahınla veya yumruğunla vuracağın bir hedefe vuruş anında patlama alıştıracak bir etki yaratırsın. Oluşan etki ile hedef hasarı alır ve DAYANIKLILIK testine girer. Testi geçememesi durumunda hedef 1 birim geriye kayar. Kritik başarı durumunda bu mesafe 2'ye yükselir.",
                      "yeni-alan-7": ""
                    },
                    {
                      "_id": "rmprgykoybhj7",
                      "isim": "Çatlayan Yerler",
                      "seviye": 2,
                      "yeni-alan": "Yıkım",
                      "tur": "Eylem",
                      "maliyet": 2,
                      "yeni-alan-2": "2 Mana",
                      "yeni-alan-3": "Anlık",
                      "yeni-alan-4": "-",
                      "yeni-alan-5": "4 Birim Doğrusal",
                      "yeni-alan-6": "Silahını yere saplayarak yıkım enerjisini doğrusal şekilde tesir ettirirsin. 4 birim mesafeye kadar doğrusal bir mesafede zemin çatlar ve yukarıya doğru basınçla patlar. Patlamanın etkisinde kalan varlıklar kaçınmazlarsa, basınç hasarı alarak ÇEVİKLİK testine girerler. Testi geçemeyen varlıklar yere serilir.",
                      "yeni-alan-7": ""
                    },
                    {
                      "_id": "rmprgzfvavqvu",
                      "isim": "Alev Şeridi",
                      "seviye": 2,
                      "yeni-alan": "Yıkım",
                      "tur": "Eylem",
                      "maliyet": 2,
                      "yeni-alan-2": "3",
                      "yeni-alan-3": "Anlık",
                      "yeni-alan-4": "-",
                      "yeni-alan-5": "3 Birim Doğrusal",
                      "yeni-alan-6": "Tutuğun keskin uçlu bir silahı savurmanla 3 birim ileriye doğru yayılarak 3 birim doğrusal ilerleyecek şekilde hücum eden bir alev dalgası oluşturursun. Bu dalga, silahınla gerçekleştirdiğin kesme doğrultusunu takip eden çizgisel bir yapıdadır. Şerit bir rakibe isabet etmesi halinde ona çarparak dağılır.",
                      "yeni-alan-7": ""
                    }
                  ]
                }
              },
              {
                "id": "ozel-beceriler",
                "title": "ÖZEL BECERİLER",
                "mode": "table",
                "table": {
                  "columns": [
                    {
                      "id": "isim",
                      "label": "İSİM",
                      "type": "text",
                      "showInTable": true,
                      "snapZone": "none"
                    },
                    {
                      "id": "tur",
                      "label": "TEMEL DENEYİM PUANI",
                      "type": "number",
                      "showInTable": true,
                      "snapZone": "top"
                    },
                    {
                      "id": "seviye",
                      "label": "GEREKSİNİM",
                      "type": "text",
                      "showInTable": true,
                      "snapZone": "top"
                    },
                    {
                      "id": "aciklama",
                      "label": "AÇIKLAMA",
                      "type": "textarea",
                      "showInTable": false,
                      "snapZone": "bottom"
                    },
                    {
                      "id": "yeni-alan",
                      "label": "NOT",
                      "type": "textarea",
                      "showInTable": false
                    }
                  ],
                  "rows": [
                    {
                      "_id": "rmprh1rufbvd0",
                      "isim": "Aşçılık",
                      "tur": 100,
                      "seviye": "-",
                      "aciklama": "Karakterin yemek yapma konusundaki el hassasiyetini, tarifleri  uygulama yetisini, lezzeti oluşturma konusundaki tecrübeye bağlı deneyim ve yetkinliğidir.",
                      "yeni-alan": ""
                    },
                    {
                      "_id": "rmprh24hvp1k1",
                      "isim": "Demircilik",
                      "tur": 250,
                      "seviye": "-",
                      "aciklama": "Karakterin demiri işleme ve ondan bir ürün meydana getirebilme, var olan ürünü tamir edebilme ya da dönüştürebilme becerisi.",
                      "yeni-alan": ""
                    },
                    {
                      "_id": "rmprh2durgzml",
                      "isim": "Akrobasi",
                      "tur": 100,
                      "seviye": "Çeviklik: 2",
                      "aciklama": "Bir karakterin dengesini koruma, hızlı reaksiyonlar sırasında esnek davranma gibi tepkileri ve genel yeteneğine katkısını belirler.",
                      "yeni-alan": ""
                    },
                    {
                      "_id": "rmprh2zrqgs9w",
                      "isim": "Dericilik",
                      "tur": 250,
                      "seviye": "-",
                      "aciklama": "Karakterin deriyi işleme, tamir etme, deriden bir ürün elde etmeyle ilgili becerisidir.",
                      "yeni-alan": ""
                    },
                    {
                      "_id": "rmprh3952xnly",
                      "isim": "Ahşap Oymacılığı",
                      "tur": 150,
                      "seviye": "-",
                      "aciklama": "Karakterin tahta materyalleri şekillendirmesini, oyma yoluyla farklı formlar kazandırmasını sağlayan beceridir.",
                      "yeni-alan": ""
                    },
                    {
                      "_id": "rmprh3mqajkh5",
                      "isim": "Simyacılık",
                      "tur": 250,
                      "seviye": "-",
                      "aciklama": "Karakterin iksir üretme, üretim sırasında hataları tespit etme, tanıdık iksirlerin işlevini tahmin etme gibi durumlarda kullanabileceği becerisidir.",
                      "yeni-alan": ""
                    },
                    {
                      "_id": "rmprh3wicwxnc",
                      "isim": "Çizerlik",
                      "tur": 100,
                      "seviye": "-",
                      "aciklama": "Bir karakterin gördüklerini veya hayalindekileri kağıt benzeri yüzeylere çizerek aktarmasını test eden beceridir.",
                      "yeni-alan": "Bu beceri geliştirilmek istendiğinde, çizim ya da sanatsal faaliyetin hangi dalında ilerleneceği belirlenmelidir."
                    }
                  ]
                }
              },
              {
                "id": "hunerler",
                "title": "HÜNERLER",
                "mode": "table",
                "table": {
                  "columns": [
                    {
                      "id": "isim",
                      "label": "HÜNER İSMİ",
                      "type": "text",
                      "showInTable": true,
                      "snapZone": "none"
                    },
                    {
                      "id": "aciklama",
                      "label": "AÇIKLAMA",
                      "type": "textarea",
                      "showInTable": false,
                      "snapZone": "bottom"
                    },
                    {
                      "id": "yeni-alan",
                      "label": "NOT",
                      "type": "textarea",
                      "showInTable": false
                    }
                  ],
                  "rows": [
                    {
                      "_id": "rmprh5p1mdx1i",
                      "isim": "Alarmda",
                      "aciklama": "Çevrene yönelik özel bir dikkat içerisinde olduğun zamanlarda TETİKTE durumu kazanmanı sağlar.",
                      "yeni-alan": "TETİKTE: Çevresel beklenti ve tepkin üst düzeydedir. Herhangi bir şekilde gafil avlanamazsın."
                    },
                    {
                      "_id": "rmprh5yc004c4",
                      "isim": "Keskin Hafıza",
                      "aciklama": "1 ay önceye kadar yaşadığın olayları, gördüğün veya duyduğun şeyleri rahatça hatırlayabilirsin.",
                      "yeni-alan": ""
                    },
                    {
                      "_id": "rmprh67o2ds9k",
                      "isim": "Dil Şifreleme",
                      "aciklama": "Konuşabildiğin dilin içine aynı sistemi bilenler tarafından anlaşılabilecek şifreleme şeklinde farklı kelime grupları veya deyimler gibi yapılar ekleyebilirsin. \n\nBu şifrelemeyi gerçekleştirirken, karşı taraf aynı düzenden çıkmış aynı hünere sahipse senin söylemek istediklerini anlar. Eğer aynı hünere sahip ancak aynı düzenden çıkmamışsa senin şifrelenmiş bir şeyler anlatmaya çalıştığının farkındadır. Böyle bir durumda, ZEKÂ testine girerek anlatmak istediğin mesajı anlamaya çalışabilir.",
                      "yeni-alan": ""
                    }
                  ]
                }
              }
            ]
          },
          "evren-rehberi": {
            "label": "EVREN REHBERİ",
            "blurb": "Diyarlar, varlıklar ve yaratıklarla SLVNZ evreninin atlası.",
            "type": "hub",
            "items": [
              {
                "id": "genel-evren",
                "title": "GENEL EVREN",
                "blurb": "Evrenin genel işleyişi, kozmolojisi ve temel kavramları.",
                "pages": [
                  {
                    "id": "giris",
                    "title": "GİRİŞ",
                    "mode": "text",
                    "body": "Bu bölümün açıklaması henüz yazılmadı. Buraya ilgili kuralların, tanımların ve örneklerin geleceği yer tutucu bir metindir.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.\n\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident."
                  }
                ]
              },
              {
                "id": "diyarlar",
                "title": "DİYARLAR",
                "blurb": "Evreni oluşturan diyarlar, katmanlar ve düzlemler.",
                "pages": [
                  {
                    "id": "giris",
                    "title": "GİRİŞ",
                    "mode": "text",
                    "body": "Bu bölümün açıklaması henüz yazılmadı. Buraya ilgili kuralların, tanımların ve örneklerin geleceği yer tutucu bir metindir.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.\n\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident."
                  }
                ]
              },
              {
                "id": "varliklar",
                "title": "VARLIKLAR",
                "blurb": "Evrende yaşayan akıllı ırklar, halklar ve varlıklar.",
                "pages": [
                  {
                    "id": "giris",
                    "title": "GİRİŞ",
                    "mode": "text",
                    "body": "Bu bölümün açıklaması henüz yazılmadı. Buraya ilgili kuralların, tanımların ve örneklerin geleceği yer tutucu bir metindir.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.\n\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident."
                  }
                ]
              },
              {
                "id": "yaratiklar",
                "title": "YARATIKLAR",
                "blurb": "Vahşi yaratıklar ve canavarlardan oluşan bestiyer.",
                "pages": [
                  {
                    "id": "giris",
                    "title": "BESTİYER",
                    "mode": "creature-list",
                    "creatures": []
                  }
                ]
              }
            ]
          }
        }
      }
    }
  ],
  "defaultId": "ver_mprc997t"
};


/* Normalizasyon: metin öğelerine body, tablo satırlarına _id garanti et. */
(function normalize(c){var rid=0;Object.values(c.sections).forEach(function(sec){sec.items.forEach(function(it){if(it.mode==="table"){if(!it.table)it.table={columns:[],rows:[]};if(!Array.isArray(it.table.columns))it.table.columns=[];if(!Array.isArray(it.table.rows))it.table.rows=[];it.table.rows.forEach(function(r){if(!r._id)r._id="r"+(++rid)+"_"+Date.now().toString(36);});}else if(!it.body){it.body=window.SLVNZ_PLACEHOLDER_BODY;}});});})(window.SLVNZ_CONTENT);
