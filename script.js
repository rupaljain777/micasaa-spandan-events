const CONFIG = window.MICASAA_CONFIG || {};

const I18N = {
  en: {
    languageLabel:'Language', creative:'🎨 Creative', talent:'🎤 Talent', sports:'🏏 Sports', culinary:'🍲 Culinary', venue:'📍 Venue', venueValue:'MiCasaa Club House', forLabel:'👨‍👩‍👧‍👦 For', residents:'MiCasaa Residents', registrationLabel:'📝 Registration', registrationOpen:'Open for listed competitions', updates:'📣 Updates', timingsSeparate:'Tentative timings shown below · Final updates may be shared 1 day before on society WhatsApp group.', viewSchedule:'View Schedule', registerNow:'Register Now', heroEyebrow:'14–25 September 2026 · 12 Days of Celebration', ganeshUtsav:'Ganesh Utsav', competitionRegistration:'Competition Registration', heroText:'A celebration of devotion, creativity, talent, sport and togetherness — right here at MiCasaa.', registerCompetitions:'Register for Competitions', planParticipation:'Plan your participation', festivalTimeline:'Festival Timeline', registrationMarked:'Registration is required only for competition / participation events marked <span class="pill">Register</span>.', competitionEntry:'Competition Entry', registerParticipation:'Register Your Participation', selectEventsIntro:'Select one or more events. Event-specific questions will appear automatically.', participantDetails:'Participant details', participantName:'Participant name', flatNumber:'Flat number', wing:'Wing', age:'Age', ageGroup:'Age group', mobile:'WhatsApp / Mobile', guardianName:'Parent / Guardian name', forChildren:'(for children)', selectWing:'Select wing', selectAgeGroup:'Select age group', juniorKids:'Junior Kids: 3 – 6 years', seniorKids:'Senior Kids: 7 – 12 years', teens:'Teens: 13 – 19 years', adults:'Adults: 20 – 59 years', seniorCitizens:'Senior Citizens: 60+ years', fullNamePlaceholder:'Full name', flatPlaceholder:'e.g. 803', agePlaceholder:'Age', mobilePlaceholder:'10-digit mobile number', guardianPlaceholder:'Parent or guardian name', checkExisting:'Check Existing Registration', existingHelp:'We match by participant name + wing + flat + mobile. If found, the saved entry will load here for editing.', chooseCompetitions:'Choose competition(s)', multipleEvents:'You may select multiple events.', selectAtLeastOne:'Please select at least one competition.', eventDetails:'Event details', confirmation:'Confirmation', confirmDetails:'I confirm the details are correct and the participant will be available on the scheduled event date.', photoConsent:'I am okay with event photographs/videos being used in MiCasaa society communication.', submitRegistration:'Submit Registration', updateRegistration:'Update Registration', submitting:'Submitting…', updating:'Updating…', privacyNote:'🔒 Details are collected only for Ganesh Utsav coordination by Micasaa Spandan Committee.', beforeSubmit:'Before you submit', tipOneForm:'Use one form per participant.', tipMultiple:'You can choose multiple competitions.', tipGroup:'For group talent entries, mention all team members.', tipTimings:'Timings shown are tentative and may be updated 1 day before each event.', participationQuote:'“Participation makes the celebration brighter.”', registrationReceived:'Registration received!', registrationUpdated:'Registration updated!', successThankYou:'Thank you for participating in MiCasaa Ganesh Utsav 2026.', successUpdated:'Your existing competition registration has been updated successfully.', done:'Done', registerTag:'Register', select:'Select', speechQuestion:'What will you present?', selectAllApply:'Select all that apply.', speechShlok:'Ganesh Shlok', speechPoem:'Poem', speechShortSpeech:'Short Speech', duration:'Approx. duration', performanceCategory:'Performance category', performanceHint:'Select one or more performance types.', perfDance:'Dance', perfSinging:'Singing', perfDrama:'Drama', perfSkit:'Skit', perfInstrumental:'Instrumental Music', perfOther:'Other', participationType:'Participation type', participationHint:'Select all that apply across your performances.', partSolo:'Solo', partDuo:'Duo', partGroup:'Group', performanceAct:'Performance / act name(s)', performanceDuration:'Approx. duration(s)', groupMembers:'Group member names', specialRequirement:'Special requirement', sportsHelp:'Your selected sports are already captured above. If registering a team event, add team information here.', teamDetails:'Team / partner details', foodStallName:'Stall / Display Name', foodCategory:'Food Category', foodCategoryHint:'Select all categories that apply.', foodSnacks:'Snacks', foodChaat:'Chaat', foodMain:'Main Course', foodDessert:'Dessert / Sweets', foodBeverages:'Beverages', foodHealthy:'Healthy / Homemade', foodOther:'Other', foodItems:'Items you plan to sell / serve', foodNote:'Food Stall participants are requested to arrange their own table and any power/electrical requirements needed for their stall.', anythingElse:'Anything else?', committeeNotes:'Notes for the organising committee', optional:'Optional', noExisting:'No existing registration found. You can continue with a new registration.', checking:'Checking for an existing registration…', identityFirst:'Enter participant name, wing, flat number and a valid mobile number first.', editFound:'Existing registration {id} found. We loaded the saved details. Make any changes and press Update Registration.', editMode:'Edit mode', registrationId:'Registration ID', flatWord:'Flat', wingWord:'Wing', speechTitle:'Ganesh Shlok / Poem / Short Speech', sportsDay:'Sports Day', foodStall:'Food Stall', note:'Note', dailyAarti:'Daily Aarti', morningAarti:'Morning Aarti', eveningAartiWeekdays:'Evening Aarti (weekdays)', eveningAartiWeekends:'Evening Aarti (weekends)', tentativeTimeNote:'All event timings are tentative and may be updated 1 day before the event.', tentativeBadge:'Tentative', shareConfirmationTitle:'Required final step', shareConfirmationHelp:'To complete the registration, you must send these details to the Micasaa Spandan Committee on WhatsApp.', sendCommitteeWhatsApp:'Mandatory: Send to Committee on WhatsApp', sendSelfWhatsApp:'Send to My WhatsApp', copyRegistrationDetails:'Copy registration details', copied:'Registration details copied.', whatsappOpen:'WhatsApp opened. Please tap Send, then return here.', shareUnavailable:'Could not open WhatsApp. Please try again.', sendFirstToFinish:'Send on WhatsApp to finish', whatsappDone:'I have sent it — Done',
    days:['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
    events:{agaman:'Ganpati Bappa Agaman',shlok:'Ganesh Shlok, Poem, Short Speech',pakKala:'Pak Kala Competition',bhajan:'MiCasaa Bhajan Mandal',foodStall:'Food Stall',shriramBhajan:'Shriram-Janaki Mahila Bhajni Mandal',talentSenior:'MiCasaa Got Talent — Seniors',drawing:'Drawing Competition',talentJunior:'MiCasaa Got Talent — Juniors',sports:'Sports Day',mahaprasad:'Mahaprasad',rangoli:'Rangoli Competition',satyanarayan:'Satyanarayana Pooja',musicalChairs:'Musical Chairs',prize:'Prize Distribution',visarjan:'Ganpati Bappa Visarjan'},
    details:{talent:'Dance, Drama, Skit, Singing, Music, Other',sports:'Cricket, Football, Sack Race, Lemon Spoon Race'},
    comps:{shlok:'Ganesh Shlok / Poem / Short Speech',pakKala:'Pak Kala Competition',foodStall:'Food Stall',talentSenior:'MiCasaa Got Talent — Seniors',drawing:'Drawing Competition',talentJunior:'MiCasaa Got Talent — Juniors',cricket:'Sports Day — Cricket',football:'Sports Day — Football',sackRace:'Sports Day — Sack Race',lemonSpoon:'Sports Day — Lemon Spoon Race',rangoli:'Rangoli Competition',musicalChairs:'Musical Chairs'}
  },
  hi: {
    languageLabel:'भाषा', creative:'🎨 रचनात्मक', talent:'🎤 प्रतिभा', sports:'🏏 खेल', culinary:'🍲 पाक कला', venue:'📍 स्थान', venueValue:'MiCasaa Club House', forLabel:'👨‍👩‍👧‍👦 किसके लिए', residents:'MiCasaa निवासी', registrationLabel:'📝 पंजीकरण', registrationOpen:'सूचीबद्ध प्रतियोगिताओं के लिए खुला', updates:'📣 अपडेट', timingsSeparate:'नीचे संभावित समय दिया है · अंतिम अपडेट 1 दिन पहले सोसायटी WhatsApp ग्रुप पर साझा किया जा सकता है।', viewSchedule:'कार्यक्रम देखें', registerNow:'अभी पंजीकरण करें', heroEyebrow:'14–25 सितंबर 2026 · 12 दिनों का उत्सव', ganeshUtsav:'गणेश उत्सव', competitionRegistration:'प्रतियोगिता पंजीकरण', heroText:'भक्ति, रचनात्मकता, प्रतिभा, खेल और साथ होने का उत्सव — हमारे MiCasaa में।', registerCompetitions:'प्रतियोगिताओं के लिए पंजीकरण करें', planParticipation:'अपनी भागीदारी की योजना बनाएं', festivalTimeline:'उत्सव कार्यक्रम', registrationMarked:'केवल उन प्रतियोगिता / भागीदारी कार्यक्रमों के लिए पंजीकरण आवश्यक है जिन पर <span class="pill">पंजीकरण</span> लिखा है।', competitionEntry:'प्रतियोगिता प्रवेश', registerParticipation:'अपनी भागीदारी दर्ज करें', selectEventsIntro:'एक या अधिक कार्यक्रम चुनें। कार्यक्रम के अनुसार अतिरिक्त प्रश्न अपने-आप दिखाई देंगे।', participantDetails:'प्रतिभागी की जानकारी', participantName:'प्रतिभागी का नाम', flatNumber:'फ्लैट नंबर', wing:'विंग', age:'आयु', ageGroup:'आयु वर्ग', mobile:'व्हाट्सऐप / मोबाइल', guardianName:'माता-पिता / अभिभावक का नाम', forChildren:'(बच्चों के लिए)', selectWing:'विंग चुनें', selectAgeGroup:'आयु वर्ग चुनें', juniorKids:'जूनियर बच्चे: 3 – 6 वर्ष', seniorKids:'सीनियर बच्चे: 7 – 12 वर्ष', teens:'किशोर: 13 – 19 वर्ष', adults:'वयस्क: 20 – 59 वर्ष', seniorCitizens:'वरिष्ठ नागरिक: 60+ वर्ष', fullNamePlaceholder:'पूरा नाम', flatPlaceholder:'जैसे 803', agePlaceholder:'आयु', mobilePlaceholder:'10 अंकों का मोबाइल नंबर', guardianPlaceholder:'माता-पिता या अभिभावक का नाम', checkExisting:'पहले का पंजीकरण जांचें', existingHelp:'नाम + विंग + फ्लैट + मोबाइल से रिकॉर्ड मिलाया जाएगा। रिकॉर्ड मिलने पर उसे यहाँ संपादन के लिए लोड किया जाएगा।', chooseCompetitions:'प्रतियोगिता चुनें', multipleEvents:'आप एक से अधिक कार्यक्रम चुन सकते हैं।', selectAtLeastOne:'कृपया कम से कम एक प्रतियोगिता चुनें।', eventDetails:'कार्यक्रम की जानकारी', confirmation:'पुष्टि', confirmDetails:'मैं पुष्टि करता/करती हूँ कि जानकारी सही है और प्रतिभागी निर्धारित तारीख पर उपलब्ध रहेगा।', photoConsent:'MiCasaa सोसायटी संचार में कार्यक्रम की फोटो/वीडियो के उपयोग से मुझे आपत्ति नहीं है।', submitRegistration:'पंजीकरण जमा करें', updateRegistration:'पंजीकरण अपडेट करें', submitting:'जमा हो रहा है…', updating:'अपडेट हो रहा है…', privacyNote:'🔒 जानकारी केवल गणेश उत्सव समन्वय के लिए Micasaa Spandan Committee द्वारा उपयोग की जाएगी।', beforeSubmit:'जमा करने से पहले', tipOneForm:'हर प्रतिभागी के लिए एक फॉर्म भरें।', tipMultiple:'आप कई प्रतियोगिताएँ चुन सकते हैं।', tipGroup:'समूह प्रतिभा कार्यक्रम में सभी सदस्यों के नाम लिखें।', tipTimings:'दिया गया समय संभावित है और हर कार्यक्रम से 1 दिन पहले अपडेट हो सकता है।', participationQuote:'“आपकी भागीदारी उत्सव को और सुंदर बनाती है।”', registrationReceived:'पंजीकरण प्राप्त हुआ!', registrationUpdated:'पंजीकरण अपडेट हुआ!', successThankYou:'MiCasaa गणेश उत्सव 2026 में भाग लेने के लिए धन्यवाद।', successUpdated:'आपका मौजूदा प्रतियोगिता पंजीकरण सफलतापूर्वक अपडेट हो गया है।', done:'ठीक है', registerTag:'पंजीकरण', select:'चुनें', speechQuestion:'आप क्या प्रस्तुत करेंगे?', selectAllApply:'लागू सभी विकल्प चुनें।', speechShlok:'गणेश श्लोक', speechPoem:'कविता', speechShortSpeech:'लघु भाषण', duration:'अनुमानित अवधि', performanceCategory:'प्रस्तुति श्रेणी', performanceHint:'एक या अधिक प्रस्तुति प्रकार चुनें।', perfDance:'नृत्य', perfSinging:'गायन', perfDrama:'नाटक', perfSkit:'स्किट', perfInstrumental:'वाद्य संगीत', perfOther:'अन्य', participationType:'भागीदारी प्रकार', participationHint:'अपनी प्रस्तुतियों पर लागू सभी विकल्प चुनें।', partSolo:'एकल', partDuo:'युगल', partGroup:'समूह', performanceAct:'प्रस्तुति / कार्यक्रम का नाम', performanceDuration:'अनुमानित अवधि', groupMembers:'समूह सदस्यों के नाम', specialRequirement:'विशेष आवश्यकता', sportsHelp:'आपके चुने हुए खेल ऊपर दर्ज हैं। टीम इवेंट के लिए टीम की जानकारी यहाँ दें।', teamDetails:'टीम / पार्टनर की जानकारी', foodStallName:'स्टॉल / डिस्प्ले नाम', foodCategory:'खाद्य श्रेणी', foodCategoryHint:'लागू सभी श्रेणियाँ चुनें।', foodSnacks:'स्नैक्स', foodChaat:'चाट', foodMain:'मुख्य भोजन', foodDessert:'मिठाई / स्वीट्स', foodBeverages:'पेय', foodHealthy:'हेल्दी / घर का बना', foodOther:'अन्य', foodItems:'बेचने / परोसने वाले आइटम', foodNote:'फूड स्टॉल प्रतिभागियों को टेबल और बिजली/इलेक्ट्रिकल व्यवस्था स्वयं करनी होगी।', anythingElse:'कुछ और?', committeeNotes:'आयोजन समिति के लिए नोट्स', optional:'वैकल्पिक', noExisting:'कोई पुराना पंजीकरण नहीं मिला। आप नया पंजीकरण कर सकते हैं।', checking:'पुराना पंजीकरण जांचा जा रहा है…', identityFirst:'पहले प्रतिभागी का नाम, विंग, फ्लैट नंबर और सही मोबाइल नंबर भरें।', editFound:'पंजीकरण {id} मिला। सहेजी गई जानकारी लोड कर दी गई है। बदलाव करें और पंजीकरण अपडेट करें दबाएं।', editMode:'संपादन मोड', registrationId:'पंजीकरण आईडी', flatWord:'फ्लैट', wingWord:'विंग', speechTitle:'गणेश श्लोक / कविता / लघु भाषण', sportsDay:'खेल दिवस', foodStall:'फूड स्टॉल', note:'नोट', dailyAarti:'प्रतिदिन आरती', morningAarti:'सुबह की आरती', eveningAartiWeekdays:'शाम की आरती (कार्यदिवस)', eveningAartiWeekends:'शाम की आरती (सप्ताहांत)', tentativeTimeNote:'सभी कार्यक्रमों का समय संभावित है और कार्यक्रम से 1 दिन पहले अपडेट हो सकता है।', tentativeBadge:'संभावित समय', shareConfirmationTitle:'अंतिम अनिवार्य चरण', shareConfirmationHelp:'पंजीकरण पूरा करने के लिए यह विवरण Micasaa Spandan Committee को WhatsApp पर भेजना अनिवार्य है।', sendCommitteeWhatsApp:'अनिवार्य: समिति को WhatsApp पर भेजें', sendSelfWhatsApp:'मेरे WhatsApp पर भेजें', copyRegistrationDetails:'पंजीकरण विवरण कॉपी करें', copied:'पंजीकरण विवरण कॉपी हो गया।', whatsappOpen:'WhatsApp खुल गया है। कृपया Send दबाकर यहाँ वापस आएँ।', shareUnavailable:'WhatsApp नहीं खुल सका। कृपया फिर से प्रयास करें।', sendFirstToFinish:'पूरा करने के लिए पहले WhatsApp पर भेजें', whatsappDone:'मैंने भेज दिया — पूर्ण',
    days:['रविवार','सोमवार','मंगलवार','बुधवार','गुरुवार','शुक्रवार','शनिवार'],
    events:{agaman:'गणपति बप्पा आगमन',shlok:'गणेश श्लोक, कविता, लघु भाषण',pakKala:'पाक कला प्रतियोगिता',bhajan:'MiCasaa भजन मंडल',foodStall:'फूड स्टॉल',shriramBhajan:'श्रीराम-जानकी महिला भजनी मंडल',talentSenior:'MiCasaa Got Talent — सीनियर',drawing:'चित्रकला प्रतियोगिता',talentJunior:'MiCasaa Got Talent — जूनियर',sports:'खेल दिवस',mahaprasad:'महाप्रसाद',rangoli:'रंगोली प्रतियोगिता',satyanarayan:'सत्यनारायण पूजा',musicalChairs:'म्यूज़िकल चेयर्स',prize:'पुरस्कार वितरण',visarjan:'गणपति बप्पा विसर्जन'},
    details:{talent:'नृत्य, नाटक, स्किट, गायन, संगीत, अन्य',sports:'क्रिकेट, फुटबॉल, बोरा दौड़, नींबू-चम्मच दौड़'},
    comps:{shlok:'गणेश श्लोक / कविता / लघु भाषण',pakKala:'पाक कला प्रतियोगिता',foodStall:'फूड स्टॉल',talentSenior:'MiCasaa Got Talent — सीनियर',drawing:'चित्रकला प्रतियोगिता',talentJunior:'MiCasaa Got Talent — जूनियर',cricket:'खेल दिवस — क्रिकेट',football:'खेल दिवस — फुटबॉल',sackRace:'खेल दिवस — बोरा दौड़',lemonSpoon:'खेल दिवस — नींबू-चम्मच दौड़',rangoli:'रंगोली प्रतियोगिता',musicalChairs:'म्यूज़िकल चेयर्स'}
  },
  mr: {
    languageLabel:'भाषा', creative:'🎨 सर्जनशील', talent:'🎤 कला', sports:'🏏 क्रीडा', culinary:'🍲 पाककला', venue:'📍 ठिकाण', venueValue:'MiCasaa Club House', forLabel:'👨‍👩‍👧‍👦 कोणासाठी', residents:'MiCasaa रहिवासी', registrationLabel:'📝 नोंदणी', registrationOpen:'नमूद स्पर्धांसाठी खुली', updates:'📣 अपडेट्स', timingsSeparate:'खाली अंदाजे वेळ दिली आहे · अंतिम अपडेट 1 दिवस आधी सोसायटी WhatsApp ग्रुपवर शेअर केला जाऊ शकतो.', viewSchedule:'कार्यक्रम पाहा', registerNow:'आत्ता नोंदणी करा', heroEyebrow:'14–25 सप्टेंबर 2026 · 12 दिवसांचा उत्सव', ganeshUtsav:'गणेश उत्सव', competitionRegistration:'स्पर्धा नोंदणी', heroText:'भक्ती, सर्जनशीलता, कला, क्रीडा आणि एकोप्याचा उत्सव — आपल्या MiCasaa मध्ये.', registerCompetitions:'स्पर्धांसाठी नोंदणी करा', planParticipation:'आपल्या सहभागाचे नियोजन करा', festivalTimeline:'उत्सव कार्यक्रम', registrationMarked:'फक्त <span class="pill">नोंदणी</span> चिन्ह असलेल्या स्पर्धा / सहभाग कार्यक्रमांसाठी नोंदणी आवश्यक आहे.', competitionEntry:'स्पर्धा प्रवेश', registerParticipation:'आपला सहभाग नोंदवा', selectEventsIntro:'एक किंवा अधिक कार्यक्रम निवडा. कार्यक्रमानुसार अतिरिक्त प्रश्न आपोआप दिसतील.', participantDetails:'सहभागीची माहिती', participantName:'सहभागीचे नाव', flatNumber:'फ्लॅट क्रमांक', wing:'विंग', age:'वय', ageGroup:'वयोगट', mobile:'व्हॉट्सअॅप / मोबाईल', guardianName:'पालक / संरक्षकाचे नाव', forChildren:'(मुलांसाठी)', selectWing:'विंग निवडा', selectAgeGroup:'वयोगट निवडा', juniorKids:'ज्युनियर मुले: 3 – 6 वर्षे', seniorKids:'सीनियर मुले: 7 – 12 वर्षे', teens:'किशोरवयीन: 13 – 19 वर्षे', adults:'प्रौढ: 20 – 59 वर्षे', seniorCitizens:'ज्येष्ठ नागरिक: 60+ वर्षे', fullNamePlaceholder:'पूर्ण नाव', flatPlaceholder:'उदा. 803', agePlaceholder:'वय', mobilePlaceholder:'10 अंकी मोबाईल नंबर', guardianPlaceholder:'पालक किंवा संरक्षकाचे नाव', checkExisting:'आधीची नोंदणी तपासा', existingHelp:'नाव + विंग + फ्लॅट + मोबाईल यावरून नोंद शोधली जाईल. नोंद सापडल्यास ती बदलासाठी येथे दिसेल.', chooseCompetitions:'स्पर्धा निवडा', multipleEvents:'आपण एकापेक्षा अधिक कार्यक्रम निवडू शकता.', selectAtLeastOne:'कृपया किमान एक स्पर्धा निवडा.', eventDetails:'कार्यक्रमाची माहिती', confirmation:'पुष्टी', confirmDetails:'मी पुष्टी करतो/करते की माहिती बरोबर आहे आणि सहभागी नियोजित तारखेला उपलब्ध असेल.', photoConsent:'MiCasaa सोसायटीच्या संवादासाठी कार्यक्रमातील फोटो/व्हिडिओ वापरण्यास माझी हरकत नाही.', submitRegistration:'नोंदणी जमा करा', updateRegistration:'नोंदणी अपडेट करा', submitting:'जमा होत आहे…', updating:'अपडेट होत आहे…', privacyNote:'🔒 ही माहिती फक्त गणेश उत्सव समन्वयासाठी Micasaa Spandan Committee वापरेल.', beforeSubmit:'जमा करण्यापूर्वी', tipOneForm:'प्रत्येक सहभागीसाठी एक फॉर्म भरा.', tipMultiple:'आपण अनेक स्पर्धा निवडू शकता.', tipGroup:'गटातील प्रतिभा कार्यक्रमासाठी सर्व सदस्यांची नावे लिहा.', tipTimings:'दर्शवलेली वेळ अंदाजे आहे आणि प्रत्येक कार्यक्रमाच्या 1 दिवस आधी अपडेट होऊ शकते.', participationQuote:'“आपला सहभाग उत्सव अधिक उजळवतो.”', registrationReceived:'नोंदणी प्राप्त झाली!', registrationUpdated:'नोंदणी अपडेट झाली!', successThankYou:'MiCasaa गणेश उत्सव 2026 मध्ये सहभागी झाल्याबद्दल धन्यवाद.', successUpdated:'आपली आधीची स्पर्धा नोंदणी यशस्वीपणे अपडेट झाली आहे.', done:'पूर्ण', registerTag:'नोंदणी', select:'निवडा', speechQuestion:'आपण काय सादर करणार?', selectAllApply:'लागू असलेले सर्व पर्याय निवडा.', speechShlok:'गणेश श्लोक', speechPoem:'कविता', speechShortSpeech:'लघु भाषण', duration:'अंदाजे कालावधी', performanceCategory:'सादरीकरण प्रकार', performanceHint:'एक किंवा अधिक सादरीकरण प्रकार निवडा.', perfDance:'नृत्य', perfSinging:'गायन', perfDrama:'नाटक', perfSkit:'स्किट', perfInstrumental:'वाद्य संगीत', perfOther:'इतर', participationType:'सहभाग प्रकार', participationHint:'आपल्या सादरीकरणांसाठी लागू असलेले सर्व पर्याय निवडा.', partSolo:'एकल', partDuo:'दुहेरी', partGroup:'गट', performanceAct:'सादरीकरण / कार्यक्रमाचे नाव', performanceDuration:'अंदाजे कालावधी', groupMembers:'गट सदस्यांची नावे', specialRequirement:'विशेष आवश्यकता', sportsHelp:'आपण निवडलेले खेळ वर नोंदले आहेत. टीम इव्हेंट असल्यास टीमची माहिती येथे द्या.', teamDetails:'टीम / पार्टनर माहिती', foodStallName:'स्टॉल / डिस्प्ले नाव', foodCategory:'खाद्य प्रकार', foodCategoryHint:'लागू असलेले सर्व प्रकार निवडा.', foodSnacks:'स्नॅक्स', foodChaat:'चाट', foodMain:'मुख्य जेवण', foodDessert:'मिठाई / स्वीट्स', foodBeverages:'पेय', foodHealthy:'आरोग्यदायी / घरगुती', foodOther:'इतर', foodItems:'विक्री / सर्व्ह करण्याचे पदार्थ', foodNote:'फूड स्टॉल सहभागीनी टेबल आणि वीज/इलेक्ट्रिकलची व्यवस्था स्वतः करावी.', anythingElse:'आणखी काही?', committeeNotes:'आयोजन समितीसाठी नोंद', optional:'ऐच्छिक', noExisting:'आधीची नोंदणी सापडली नाही. आपण नवीन नोंदणी करू शकता.', checking:'आधीची नोंदणी तपासत आहोत…', identityFirst:'कृपया आधी सहभागीचे नाव, विंग, फ्लॅट क्रमांक आणि योग्य मोबाईल नंबर भरा.', editFound:'नोंदणी {id} सापडली. जतन केलेली माहिती भरली आहे. बदल करून नोंदणी अपडेट करा दाबा.', editMode:'बदल मोड', registrationId:'नोंदणी आयडी', flatWord:'फ्लॅट', wingWord:'विंग', speechTitle:'गणेश श्लोक / कविता / छोटेखानी भाषण', sportsDay:'क्रीडा दिवस', foodStall:'फूड स्टॉल', note:'नोंद', dailyAarti:'दररोजची आरती', morningAarti:'सकाळची आरती', eveningAartiWeekdays:'संध्याकाळची आरती (कामकाजाचे दिवस)', eveningAartiWeekends:'संध्याकाळची आरती (शनिवार-रविवार)', tentativeTimeNote:'सर्व कार्यक्रमांची वेळ अंदाजे आहे आणि कार्यक्रमाच्या 1 दिवस आधी अपडेट होऊ शकते.', tentativeBadge:'अंदाजे वेळ', shareConfirmationTitle:'अंतिम अनिवार्य टप्पा', shareConfirmationHelp:'नोंदणी पूर्ण करण्यासाठी हे तपशील Micasaa Spandan Committee ला WhatsApp वर पाठवणे अनिवार्य आहे.', sendCommitteeWhatsApp:'अनिवार्य: समितीला WhatsApp वर पाठवा', sendSelfWhatsApp:'माझ्या WhatsApp वर पाठवा', copyRegistrationDetails:'नोंदणी तपशील कॉपी करा', copied:'नोंदणी तपशील कॉपी झाले.', whatsappOpen:'WhatsApp उघडले आहे. कृपया Send दाबून पुन्हा येथे या.', shareUnavailable:'WhatsApp उघडू शकले नाही. कृपया पुन्हा प्रयत्न करा.', sendFirstToFinish:'पूर्ण करण्यासाठी आधी WhatsApp वर पाठवा', whatsappDone:'मी पाठवले — पूर्ण',
    days:['रविवार','सोमवार','मंगळवार','बुधवार','गुरुवार','शुक्रवार','शनिवार'],
    events:{agaman:'गणपती बाप्पा आगमन',shlok:'गणेश श्लोक, कविता, छोटेखानी भाषण',pakKala:'पाककला स्पर्धा',bhajan:'MiCasaa भजन मंडळ',foodStall:'फूड स्टॉल',shriramBhajan:'श्रीराम-जानकी महिला भजनी मंडळ',talentSenior:'MiCasaa Got Talent — सीनियर',drawing:'चित्रकला स्पर्धा',talentJunior:'MiCasaa Got Talent — ज्युनियर',sports:'क्रीडा दिवस',mahaprasad:'महाप्रसाद',rangoli:'रांगोळी स्पर्धा',satyanarayan:'सत्यनारायण पूजा',musicalChairs:'म्युझिकल चेअर्स',prize:'बक्षीस वितरण',visarjan:'गणपती बाप्पा विसर्जन'},
    details:{talent:'नृत्य, नाटक, स्किट, गायन, संगीत, इतर',sports:'क्रिकेट, फुटबॉल, गोणी शर्यत, लिंबू-चमचा शर्यत'},
    comps:{shlok:'गणेश श्लोक / कविता / छोटेखानी भाषण',pakKala:'पाककला स्पर्धा',foodStall:'फूड स्टॉल',talentSenior:'MiCasaa Got Talent — सीनियर',drawing:'चित्रकला स्पर्धा',talentJunior:'MiCasaa Got Talent — ज्युनियर',cricket:'क्रीडा दिवस — क्रिकेट',football:'क्रीडा दिवस — फुटबॉल',sackRace:'क्रीडा दिवस — गोणी शर्यत',lemonSpoon:'क्रीडा दिवस — लिंबू-चमचा शर्यत',rangoli:'रांगोळी स्पर्धा',musicalChairs:'म्युझिकल चेअर्स'}
  }
};
let currentLang = localStorage.getItem('micasaaLanguage') || 'en';
if(!I18N[currentLang]) currentLang='en';
function t(key){ return I18N[currentLang][key] ?? I18N.en[key] ?? key; }
function tx(obj,key){ return (I18N[currentLang][obj]||{})[key] ?? (I18N.en[obj]||{})[key] ?? key; }

const fullSchedule = [
  {date:'14 Sept', dayIndex:1, events:[{icon:'🙏', key:'agaman', time:'12 PM'},{icon:'📖', key:'shlok', time:'7 PM', register:true}]},
  {date:'15 Sept', dayIndex:2, events:[{icon:'👨‍🍳', key:'pakKala', time:'6–7 PM', register:true},{icon:'🎵', key:'bhajan', time:'3–5 PM'}]},
  {date:'16 Sept', dayIndex:3, events:[{icon:'🎶', key:'shriramBhajan', time:'5–7 PM'}]},
  {date:'17 Sept', dayIndex:4, events:[{icon:'🍽️', key:'foodStall', time:'8 PM onwards', register:true}]},
  {date:'18 Sept', dayIndex:5, events:[{icon:'🎤', key:'talentSenior', time:'8 PM onwards', detailsKey:'talent', register:true}]},
  {date:'19 Sept', dayIndex:6, events:[{icon:'🎨', key:'drawing', time:'1 PM onwards', register:true},{icon:'🎭', key:'talentJunior', time:'8 PM onwards', detailsKey:'talent', register:true}]},
  {date:'20 Sept', dayIndex:0, events:[{icon:'🏏', key:'sports', time:'10 AM onwards', detailsKey:'sports', register:true},{icon:'🍲', key:'mahaprasad', time:'7 PM onwards'}]},
  {date:'21 Sept', dayIndex:1, events:[{icon:'🌈', key:'rangoli', time:'4 PM onwards', register:true}]},
  {date:'22 Sept', dayIndex:2, events:[{icon:'🪔', key:'satyanarayan', time:'11 AM'}]},
  {date:'23 Sept', dayIndex:3, events:[{icon:'🪑', key:'musicalChairs', time:'8 PM onwards', register:true}]},
  {date:'24 Sept', dayIndex:4, events:[{icon:'🏆', key:'prize', time:'8 PM onwards'}]},
  {date:'25 Sept', dayIndex:5, events:[{icon:'🌺', key:'visarjan', time:'5 PM'}]}
];

const competitions = [
  {id:'shlok', icon:'📖', name:'Ganesh Shlok / Poem / Short Speech', date:'14 Sept', time:'7 PM', type:'speech'},
  {id:'pakKala', icon:'👨‍🍳', name:'Pak Kala Competition', date:'15 Sept', time:'6–7 PM'},
  {id:'foodStall', icon:'🍽️', name:'Food Stall', date:'17 Sept', time:'8 PM onwards', type:'foodstall'},
  {id:'talentSenior', icon:'🎤', name:'MiCasaa Got Talent — Seniors', date:'18 Sept', time:'8 PM onwards', type:'talent'},
  {id:'drawing', icon:'🎨', name:'Drawing Competition', date:'19 Sept', time:'1 PM onwards'},
  {id:'talentJunior', icon:'🎭', name:'MiCasaa Got Talent — Juniors', date:'19 Sept', time:'8 PM onwards', type:'talent'},
  {id:'cricket', icon:'🏏', name:'Sports Day — Cricket', date:'20 Sept', time:'10 AM onwards', type:'sport'},
  {id:'football', icon:'⚽', name:'Sports Day — Football', date:'20 Sept', time:'10 AM onwards', type:'sport'},
  {id:'sackRace', icon:'🏃', name:'Sports Day — Sack Race', date:'20 Sept', time:'10 AM onwards', type:'sport'},
  {id:'lemonSpoon', icon:'🥄', name:'Sports Day — Lemon Spoon Race', date:'20 Sept', time:'10 AM onwards', type:'sport'},
  {id:'rangoli', icon:'🌈', name:'Rangoli Competition', date:'21 Sept', time:'4 PM onwards'},
  {id:'musicalChairs', icon:'🪑', name:'Musical Chairs', date:'23 Sept', time:'8 PM onwards'}
];

const timeline = document.getElementById('timeline');
const cards = document.getElementById('competitionCards');
function renderTimeline(){
  timeline.innerHTML = fullSchedule.map(d => `<article class="day-card"><div class="day-head"><span class="date-chip">${d.date}</span><span class="weekday">${I18N[currentLang].days[d.dayIndex]}</span></div>${d.events.map(e => `<div class="event-line"><span class="event-icon">${e.icon}</span><div><strong>${tx('events',e.key)}</strong>${e.time?`<span class="event-time">🕒 ${e.time}</span>`:''}${e.detailsKey?`<small>${tx('details',e.detailsKey)}</small>`:''}${e.register?`<span class="register-tag">${t('registerTag')}</span>`:''}</div></div>`).join('')}</article>`).join('');
}
function renderCompetitionCards(){
  const selected=new Set([...document.querySelectorAll('input[name="events"]:checked')].map(x=>x.value));
  cards.innerHTML = competitions.map(c => `<label class="competition-card ${selected.has(c.id)?'selected':''}" data-id="${c.id}"><input type="checkbox" name="events" value="${c.id}" ${selected.has(c.id)?'checked':''}/><strong>${c.icon} ${tx('comps',c.id)}</strong><small><span class="event-date">${c.date}</span> · 2026 · <span class="competition-time">🕒 ${c.time}</span></small></label>`).join('');
}
function applyTranslations(){
  document.documentElement.lang=currentLang;
  document.querySelectorAll('[data-i18n]').forEach(el=>{ const k=el.dataset.i18n; if(t(k)!==undefined) el.textContent=t(k); });
  document.querySelectorAll('[data-i18n-html]').forEach(el=>{ const k=el.dataset.i18nHtml; el.innerHTML=t(k); });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el=>{ el.placeholder=t(el.dataset.i18nPlaceholder); });
  const lang=document.getElementById('languageSelect'); if(lang) lang.value=currentLang;
  renderTimeline(); renderCompetitionCards();
  if(typeof renderDynamicQuestions==='function') renderDynamicQuestions();
  if(document.getElementById('closeModal')) refreshWhatsappCompletionState();
}
function ageGroupForAge(age){
  const n=Number(age);
  if(!Number.isFinite(n)) return '';
  if(n>=3 && n<=6) return 'Junior Kids';
  if(n>=7 && n<=12) return 'Senior Kids';
  if(n>=13 && n<=19) return 'Teens';
  if(n>=20 && n<=59) return 'Adults';
  if(n>=60) return 'Senior Citizens';
  return '';
}

const form = document.getElementById('registrationForm');
const ageInput=form?.elements.age;
const ageGroupInput=form?.elements.ageGroup;
if(ageInput && ageGroupInput){
  const syncAgeGroup=()=>{ const group=ageGroupForAge(ageInput.value); if(group) ageGroupInput.value=group; };
  ageInput.addEventListener('input', syncAgeGroup);
  ageInput.addEventListener('change', syncAgeGroup);
}
const dynamicQuestions = document.getElementById('dynamicQuestions');
const detailsFieldset = document.getElementById('eventDetailsFieldset');
const eventError = document.getElementById('eventError');
const existingStatus = document.getElementById('existingStatus');
const checkExistingBtn = document.getElementById('checkExisting');
let loadedRegistrationCode = null;
let pendingDetails = null;

function selectedEvents(){ return [...document.querySelectorAll('input[name="events"]:checked')].map(i=>i.value); }

const DETAIL_FIELD_NAMES=['speechType','speechDuration','talentCategory','participationType','performanceName','performanceDuration','groupMembers','specialRequirement','sportsTeamDetails','foodStallName','foodCategory','foodItems','notes'];
const MULTI_DETAIL_FIELDS=new Set(['speechType','talentCategory','participationType','foodCategory']);

function splitMultiValue(value){
  if(Array.isArray(value)) return value.map(v=>String(v).trim()).filter(Boolean);
  return String(value||'').split(',').map(v=>v.trim()).filter(Boolean);
}
function readDetailField(targetForm,name){
  const nodes=[...targetForm.querySelectorAll(`[name="${name}"]`)];
  if(!nodes.length) return '';
  if(MULTI_DETAIL_FIELDS.has(name)) return nodes.filter(n=>n.checked).map(n=>n.value).join(', ');
  const el=targetForm.elements[name];
  return String(el?.value||'').trim();
}
function writeDetailField(targetForm,name,value){
  const nodes=[...targetForm.querySelectorAll(`[name="${name}"]`)];
  if(!nodes.length) return;
  if(MULTI_DETAIL_FIELDS.has(name)){
    const selected=new Set(splitMultiValue(value));
    nodes.forEach(n=>{ n.checked=selected.has(n.value); });
    return;
  }
  const el=targetForm.elements[name];
  if(el) el.value=value ?? '';
}
function captureDynamicDetails(){
  const out={};
  DETAIL_FIELD_NAMES.forEach(name=>{
    const value=readDetailField(form,name);
    if(value) out[name]=value;
  });
  return out;
}
function checkboxChoices(name, options){
  return `<div class="option-grid">${options.map(([value,label])=>`<label class="option-check"><input type="checkbox" name="${name}" value="${escapeHtml(value)}"><span>${label}</span></label>`).join('')}</div>`;
}

function renderDynamicQuestions(){
  const preservedDetails=captureDynamicDetails();
  const selected = selectedEvents();
  document.querySelectorAll('.competition-card').forEach(card=>card.classList.toggle('selected', card.querySelector('input').checked));
  eventError.hidden = selected.length > 0;
  if(!selected.length){ detailsFieldset.hidden = true; dynamicQuestions.innerHTML=''; return; }
  detailsFieldset.hidden = false;
  const selectedComps = competitions.filter(c=>selected.includes(c.id));
  const blocks = [];
  if(selectedComps.some(c=>c.type==='speech')) blocks.push(`<div class="dynamic-block"><h4>📖 ${t('speechTitle')}</h4><div class="dynamic-grid"><div class="choice-field full"><span class="choice-label">${t('speechQuestion')}</span><span class="choice-help">${t('selectAllApply')}</span>${checkboxChoices('speechType', [['Ganesh Shlok',t('speechShlok')],['Poem',t('speechPoem')],['Short Speech',t('speechShortSpeech')]])}</div><label>${t('duration')}<input name="speechDuration" placeholder="e.g. 2 minutes" /></label></div></div>`);
  if(selectedComps.some(c=>c.type==='talent')){
    const talentNames = selectedComps.filter(c=>c.type==='talent').map(c=>tx('comps',c.id)).join(' / ');
    blocks.push(`<div class="dynamic-block"><h4>🎭 ${talentNames}</h4><div class="dynamic-grid"><div class="choice-field full"><span class="choice-label">${t('performanceCategory')}</span><span class="choice-help">${t('performanceHint')}</span>${checkboxChoices('talentCategory', [['Dance',t('perfDance')],['Singing',t('perfSinging')],['Drama',t('perfDrama')],['Skit',t('perfSkit')],['Instrumental Music',t('perfInstrumental')],['Other',t('perfOther')]])}</div><div class="choice-field full"><span class="choice-label">${t('participationType')}</span><span class="choice-help">${t('participationHint')}</span>${checkboxChoices('participationType', [['Solo',t('partSolo')],['Duo',t('partDuo')],['Group',t('partGroup')]])}</div><label>${t('performanceAct')}<input name="performanceName" placeholder="${t('optional')}" /></label><label>${t('performanceDuration')}<input name="performanceDuration" placeholder="e.g. Dance - 4 min, Singing - 3 min" /></label><label class="full">${t('groupMembers')}<textarea name="groupMembers"></textarea></label><label class="full">${t('specialRequirement')}<textarea name="specialRequirement"></textarea></label></div></div>`);
  }
  if(selectedComps.some(c=>c.type==='sport')) blocks.push(`<div class="dynamic-block"><h4>🏅 ${t('sportsDay')}</h4><p class="field-help">${t('sportsHelp')}</p><div class="dynamic-grid"><label class="full">${t('teamDetails')}<textarea name="sportsTeamDetails"></textarea></label></div></div>`);
  if(selectedComps.some(c=>c.type==='foodstall')) blocks.push(`<div class="dynamic-block"><h4>🍽️ ${t('foodStall')}</h4><div class="dynamic-grid"><label>${t('foodStallName')}<input name="foodStallName" /></label><div class="choice-field full"><span class="choice-label">${t('foodCategory')}</span><span class="choice-help">${t('foodCategoryHint')}</span>${checkboxChoices('foodCategory', [['Snacks',t('foodSnacks')],['Chaat',t('foodChaat')],['Main Course',t('foodMain')],['Dessert / Sweets',t('foodDessert')],['Beverages',t('foodBeverages')],['Healthy / Homemade',t('foodHealthy')],['Other',t('foodOther')]])}</div><label class="full">${t('foodItems')}<textarea name="foodItems"></textarea></label><div class="full food-stall-note"><strong>${t('note')}:</strong> ${t('foodNote')}</div></div></div>`);
  blocks.push(`<div class="dynamic-block"><h4>📝 ${t('anythingElse')}</h4><label>${t('committeeNotes')}<textarea name="notes" placeholder="${t('optional')}"></textarea></label></div>`);
  dynamicQuestions.innerHTML = blocks.join('');
  const valuesToRestore={...preservedDetails,...(pendingDetails||{})};
  for(const [key,value] of Object.entries(valuesToRestore)) writeDetailField(form,key,value);
  pendingDetails=null;
}

cards.addEventListener('change', renderDynamicQuestions);

function backendConfigured(){
  return CONFIG.supabaseUrl && CONFIG.supabaseAnonKey && !CONFIG.supabaseUrl.includes('PASTE_') && !CONFIG.supabaseAnonKey.includes('PASTE_');
}

async function rpc(name, body){
  if(!backendConfigured()) throw new Error('Supabase is not configured. Open config.js and add your project URL and anon key.');
  const base=CONFIG.supabaseUrl.replace(/\/$/,'');
  const res=await fetch(`${base}/rest/v1/rpc/${name}`, {
    method:'POST',
    headers:{'Content-Type':'application/json','apikey':CONFIG.supabaseAnonKey,'Authorization':`Bearer ${CONFIG.supabaseAnonKey}`},
    body:JSON.stringify(body)
  });
  const text=await res.text();
  let out=null; try{ out=text?JSON.parse(text):null; }catch(_){ out=text; }
  if(!res.ok){
    const message=(out && (out.message||out.error||out.hint)) || `Request failed (${res.status})`;
    throw new Error(message);
  }
  return out;
}

function identityPayload(){
  return {
    p_participant_name: form.elements.participantName.value.trim(),
    p_flat_number: form.elements.flatNumber.value.trim(),
    p_wing: form.elements.wing.value.trim(),
    p_mobile: form.elements.mobile.value.trim()
  };
}

function identityReady(){
  const p=identityPayload();
  return p.p_participant_name && p.p_flat_number && p.p_wing && p.p_mobile.replace(/\D/g,'').length >= 10;
}

function setExistingStatus(message, kind='not-found'){
  existingStatus.hidden=false;
  existingStatus.className=`existing-status ${kind}`;
  existingStatus.innerHTML=message;
}

function clearExistingStatus(){
  existingStatus.hidden=true;
  existingStatus.className='existing-status';
  existingStatus.textContent='';
  loadedRegistrationCode=null;
  form.querySelector('.submit-label').textContent=t('submitRegistration');
}

function loadExistingRegistration(r){
  ['participantName','flatNumber','wing','age','ageGroup','mobile','guardianName'].forEach(k=>{ if(form.elements[k] && r[k] !== undefined && r[k] !== null) form.elements[k].value=r[k]; });
  document.querySelectorAll('input[name="events"]').forEach(el=>el.checked=(r.eventIds||[]).includes(el.value));
  pendingDetails=r.details||{};
  renderDynamicQuestions();
  if(form.elements.photoConsent) form.elements.photoConsent.checked=!!r.photoConsent;
  loadedRegistrationCode=r.registrationCode;
  form.querySelector('.submit-label').textContent=t('updateRegistration');
  setExistingStatus(`✅ ${t('editFound').replace('{id}',`<strong>${escapeHtml(r.registrationCode)}</strong>`)} <span class="edit-chip">${t('editMode')}</span>`, 'found');
}

async function checkExistingRegistration({silent=false}={}){
  if(!identityReady()){
    if(!silent) setExistingStatus(t('identityFirst'), 'not-found');
    return false;
  }
  if(!backendConfigured()){
    if(!silent) setExistingStatus('Backend is not configured yet. Complete the Supabase setup in README.md.', 'error');
    return false;
  }
  checkExistingBtn.disabled=true;
  if(!silent) setExistingStatus(t('checking'),'not-found');
  try{
    const out=await rpc('find_registration', identityPayload());
    if(out && out.found && out.registration){ loadExistingRegistration(out.registration); return true; }
    clearExistingStatus();
    if(!silent) setExistingStatus(t('noExisting'), 'not-found');
    return false;
  }catch(err){
    if(!silent) setExistingStatus(`Could not check existing registration: ${escapeHtml(err.message)}`, 'error');
    return false;
  }finally{ checkExistingBtn.disabled=false; }
}

checkExistingBtn.addEventListener('click',()=>checkExistingRegistration());

// If identity changes after an existing record was loaded, exit edit mode so we never update the wrong participant.
['participantName','flatNumber','wing','mobile'].forEach(k=>form.elements[k].addEventListener('input',()=>{
  if(loadedRegistrationCode) clearExistingStatus();
}));

function collectDetails(){
  const d={};
  DETAIL_FIELD_NAMES.forEach(name=>{ const value=readDetailField(form,name); if(value) d[name]=value; });
  return d;
}

function formToPayload(){
  const ids=selectedEvents();
  return {
    participantName: form.elements.participantName.value.trim(),
    flatNumber: form.elements.flatNumber.value.trim(),
    wing: form.elements.wing.value.trim(),
    age: Number(form.elements.age.value),
    ageGroup: form.elements.ageGroup.value,
    mobile: form.elements.mobile.value.trim(),
    guardianName: form.elements.guardianName.value.trim(),
    eventIds: ids,
    events: ids.map(id=>competitions.find(c=>c.id===id)?.name || id),
    details: collectDetails(),
    photoConsent: !!form.elements.photoConsent.checked,
    source: 'MiCasaa Ganesh Utsav Website'
  };
}

function setSubmitting(on){
  const btn=form.querySelector('.submit-btn');
  btn.disabled=on;
  btn.querySelector('.submit-label').textContent=on ? (loadedRegistrationCode?t('updating'):t('submitting')) : (loadedRegistrationCode?t('updateRegistration'):t('submitRegistration'));
  btn.querySelector('.spinner').hidden=!on;
}

const COMMITTEE_WHATSAPP = '919518960537';
let lastSuccessData = null;
let lastSuccessResult = null;
let whatsappStepOpened = false;

const CONFIRMATION_LABELS = {
  en:{header:'MiCasaa Ganesh Utsav 2026 - Registration Confirmation',newRegistration:'New Registration',updatedRegistration:'Updated Registration',name:'Participant',flatWing:'Wing / Flat',age:'Age / Age Group',mobile:'Mobile',guardian:'Parent / Guardian',events:'Registered Events',venue:'Venue',details:'Additional Details',registrationId:'Registration ID',timingNote:'Timings are tentative. Final updates may be shared 1 day before on the society WhatsApp group.',committeeHeader:'MiCasaa Ganesh Utsav - Participant Registration',speechType:'Presentation',duration:'Duration',talentCategory:'Performance Category',participationType:'Participation Type',performanceName:'Performance / Act',groupMembers:'Group Members',specialRequirement:'Special Requirement',sportsTeamDetails:'Team / Partner Details',foodStallName:'Stall / Display Name',foodCategory:'Food Category',foodItems:'Food Items',notes:'Notes'},
  hi:{header:'MiCasaa गणेश उत्सव 2026 - पंजीकरण पुष्टि',newRegistration:'नया पंजीकरण',updatedRegistration:'अपडेट किया गया पंजीकरण',name:'प्रतिभागी',flatWing:'विंग / फ्लैट',age:'आयु / आयु वर्ग',mobile:'मोबाइल',guardian:'माता-पिता / अभिभावक',events:'पंजीकृत कार्यक्रम',venue:'स्थान',details:'अतिरिक्त जानकारी',registrationId:'पंजीकरण आईडी',timingNote:'समय संभावित है। अंतिम अपडेट 1 दिन पहले सोसायटी WhatsApp ग्रुप पर साझा किया जा सकता है।',committeeHeader:'MiCasaa गणेश उत्सव - प्रतिभागी पंजीकरण',speechType:'प्रस्तुति',duration:'अवधि',talentCategory:'प्रस्तुति श्रेणी',participationType:'भागीदारी प्रकार',performanceName:'प्रस्तुति / कार्यक्रम',groupMembers:'समूह सदस्य',specialRequirement:'विशेष आवश्यकता',sportsTeamDetails:'टीम / पार्टनर जानकारी',foodStallName:'स्टॉल / डिस्प्ले नाम',foodCategory:'खाद्य श्रेणी',foodItems:'खाद्य आइटम',notes:'नोट्स'},
  mr:{header:'MiCasaa गणेश उत्सव 2026 - नोंदणी पुष्टी',newRegistration:'नवीन नोंदणी',updatedRegistration:'अपडेट केलेली नोंदणी',name:'सहभागी',flatWing:'विंग / फ्लॅट',age:'वय / वयोगट',mobile:'मोबाईल',guardian:'पालक / संरक्षक',events:'नोंदणीकृत कार्यक्रम',venue:'ठिकाण',details:'अतिरिक्त माहिती',registrationId:'नोंदणी आयडी',timingNote:'वेळ अंदाजे आहे. अंतिम अपडेट 1 दिवस आधी सोसायटी WhatsApp ग्रुपवर शेअर केला जाऊ शकतो.',committeeHeader:'MiCasaa गणेश उत्सव - सहभागी नोंदणी',speechType:'सादरीकरण',duration:'कालावधी',talentCategory:'सादरीकरण प्रकार',participationType:'सहभाग प्रकार',performanceName:'सादरीकरण / कार्यक्रम',groupMembers:'गट सदस्य',specialRequirement:'विशेष आवश्यकता',sportsTeamDetails:'टीम / पार्टनर माहिती',foodStallName:'स्टॉल / डिस्प्ले नाव',foodCategory:'खाद्य प्रकार',foodItems:'खाद्य पदार्थ',notes:'नोंद'}
};

function confirmationLabels(){ return CONFIRMATION_LABELS[currentLang] || CONFIRMATION_LABELS.en; }
function selectedCompetitionDetails(data){
  return (data.eventIds||[]).map(id=>{
    const c=competitions.find(x=>x.id===id);
    return c ? {id,name:tx('comps',id),icon:c.icon,date:c.date,time:c.time} : {id,name:id,icon:'•',date:'',time:''};
  });
}
function extraDetailRows(data){
  const d=data.details||{}; const L=confirmationLabels();
  const defs=[
    ['speechType',L.speechType],['speechDuration',L.duration],['talentCategory',L.talentCategory],['participationType',L.participationType],
    ['performanceName',L.performanceName],['performanceDuration',L.duration],['groupMembers',L.groupMembers],['specialRequirement',L.specialRequirement],
    ['sportsTeamDetails',L.sportsTeamDetails],['foodStallName',L.foodStallName],['foodCategory',L.foodCategory],['foodItems',L.foodItems],['notes',L.notes]
  ];
  return defs.filter(([k])=>String(d[k]||'').trim()).map(([k,label])=>({label,value:String(d[k]).trim()}));
}
function buildRegistrationMessage(data,result,{forCommittee=false}={}){
  const L=confirmationLabels();
  const updated=result.action==='updated';
  const lines=[];
  lines.push(`*${forCommittee?L.committeeHeader:L.header}*`);
  lines.push(updated?`_${L.updatedRegistration}_`:`_${L.newRegistration}_`);
  lines.push('');
  lines.push(`*${L.registrationId}:* ${result.registrationCode||''}`);
  lines.push(`*${L.name}:* ${data.participantName}`);
  lines.push(`*${L.flatWing}:* ${data.wing}-${data.flatNumber}`);
  lines.push(`*${L.age}:* ${data.age} / ${data.ageGroup}`);
  lines.push(`*${L.mobile}:* ${data.mobile}`);
  if(data.guardianName) lines.push(`*${L.guardian}:* ${data.guardianName}`);
  lines.push('');
  lines.push(`*${L.events}:*`);
  selectedCompetitionDetails(data).forEach(e=>lines.push(`${e.icon} ${e.name} - ${e.date}, ${e.time}`));
  const extras=extraDetailRows(data);
  if(extras.length){
    lines.push(''); lines.push(`*${L.details}:*`);
    extras.forEach(r=>lines.push(`• ${r.label}: ${r.value}`));
  }
  lines.push('');
  lines.push(`📍 *${L.venue}:* MiCasaa Club House`);
  lines.push(`📣 ${L.timingNote}`);
  lines.push('');
  lines.push('*Ganpati Bappa Morya! 🙏🌺*');
  return lines.join('\n');
}
function normalizeIndiaWhatsApp(mobile){
  let digits=String(mobile||'').replace(/\D/g,'');
  if(digits.length===10) return '91'+digits;
  if(digits.length===11 && digits.startsWith('0')) return '91'+digits.slice(1);
  if(digits.length===12 && digits.startsWith('91')) return digits;
  return digits.length>=10 ? digits : '';
}
function openWhatsApp(number,message){
  const url=`https://wa.me/${number}?text=${encodeURIComponent(message)}`;
  window.open(url,'_blank','noopener,noreferrer');
}
async function copyText(text){
  if(navigator.clipboard && window.isSecureContext){ await navigator.clipboard.writeText(text); return; }
  const ta=document.createElement('textarea'); ta.value=text; ta.setAttribute('readonly',''); ta.style.position='fixed'; ta.style.opacity='0'; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); ta.remove();
}
function setShareStatus(message){ const el=document.getElementById('shareStatus'); if(el) el.textContent=message||''; }
function refreshWhatsappCompletionState(){
  const btn=document.getElementById('closeModal');
  if(!btn) return;
  btn.disabled=!whatsappStepOpened;
  btn.textContent=whatsappStepOpened?t('whatsappDone'):t('sendFirstToFinish');
}
function queueAdminEmail(registrationCode, action){
  if(!registrationCode) return;
  const payload=JSON.stringify({registrationCode,action:action||'created'});
  try{
    if(navigator.sendBeacon){
      const queued=navigator.sendBeacon('/api/admin-email',new Blob([payload],{type:'application/json'}));
      if(queued) return;
    }
  }catch(_){ }
  fetch('/api/admin-email',{method:'POST',headers:{'Content-Type':'application/json'},body:payload,keepalive:true}).catch(()=>{});
}

function showSuccess(data, result){
  const modal=document.getElementById('successModal');
  const updated=result.action==='updated';
  lastSuccessData=JSON.parse(JSON.stringify(data));
  lastSuccessResult={...result};
  whatsappStepOpened=false;
  refreshWhatsappCompletionState();
  document.getElementById('successTitle').textContent=updated?t('registrationUpdated'):t('registrationReceived');
  document.getElementById('successMessage').textContent=updated?t('successUpdated'):t('successThankYou');
  const L=confirmationLabels();
  const events=selectedCompetitionDetails(data);
  const extras=extraDetailRows(data);
  document.getElementById('registrationSummary').innerHTML=`<div class="registration-success-details">
    <div class="success-meta">
      <div><span>${escapeHtml(L.registrationId)}</span><strong>${escapeHtml(result.registrationCode||'')}</strong></div>
      <div><span>${escapeHtml(L.name)}</span><strong>${escapeHtml(data.participantName)}</strong></div>
      <div><span>${escapeHtml(L.flatWing)}</span><strong>${escapeHtml(data.wing)}-${escapeHtml(data.flatNumber)}</strong></div>
      <div><span>${escapeHtml(L.age)}</span><strong>${escapeHtml(data.age)} / ${escapeHtml(data.ageGroup)}</strong></div>
      <div><span>${escapeHtml(L.mobile)}</span><strong>${escapeHtml(data.mobile)}</strong></div>
      ${data.guardianName?`<div><span>${escapeHtml(L.guardian)}</span><strong>${escapeHtml(data.guardianName)}</strong></div>`:''}
    </div>
    <div class="success-events"><h4>${escapeHtml(L.events)}</h4>${events.map(e=>`<div class="success-event"><span>${e.icon}</span><div><strong>${escapeHtml(e.name)}</strong><small>${escapeHtml(e.date)} · ${escapeHtml(e.time)}</small></div></div>`).join('')}</div>
    ${extras.length?`<div class="success-extra"><h4>${escapeHtml(L.details)}</h4>${extras.map(r=>`<div class="success-extra-row"><strong>${escapeHtml(r.label)}</strong><span>${escapeHtml(r.value)}</span></div>`).join('')}</div>`:''}
  </div>`;
  setShareStatus('');
  modal.hidden=false;
}

function escapeHtml(value=''){ return String(value).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c])); }

form.addEventListener('submit', async e=>{
  e.preventDefault();
  eventError.hidden=selectedEvents().length>0;
  if(!form.checkValidity() || !selectedEvents().length){
    form.reportValidity();
    if(!selectedEvents().length) document.getElementById('competitionCards').scrollIntoView({behavior:'smooth',block:'center'});
    return;
  }
  if(!backendConfigured()){
    setExistingStatus('Supabase is not configured yet. Follow README.md, then paste the Project URL and anon key into config.js.', 'error');
    return;
  }
  const data=formToPayload();
  setSubmitting(true);
  try{
    // Server-side upsert is the final duplicate guard. Even if two people submit at the same time,
    // the unique participant key ensures only one registration row exists.
    const result=await rpc('upsert_registration',{p_payload:data});
    if(!result || result.ok!==true) throw new Error('Registration could not be saved.');
    showSuccess(data,result);
    queueAdminEmail(result.registrationCode,result.action);
    localStorage.removeItem('micasaaRegistrationDraft');
    form.reset();
    renderDynamicQuestions();
    clearExistingStatus();
  }catch(err){
    setExistingStatus(`Registration could not be saved: ${escapeHtml(err.message)}. Please try again.`, 'error');
    existingStatus.scrollIntoView({behavior:'smooth',block:'center'});
  }finally{ setSubmitting(false); }
});


const languageSelect=document.getElementById('languageSelect');
if(languageSelect){ languageSelect.addEventListener('change',()=>{ currentLang=languageSelect.value; localStorage.setItem('micasaaLanguage',currentLang); applyTranslations(); }); }
applyTranslations();

document.getElementById('closeModal').addEventListener('click',()=>{
  if(!whatsappStepOpened){ setShareStatus(t('sendFirstToFinish')); return; }
  document.getElementById('successModal').hidden=true;
});
// The success modal intentionally cannot be dismissed by clicking outside it.
// This makes the WhatsApp committee step mandatory in the website flow.

const sendCommitteeWhatsApp=document.getElementById('sendCommitteeWhatsApp');
if(sendCommitteeWhatsApp) sendCommitteeWhatsApp.addEventListener('click',()=>{
  if(!lastSuccessData||!lastSuccessResult) return;
  openWhatsApp(COMMITTEE_WHATSAPP,buildRegistrationMessage(lastSuccessData,lastSuccessResult,{forCommittee:true}));
  whatsappStepOpened=true;
  refreshWhatsappCompletionState();
  setShareStatus(t('whatsappOpen'));
});

// Local draft protection. This is only on the resident's device and is not a registration.
form.addEventListener('input',()=>{
  const data=formToPayload();
  localStorage.setItem('micasaaRegistrationDraft',JSON.stringify(data));
});

try{
  const draft=JSON.parse(localStorage.getItem('micasaaRegistrationDraft')||'null');
  if(draft){
    ['participantName','flatNumber','wing','age','ageGroup','mobile','guardianName'].forEach(k=>{const el=form.elements[k]; if(el && draft[k]!==undefined) el.value=draft[k];});
    (draft.eventIds||[]).forEach(id=>{const el=document.querySelector(`input[name="events"][value="${id}"]`); if(el) el.checked=true;});
    pendingDetails=draft.details||{};
    renderDynamicQuestions();
    if(form.elements.photoConsent) form.elements.photoConsent.checked=!!draft.photoConsent;
  }
}catch(_){ }
