/* Authored pilot content; see docs/PHASE3_CONTENT.md for provenance and review limits. */
(function(root) {
  const t=(en,mr)=>({en,mr});
  const pilots=[{
    id:'my-word-order',language:'my',concept:'verb_final',
    title:t('Build a Burmese sentence','बर्मी वाक्य तयार करा'),
    summary:t('Put the action at the end.','क्रियापद शेवटी ठेवा.'),
    situation:t('You are telling a friend what you eat. Start with who, then the food, then the action.','तुम्ही काय खाता हे मित्राला सांगत आहात. आधी कोण, मग पदार्थ, मग क्रिया सांगा.'),
    example:'ကျွန်တော် ပန်းသီး စားတယ်။',
    meaning:t('I eat an apple. (Male speaker.)','मी सफरचंद खातो. (पुरुष वक्ता.)'),
    notice:t('စားတယ် expresses the action with its ending. Keep it as one chunk at the end. ကျွန်တော် is a male speaker’s “I”; ကျွန်မ is a common female-speaker alternative.','စားတယ် या भागात क्रियापद आणि त्याचा शेवट एकत्र आहेत. हा भाग शेवटी ठेवा. ကျွန်တော် हे पुरुष वक्त्याचे “मी”; स्त्री वक्त्यासाठी ကျွန်မ हा सामान्य पर्याय आहे.'),
    comparison:t('Marathi also commonly puts the verb last: मी → सफरचंद → खातो. This similarity helps with this pattern; it does not make all Burmese and Marathi grammar equivalent.','मराठीतही सामान्यतः क्रियापद शेवटी येते: मी → सफरचंद → खातो. या रचनेत साम्य आहे; सर्व बर्मी आणि मराठी व्याकरण सारखे नाही.'),
    build:{prompt:t('Build: I eat an apple. Use the male-speaker form.','वाक्य तयार करा: मी सफरचंद खातो. पुरुष वक्त्याचे रूप वापरा.'),chunks:['ကျွန်တော်','ပန်းသီး','စားတယ်။'],orders:[[0,1,2]],hint:t('Who → food → action + ending.','कोण → पदार्थ → क्रियापद आणि त्याचा शेवट.'),explanation:t('The action chunk finishes this neutral sentence. Other orders may need a different discourse context; this exercise checks this taught pattern.','या साध्या वाक्यात क्रियापदाचा भाग शेवटी येतो. इतर क्रमांसाठी वेगळा संदर्भ लागू शकतो; येथे शिकवलेली रचना तपासली जाते.')},
    choices:[{prompt:t('For the neutral sentence pattern practised here, which chunk comes last?','येथे शिकलेल्या साध्या वाक्यरचनेत कोणता भाग शेवटी येतो?'),options:['ကျွန်တော်','ပန်းသီး','စားတယ်။'],accepted:[2],explanation:t('စားတယ် is the action and its ending.','စားတယ် हा क्रियापद आणि त्याच्या शेवटाचा भाग आहे.')},{prompt:t('Which sentence says “My younger brother goes to school”?','“माझा धाकटा भाऊ शाळेत जातो” असे कोणते वाक्य सांगते?'),options:['ညီလေး ကျောင်း သွားတယ်။','ကျွန်တော် ပန်းသီး စားတယ်။'],accepted:[0],explanation:t('ညီလေး = younger brother; ကျောင်း = school; သွားတယ် = goes.','ညီလေး = धाकटा भाऊ; ကျောင်း = शाळा; သွားတယ် = जातो.')}],
    use:t('Write a Burmese sentence about eating or going somewhere. Keep the action at the end. You may adapt either example.','खाण्याबद्दल किंवा कुठे जाण्याबद्दल बर्मी वाक्य लिहा. क्रियापद शेवटी ठेवा. कोणतेही उदाहरण बदलून वापरू शकता.'),
    checklist:t('Check: who or what is clear; the action is at the end; the speaker form fits you.','तपासा: कोण किंवा काय हे स्पष्ट आहे; क्रियापद शेवटी आहे; वक्त्याचे रूप तुमच्यासाठी योग्य आहे.'),
    sources:[{label:'Bundled verb_final examples (draft)',url:'https://github.com/Celeritas7/Catalyst/blob/main/data/grammar.yaml'}]
  },{
    id:'ja-topic-transitions',language:'ja',
    title:t('ちなみに or ところで?','ちなみに की ところで?'),
    summary:t('Add a related detail or start another topic.','संबंधित माहिती जोडा किंवा विषय बदला.'),
    situation:t('You are talking about a café. You can add its opening days, or move to a different subject such as tomorrow’s meeting. Choose the connector for your intention.','तुम्ही एका कॅफेबद्दल बोलत आहात. त्याचे उघडण्याचे दिवस सांगू शकता, किंवा उद्याच्या बैठकीसारखा दुसरा विषय सुरू करू शकता. तुमच्या हेतूनुसार जोडशब्द निवडा.'),
    example:'この店は静かです。ちなみに、日曜日も開いています。',
    meaning:t('This place is quiet. As an additional detail, it is open on Sundays too.','हे ठिकाण शांत आहे. आणखी संबंधित माहिती सांगायची तर, रविवारीही ते उघडे असते.'),
    notice:t('ちなみに adds a related detail. Standalone ところで signals a topic shift. The surrounding conversation and your intention matter; the English gloss “by the way” alone is not enough.','ちなみに आधीच्या विषयाशी संबंधित माहिती जोडते. स्वतंत्र ところで विषय बदलल्याचे दर्शवते. संभाषणाचा संदर्भ आणि तुमचा हेतू महत्त्वाचा आहे; केवळ इंग्रजी “by the way” या अर्थावर अवलंबून राहू नका.'),
    comparison:t('Marathi prompts such as “आणखी संबंधित माहिती…” and “विषय बदलून सांगायचे तर…” can help you remember the intention. They are explanations, not fixed word-for-word equivalents.','“आणखी संबंधित माहिती…” आणि “विषय बदलून सांगायचे तर…” या मराठी खुणांनी हेतू लक्षात ठेवता येतो. ही स्पष्टीकरणे आहेत; ठराविक शब्दशः भाषांतरे नाहीत.'),
    deeper:t('Do not mix standalone ところで with verb-past + ところで. 今から急いだところで、間に合いません means “Even if we hurry now, we will not make it in time.” That construction expresses a hypothetical concession, often with an unhelpful outcome; it is not a topic switch.','स्वतंत्र ところで आणि क्रियापदाचे भूतकाळी रूप + ところで यांची गल्लत करू नका. 今から急いだところで、間に合いません म्हणजे “आता घाई केली तरी वेळेत पोहोचणार नाही.” या रचनेत कल्पित कृती करूनही अपेक्षित परिणाम होत नाही, असा अर्थ अनेकदा येतो; येथे विषय बदलत नाही.'),
    build:{prompt:t('Add a related detail: Incidentally, this place is open on Sundays too.','संबंधित माहिती जोडा: आणखी सांगायचे तर, हे ठिकाण रविवारीही उघडे असते.'),chunks:['ちなみに、','この店は','日曜日も','開いています。'],orders:[[0,1,2,3],[0,2,1,3]],hint:t('Start with the related-detail connector. Finish with 開いています。 The two middle chunks can exchange places here.','संबंधित माहिती जोडणाऱ्या शब्दाने सुरुवात करा. शेवटी 開いています。 ठेवा. येथे मधले दोन भाग आपली जागा बदलू शकतात.'),explanation:t('Both middle-chunk orders are accepted here. ちなみに introduces the additional detail about the same place.','येथे मधल्या दोन भागांचे दोन्ही क्रम स्वीकारले जातात. ちなみに त्याच ठिकाणाबद्दल अधिक माहिती जोडते.')},
    choices:[{prompt:t('You want to add another detail about the same café: “___、コーヒーもおいしいです。”','त्याच कॅफेबद्दल आणखी माहिती जोडायची आहे: “___、コーヒーもおいしいです。”'),options:['ちなみに','ところで'],accepted:[0],explanation:t('The coffee is an additional detail about the café. The stated intention is to continue that topic.','कॉफीबद्दलची माहिती त्याच कॅफेशी संबंधित आहे. दिलेला हेतू तोच विषय पुढे चालू ठेवण्याचा आहे.')},{prompt:t('After talking about the café, you intentionally change to tomorrow’s meeting: “___、明日の会議は何時ですか。”','कॅफेबद्दल बोलल्यानंतर तुम्ही मुद्दाम उद्याच्या बैठकीकडे विषय बदलता: “___、明日の会議は何時ですか。”'),options:['ちなみに','ところで'],accepted:[1],explanation:t('ところで marks the intended shift to the meeting. A different context could change how connected two statements feel.','ところで बैठकीकडे विषय बदलल्याचे दर्शवते. वेगळ्या संदर्भात दोन विधानांमधील संबंध वेगळा वाटू शकतो.')}],
    use:t('Write two short Japanese sentences. First introduce a topic. Then use ちなみに for a related detail or ところで to change the topic.','जपानीत दोन छोटी वाक्ये लिहा. पहिल्यात विषय मांडा. मग संबंधित माहिती जोडण्यासाठी ちなみに किंवा विषय बदलण्यासाठी ところで वापरा.'),
    checklist:t('Check: your intention is clear; the connector matches it; you are using standalone ところで, not verb-past + ところで.','तपासा: तुमचा हेतू स्पष्ट आहे; जोडशब्द त्या हेतूशी जुळतो; तुम्ही स्वतंत्र ところで वापरत आहात, क्रियापदाचे भूतकाळी रूप + ところで नाही.'),
    sources:[{label:'Bunpro: ところで and contrast with ちなみに',url:'https://bunpro.jp/grammar_points/ところで'}]
  }];
  const text=(value,language)=>value?.[language] || null;
  const key=p=>`${p.language}:${p.id}`;
  const validOrder=(build,order)=>Array.isArray(order)&&build.orders.some(a=>a.length===order.length&&a.every((v,i)=>v===order[i]));
  const choiceCorrect=(question,answer)=>question.accepted.includes(answer);
  root.CatalystActivities={pilots,text,key,validOrder,choiceCorrect};
})(typeof window==='undefined'?globalThis:window);
