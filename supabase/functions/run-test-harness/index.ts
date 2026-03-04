import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// ── 10 Test Personas ──
const PERSONAS = [
  {
    name: "Amira",
    age: 7,
    filledBy: "A parent or carer",
    sharedWith: ["Class teacher", "SENCO"],
    reason: "School has raised concerns",
    mode: "full",
    email: "rich@neurodiversityglobal.com",
    profile: `Child's name: Amira
Reason for building this profile: School has raised concerns
Who this will be shared with: Class teacher, SENCO

Section 1: Environment
Parent answers:
Describe your child's classroom: Open plan, 28 children. Fluorescent lights. Amira sits in the middle of the room near the whiteboard. Noise levels are high especially during group work.
How does your child seem when they arrive home from school? Exhausted. She kicks off her shoes at the door, refuses to speak for about 45 minutes, and needs to lie on the sofa with a blanket over her head.
How do they manage transitions? Almost always difficult
Is there a particular environment where your child seems most settled? Her bedroom. Dim lighting, fairy lights, weighted blanket, soft music. She can spend hours there drawing.
Is the home environment generally predictable and calm? Generally predictable and calm

Child answers:
What does your classroom feel like? It is too bright and too loud. I cannot think when everyone is talking.
Where do you feel most calm? My room. It is dark and quiet and nobody asks me things.

Section 3: Nervous System
Parent answers:
What does a meltdown or shutdown look like for your child? She goes completely silent first. Her eyes glaze over. Then she curls into a ball on the floor and covers her ears. If anyone tries to touch her or speak to her it escalates into screaming and hitting herself on the head. It can last 30 minutes.
What are the early warning signs? She starts pulling at her sleeves, humming quietly, and avoiding eye contact. Her voice gets very quiet.
How long does it take your child to recover? At least an hour, sometimes longer. She is usually tearful and clingy afterwards.
Are there patterns to when dysregulation happens? Almost always after assembly or PE. Worse on Mondays and Fridays. Better on days when she has art in the morning.
What helps and what makes things worse? Being left completely alone in a quiet space helps. Talking, touching, asking questions, or moving her makes it much worse.
Does your child show shame after an episode? She says sorry over and over. She asks if she is bad. She has said she wishes she was not born.

Child answers:
What happens in your body when you get upset? My ears start buzzing and everything feels too close. My hands go weird.
What helps you feel calmer? Being under my blanket with nothing touching me. No talking.

Section 5: Sensory
Parent answers:
Is your child sensitive to noise? Very. Assembly is unbearable. Hand dryers in toilets, she will hold it rather than go.
Are there textures or fabrics that cause distress? Labels must be removed from everything. She can only wear certain socks. School uniform is a daily battle.
Does your child fidget or seek movement? She rocks in her chair constantly and chews her collar until it is soaked.
Does your child seem aware of internal body signals? Rarely. She does not recognise hunger until she is in tears.

Section 9: Masking
Parent answers:
Is your child significantly different at school vs home? Yes, dramatically. School sees a quiet, compliant girl. Home gets the explosion.
What happens after school? Complete collapse within 5 minutes of walking through the door. Screaming, throwing things, sometimes hitting her younger brother.
Do teachers report a different child to the one you see? Yes, constantly. They say she is fine. She is not fine.
Does your child suppress distress during the school day? She holds everything in. She told me she practices smiling in the mirror before school.

Child answers:
Do you act differently at school compared to home? Yes. At school I pretend to be happy. At home I can stop pretending.
Is school tiring even when nothing bad happens? Yes. Every single day.

Section 13: Strengths
Parent answers:
What are your child's genuine strengths? She is incredibly empathetic. She notices when other children are upset before any adult does. Her drawings are extraordinary for her age. She has a deep interest in marine biology.
What can your child focus on for a long time? Drawing. She can draw for 3 hours without stopping. Also watching nature documentaries.
What lights them up? The ocean, sea creatures, David Attenborough, drawing, and her cat.

Child answers:
What are you really good at? Drawing. And I know everything about octopuses.

Final closing statement from the parent: Amira is not a problem to be solved. She is a child who needs the adults around her to see past the silence and understand what it costs her to hold it together all day. We are asking for understanding, not special treatment.`,
  },
  {
    name: "Leo",
    age: 10,
    filledBy: "A parent or carer with the child involved",
    sharedWith: ["SENCO", "GP or paediatrician"],
    reason: "My child has recently received a diagnosis",
    mode: "mini",
    email: "rich@neurodiversityglobal.com",
    profile: `Child's name: Leo
Reason for building this profile: My child has recently received a diagnosis
Who this will be shared with: SENCO, GP or paediatrician

Section 1: Environment
Parent answers:
Describe your child's classroom: A noisy Year 5 classroom with about 32 children. Leo sits at the back near the window which helps.
How does your child seem when they arrive home from school? Wired. Cannot stop moving or talking for about an hour, then crashes hard.
Is there a particular environment where your child seems most settled? The garden. He climbs trees and digs. Anything outdoors and physical.

Section 6: Executive Function
Parent answers:
How does your child manage starting tasks? He cannot start anything unless someone sits with him. He just stares at the page. Once started he can sometimes keep going.
Does your child have a gap between knowing what to do and being able to do it? Yes, frequently. Teachers say he clearly understands but will not do the work. He is not refusing. He is stuck.
How does your child manage multi-step instructions? Forgets after the second step. Needs them written down or he panics.
Does your child's ability vary day to day? Massively. Some days he writes a page easily. Other days he cannot write his name.

Child answers:
What happens when you are given lots of instructions at once? I forget them and then I just sit there and everyone thinks I am being lazy.

Section 9: Masking
Parent answers:
Is your child significantly different at school vs home? School sees hyperactivity and disruption. Home sees anxiety, tears, and exhaustion.
What happens after school? 45 minutes of hyperactive decompression, then emotional collapse. Often ends in tears.

Section 13: Strengths
Parent answers:
What are your child's genuine strengths? Incredible spatial awareness. He can build anything. His understanding of mechanical things is beyond his years.
What lights them up? Engines, how things work, Minecraft redstone circuits, climbing.

Final closing statement from the parent: Leo has just been diagnosed with ADHD. We finally have an explanation but school has not yet changed anything. We need them to understand that his brain works differently and that willpower is not the issue.`,
  },
  {
    name: "Freya",
    age: 5,
    filledBy: "A parent or carer",
    sharedWith: ["Class teacher", "SENCO", "GP or paediatrician"],
    reason: "Something has changed and I am not sure why",
    mode: "full",
    email: "rich@neurodiversityglobal.com",
    profile: `Child's name: Freya
Reason for building this profile: Something has changed and I am not sure why
Who this will be shared with: Class teacher, SENCO, GP or paediatrician

Section 1: Environment
Parent answers:
Describe your child's classroom: Reception class, colourful and busy. About 25 children. Lots of displays and noise.
How does your child seem when they arrive home from school? She used to be fine. In the last two months she has been coming home and immediately going to her room and shutting the door. She refuses dinner most evenings.
How do they manage transitions? Sometimes difficult

Section 3: Nervous System
Parent answers:
What does a meltdown or shutdown look like for your child? She freezes. Completely still, wide eyes, does not respond to her name. It is like she has left her body. Can last 10 to 15 minutes. Afterwards she clings to me and will not let go.
What are the early warning signs? She starts whispering instead of talking. Pulls her hair behind her ears repeatedly.
Are there patterns? Only started since September when she moved to a new classroom with a new teacher.

Section 4: Trauma
Parent answers:
Has anything significant happened recently? Her grandmother, who she was very close to, passed away in August. We are not sure she fully understands but her behaviour changed dramatically after.

Section 5: Sensory
Parent answers:
Is your child sensitive to noise? She covers her ears during singing time and has started refusing to go to assembly.

Section 10: Communication
Parent answers:
Does your child need extra processing time? Yes. She takes a long time to answer questions. Teachers have mistaken this for not understanding.
Does your child take language literally? Yes. She was told to pull her socks up and tried to.

Section 13: Strengths
Parent answers:
What are your child's genuine strengths? She is incredibly gentle with animals. She has taught herself to read well beyond her age. She notices small details that everyone else misses.
What lights them up? Animals, especially cats. Books about nature. Collecting leaves and stones.

Final closing statement from the parent: Something changed in Freya and we are trying to understand what. She used to be a happy, chatty little girl. Now she barely speaks at school. We need help understanding what is happening and how to support her.`,
  },
  {
    name: "Noah",
    age: 13,
    filledBy: "A parent or carer with the child involved",
    sharedWith: ["SENCO", "Headteacher", "CAMHS"],
    reason: "Preparing for an EHCP assessment or review",
    mode: "full",
    email: "rich@neurodiversityglobal.com",
    profile: `Child's name: Noah
Reason for building this profile: Preparing for an EHCP assessment or review
Who this will be shared with: SENCO, Headteacher, CAMHS

Section 1: Environment
Parent answers:
Describe your child's classroom: Secondary school. He moves between 8 different classrooms a day. Some are loud and chaotic, some are calmer. The corridors between lessons are the worst part of his day.
How does your child seem when they arrive home from school? Completely drained. Goes straight to his room, does not come out for at least 2 hours. Refuses food until evening.

Section 3: Nervous System
Parent answers:
What does a meltdown or shutdown look like? Noah shuts down. He goes nonverbal, sits on the floor, and will not move. If pushed he becomes aggressive, has punched walls and doors. The school calls these behavioural incidents. They are not.
How long does it take to recover? The rest of the day is lost. Sometimes the next morning too.
Does your child show shame after an episode? He isolates for hours. Has written notes saying he is broken and does not deserve to be alive. We have raised this with CAMHS.

Section 6: Executive Function
Parent answers:
How does your child manage starting tasks? He cannot. He will sit in front of homework for 3 hours and write nothing. It is not that he does not understand. His brain will not start.
Does your child's ability vary day to day? Yes. Teachers have accused him of choosing when to work. He is not choosing. His brain is inconsistent and he cannot control it.

Section 9: Masking
Parent answers:
Is your child significantly different at school vs home? Yes. School sees refusal and aggression. We see anxiety, self-harm, and despair. The school is managing behaviour. We are managing a mental health crisis.
Does your child suppress distress during the school day? He holds it together until he physically cannot. Then the school punishes the moment he breaks.

Section 11: Behaviour
Parent answers:
Describe a recent incident: He was given a detention for not completing classwork. He refused to go. They escalated it to isolation. He punched a wall and was sent home.
What happened before the incident? He had been in 5 different classrooms that day, two supply teachers, his lunch was taken because he was late to the canteen.
What do you think your child was trying to communicate? I am overwhelmed and nobody is listening.

Section 13: Strengths
Parent answers:
What are your child's genuine strengths? He is incredibly articulate when calm. His knowledge of history is extraordinary. He writes poetry that makes adults cry.
What lights them up? History, particularly World War 2. Creative writing. Chess.

Child answers:
What are you really good at? Writing. History. I know more about WW2 than most of my teachers.

Final closing statement from the parent: Noah is being failed by a system that treats his distress as defiance. We are applying for an EHCP because without one, we are going to lose him. Not metaphorically. We are genuinely scared.`,
  },
  {
    name: "Zara",
    age: 8,
    filledBy: "A parent or carer",
    sharedWith: ["Class teacher", "GP or paediatrician"],
    reason: "I want school to understand my child better",
    mode: "mini",
    email: "rich@neurodiversityglobal.com",
    profile: `Child's name: Zara
Reason for building this profile: I want school to understand my child better
Who this will be shared with: Class teacher, GP or paediatrician

Section 1: Environment
Parent answers:
Describe your child's classroom: Year 3, about 30 children. Quite structured. Zara sits near the front.
How does your child seem when they arrive home from school? Quiet but generally okay. Some days she is more tired than others.

Section 5: Sensory
Parent answers:
Is your child sensitive to noise? Moderately. She does not like fire alarms and puts her hands over her ears in assembly.
Are there textures or fabrics that cause distress? Tags need removing. She will only wear one brand of socks.

Section 9: Masking
Parent answers:
Is your child significantly different at school vs home? Somewhat. School sees a quiet, well-behaved girl. At home she is louder and more emotionally volatile.
Do teachers report a different child? They say she is perfect. She is not perfect. She is performing.

Section 13: Strengths
Parent answers:
What are your child's genuine strengths? She is creative, kind, and incredibly observant. She remembers conversations from months ago word for word.
What lights them up? Drawing manga characters, learning Japanese, cats.

Final closing statement from the parent: Zara does not cause problems at school so nobody thinks she needs help. But the effort it takes her to get through each day is immense. We want school to see her, not just the performance.`,
  },
  {
    name: "Ethan",
    age: 15,
    filledBy: "A parent or carer with the child involved",
    sharedWith: ["SENCO", "Headteacher"],
    reason: "Preparing for an EHCP assessment or review",
    mode: "full",
    email: "rich@neurodiversityglobal.com",
    profile: `Child's name: Ethan
Reason for building this profile: Preparing for an EHCP assessment or review
Who this will be shared with: SENCO, Headteacher

Section 1: Environment
Parent answers:
Describe your child's classroom: Year 10. Moving between classrooms constantly. The corridors are overwhelming. He has been refusing to go to certain lessons.
How does your child seem when they arrive home from school? He has stopped going most days. When he does go, he comes home and sleeps for 3 hours.

Section 3: Nervous System
Parent answers:
What does a meltdown or shutdown look like? He just stops. Goes to his room, locks the door, and will not come out. Sometimes for a full day. He is not being difficult. He is burnt out.
How long does it take to recover? Days, sometimes a week.

Section 6: Executive Function
Parent answers:
How does your child manage starting tasks? He cannot start anything academic anymore. His attendance is below 40 percent. Not because he will not go. Because he cannot.

Section 9: Masking
Parent answers:
Is your child significantly different at school vs home? He has stopped masking because he has nothing left to mask with. The school sees a refuser. We see a child in crisis.

Section 13: Strengths
Parent answers:
What are your child's genuine strengths? Ethan is a brilliant musician. He taught himself guitar and piano. He composes his own music. When he has the energy, he is one of the funniest, most thoughtful people you could meet.

Child answers:
What are you really good at? Music. It is the only thing that makes sense to me right now.

Section 19: Demand Avoidance
Parent answers:
Does your child avoid everyday demands? Yes, significantly. Even things he wants to do. He describes it as a wall between him and the thing he needs to do.
Are choices better than direct instructions? Sometimes, but on bad days nothing works.

Final closing statement from the parent: Ethan is 15 and has missed more school than he has attended this year. He is not lazy. He is not a refuser. He is a child whose needs have been unmet for so long that his system has shut down. We are fighting for an EHCP because without intervention, he will not make it to GCSEs.`,
  },
  {
    name: "Isla",
    age: 4,
    filledBy: "A parent or carer",
    sharedWith: ["Class teacher"],
    reason: "School has raised concerns",
    mode: "mini",
    email: "rich@neurodiversityglobal.com",
    profile: `Child's name: Isla
Reason for building this profile: School has raised concerns
Who this will be shared with: Class teacher

Section 1: Environment
Parent answers:
Describe your child's classroom: Nursery. About 20 children. Bright, busy, lots of activity stations.
How does your child seem when they arrive home from school? Fine most days. Occasionally very clingy and wants to be carried.

Section 5: Sensory
Parent answers:
Is your child sensitive to noise? She does not like loud singing. Puts her hands over her ears during music time.
Does your child fidget or seek movement? She is constantly moving. Climbing everything. Cannot sit still for circle time.

Section 10: Communication
Parent answers:
Does your child need extra processing time? Yes. She takes longer than other children to respond. Staff have asked if she has hearing issues. Her hearing is fine.

Section 13: Strengths
Parent answers:
What are your child's genuine strengths? She is fearless. She will try anything physical. She has an incredible imagination and creates elaborate stories with her toys.
What lights them up? Water play, climbing, animals, pretend play with her dolls.

Final closing statement from the parent: Isla is only 4. The nursery has raised some concerns about her not sitting still and not responding quickly. We want them to understand that she is developing at her own pace and needs patience, not pressure.`,
  },
  {
    name: "Kai",
    age: 11,
    filledBy: "A parent or carer",
    sharedWith: ["SENCO", "CAMHS", "Social worker"],
    reason: "Something has changed and I am not sure why",
    mode: "full",
    email: "rich@neurodiversityglobal.com",
    profile: `Child's name: Kai
Reason for building this profile: Something has changed and I am not sure why
Who this will be shared with: SENCO, CAMHS, Social worker

Section 1: Environment
Parent answers:
Describe your child's classroom: Year 6 in a large primary school. Very exam-focused environment this year due to SATs. Kai finds the pressure suffocating.
How does your child seem when they arrive home from school? Angry. Slams doors. Refuses to talk. Has started saying he hates school and never wants to go back.

Section 3: Nervous System
Parent answers:
What does a meltdown or shutdown look like? Explosive anger. Throwing things, screaming, kicking doors. Has hurt himself by punching walls. Afterwards he sobs and says he does not know why he did it.
What are the early warning signs? Pacing, clenching fists, very short verbal responses.
How long does it take to recover? About 2 hours. He is emotionally flat for the rest of the evening.

Section 4: Trauma
Parent answers:
Has anything significant happened recently? His parents separated 6 months ago. He is moving between two houses. He says he is fine but his behaviour has changed dramatically.

Section 9: Masking
Parent answers:
Is your child significantly different at school vs home? Yes. School sees a boy who is getting into fights. We see a child who is drowning in emotions he does not know how to process.

Section 11: Behaviour
Parent answers:
Describe a recent incident: He hit another child in the playground. When asked why, he said the other boy was staring at him. The school suspended him for a day.
What happened before the incident? He had been told his SATs results were not where they needed to be. He was already dysregulated before break time.
What do you think your child was trying to communicate? I am not okay and nobody is noticing.

Section 12: Identity
Parent answers:
How does your child see themselves? He has started calling himself stupid and bad. He says he is the worst child in the class. This is new.

Section 13: Strengths
Parent answers:
What are your child's genuine strengths? Kai is naturally athletic. He is a talented footballer. He is incredibly loyal to his friends and protective of younger children. He has a great sense of humour when relaxed.

Final closing statement from the parent: Kai is going through the hardest year of his life and the school is responding with suspensions. He needs support, not punishment. We need people around him to see the pain behind the anger.`,
  },
  {
    name: "Ruby",
    age: 9,
    filledBy: "A parent or carer",
    sharedWith: ["Class teacher", "SENCO", "Family members"],
    reason: "I want school to understand my child better",
    mode: "full",
    email: "rich@neurodiversityglobal.com",
    profile: `Child's name: Ruby
Reason for building this profile: I want school to understand my child better
Who this will be shared with: Class teacher, SENCO, Family members

Section 1: Environment
Parent answers:
Describe your child's classroom: Year 4, 29 children. Quite loud. Ruby sits at a group table of 6 which she finds overwhelming.
How does your child seem when they arrive home from school? She talks nonstop for about 30 minutes, processing everything that happened. Then she goes very quiet and needs to be alone.

Section 2: People
Parent answers:
Who does your child feel safe with at school? Her current teacher, Miss Park. She speaks softly and gives Ruby choices.
Does your child have friendships? One close friend, Sophie. Other friendships are difficult. She misreads social cues and takes things very personally.

Section 5: Sensory
Parent answers:
Is your child sensitive to noise? She hears everything. She once described being in the classroom as like having 30 radios on at the same time.
Are there textures or fabrics that cause distress? Anything tight around the neck. She cuts the collars off jumpers.

Section 7: Sleep
Parent answers:
How long does it take your child to fall asleep? At least an hour. Her brain will not switch off. She says her thoughts go round and round.

Section 8: Dopamine
Parent answers:
Does your child seek stimulation or novelty? Yes. She flits between activities quickly. Gets intensely interested in something for a week, then drops it completely.

Section 9: Masking
Parent answers:
Is your child significantly different at school vs home? School sees a chatty, sociable girl. Home sees anxiety, rigidity, and meltdowns about tiny things.
Does your child suppress distress during the school day? She has told me she counts in her head to stop herself crying at school.

Section 13: Strengths
Parent answers:
What are your child's genuine strengths? Ruby is a natural performer. She lights up on stage. She has an incredible vocabulary and a sophisticated sense of humour for her age.
What can your child focus on for a long time? Acting, performing, and making up songs. She can rehearse a scene for hours.
What lights them up? Theatre, performing, musicals, making people laugh.

Section 21: Emotional Intensity
Parent answers:
Does your child experience emotions more intensely than peers? Yes. Everything is felt at maximum volume. Joy, sadness, anger, excitement, all at 100 percent.
How quickly does anger come on? Instantly. There is no build up. She goes from fine to screaming in seconds.

Final closing statement from the parent: Ruby is a bright, creative, emotionally intense child who masks brilliantly at school and then falls apart at home. We need the people around her to understand the cost of that performance and to give her permission to be herself.`,
  },
  {
    name: "Oscar",
    age: 6,
    filledBy: "A parent or carer",
    sharedWith: ["Class teacher", "SENCO"],
    reason: "School has raised concerns",
    mode: "mini",
    email: "rich@neurodiversityglobal.com",
    profile: `Child's name: Oscar
Reason for building this profile: School has raised concerns
Who this will be shared with: Class teacher, SENCO

Section 1: Environment
Parent answers:
Describe your child's classroom: Year 1. Busy. About 28 children. He has just moved from Reception where there were only 20.
How does your child seem when they arrive home from school? Meltdown almost every day since starting Year 1. In Reception he was mostly fine.

Section 3: Nervous System
Parent answers:
What does a meltdown or shutdown look like? Screaming, crying, throwing things. Usually lasts about 20 minutes. He is inconsolable during it.
What are the early warning signs? He starts saying everything is boring and stupid. Gets very rigid about small things.
Are there patterns? Always worse on days with changes to routine. Supply teachers are particularly hard.

Section 5: Sensory
Parent answers:
Is your child sensitive to noise? He covers his ears during assembly and has asked to stop going.
Does your child fidget or seek movement? He cannot sit still at all. He needs to move constantly. The school has started keeping him in at break to finish work. This makes everything worse.

Section 13: Strengths
Parent answers:
What are your child's genuine strengths? Oscar is kind, funny, and incredibly curious. He asks brilliant questions. He loves building with blocks and can focus on construction for long periods.
What lights them up? Building things, dinosaurs, water play, being outdoors.

Final closing statement from the parent: Oscar loved school last year. This year he hates it. The only thing that changed was the classroom and the expectations. He is 6. We need the adults around him to meet him where he is, not where the curriculum says he should be.`,
  },
];

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { batch = "all", email_override, persona_index } = await req.json().catch(() => ({}));

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY") || Deno.env.get("SUPABASE_PUBLISHABLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceKey);

    // Determine which personas to run
    let personas = PERSONAS;
    if (typeof persona_index === "number") {
      personas = [PERSONAS[persona_index]];
    } else if (batch === "first5") {
      personas = PERSONAS.slice(0, 5);
    } else if (batch === "last5") {
      personas = PERSONAS.slice(5);
    }

    const results: any[] = [];
    const issues: string[] = [];

    for (let i = 0; i < personas.length; i++) {
      const persona = personas[i];
      const targetEmail = email_override || persona.email;
      const startTime = Date.now();

      console.log(`\n── Testing persona ${i + 1}/${personas.length}: ${persona.name} (age ${persona.age}, ${persona.mode} mode) ──`);

      try {
        // Step 1: Generate report
        console.log(`  [${persona.name}] Generating report...`);
        const reportResponse = await fetch(`${supabaseUrl}/functions/v1/generate-profile-report`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${anonKey}`,
          },
          body: JSON.stringify({ profileText: persona.profile }),
        });

        if (!reportResponse.ok) {
          const errText = await reportResponse.text();
          issues.push(`[${persona.name}] Report generation HTTP ${reportResponse.status}: ${errText.slice(0, 200)}`);
          results.push({ name: persona.name, status: "FAILED", stage: "report_generation", error: errText.slice(0, 200) });
          continue;
        }

        const reportData = await reportResponse.json();
        if (reportData.error) {
          issues.push(`[${persona.name}] Report generation error: ${reportData.error}`);
          results.push({ name: persona.name, status: "FAILED", stage: "report_generation", error: reportData.error });
          continue;
        }

        const reportTime = Date.now() - startTime;
        console.log(`  [${persona.name}] Report generated in ${(reportTime / 1000).toFixed(1)}s`);

        // Validate report structure
        const hasStructured = !!reportData.structured;
        const sectionCount = reportData.structured?.sectionInsights?.length || 0;
        const hasWaysOfWorking = !!reportData.structured?.waysOfWorking;
        const hasConclusion = !!reportData.structured?.conclusion;
        const hasTopSummary = !!reportData.structured?.topSummary;

        if (!hasStructured) issues.push(`[${persona.name}] No structured report returned`);
        if (sectionCount === 0) issues.push(`[${persona.name}] Zero section insights`);
        if (!hasWaysOfWorking) issues.push(`[${persona.name}] Missing waysOfWorking`);
        if (!hasConclusion) issues.push(`[${persona.name}] Missing conclusion`);
        if (!hasTopSummary) issues.push(`[${persona.name}] Missing topSummary`);

        // Check for US spellings
        const fullText = JSON.stringify(reportData);
        const usSpellings = ["behavior", "recognize", "organize", "color ", "favor", "honor", "center ", "defense", "license"];
        const foundUs = usSpellings.filter(w => fullText.toLowerCase().includes(w));
        if (foundUs.length > 0) issues.push(`[${persona.name}] US spellings found: ${foundUs.join(", ")}`);

        // Check for banned words
        const bannedWords = ["broken", "damaged", "failing", "hopeless", "helpless", "victim", "suffering"];
        const foundBanned = bannedWords.filter(w => fullText.toLowerCase().includes(` ${w} `) || fullText.toLowerCase().includes(`${w}.`));
        if (foundBanned.length > 0) issues.push(`[${persona.name}] Banned words about child: ${foundBanned.join(", ")}`);

        // Step 2: Save profile to database
        console.log(`  [${persona.name}] Saving profile...`);
        const personaGlobalIndex = typeof persona_index === "number" ? persona_index : i;
        const accessCode = `TEST${String(personaGlobalIndex + 1).padStart(4, "0")}`;

        const { error: saveError } = await supabase.from("saved_profiles").insert({
          access_code: accessCode,
          profile_data: {
            reportMode: persona.mode,
            setup: {
              childName: persona.name,
              filledBy: persona.filledBy,
              sharedWith: persona.sharedWith,
              reason: persona.reason,
            },
            sections: {},
            finalStatement: persona.profile.split("Final closing statement from the parent: ")[1] || "",
          },
          stage: "report-preview",
          active_section: 0,
          report_mode: persona.mode,
          ai_report: reportData.structured ? {
            generatedAt: new Date().toISOString(),
            model: "test-harness",
            report: reportData.report,
            structured: reportData.structured,
          } : null,
        });

        if (saveError) {
          issues.push(`[${persona.name}] Save failed: ${saveError.message}`);
        } else {
          console.log(`  [${persona.name}] Saved with access code: ${accessCode}`);
        }

        // Step 3: Send email
        console.log(`  [${persona.name}] Sending email to ${targetEmail}...`);
        const emailResponse = await fetch(`${supabaseUrl}/functions/v1/email-profile-report`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${anonKey}`,
          },
          body: JSON.stringify({
            email: targetEmail,
            childName: persona.name,
            report: reportData.report,
            structured: reportData.structured,
          }),
        });

        if (!emailResponse.ok) {
          const errText = await emailResponse.text();
          issues.push(`[${persona.name}] Email HTTP ${emailResponse.status}: ${errText.slice(0, 200)}`);
        } else {
          const emailResult = await emailResponse.json();
          if (emailResult.error) {
            issues.push(`[${persona.name}] Email error: ${emailResult.error}`);
          } else {
            console.log(`  [${persona.name}] Email sent successfully`);
          }
        }

        const totalTime = Date.now() - startTime;
        results.push({
          name: persona.name,
          age: persona.age,
          mode: persona.mode,
          status: "OK",
          accessCode,
          reportTimeMs: reportTime,
          totalTimeMs: totalTime,
          sectionCount,
          hasStructured,
          hasWaysOfWorking,
          hasConclusion,
        });

        console.log(`  [${persona.name}] ✓ Complete in ${(totalTime / 1000).toFixed(1)}s`);

      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        issues.push(`[${persona.name}] Unhandled error: ${msg}`);
        results.push({ name: persona.name, status: "ERROR", error: msg });
        console.error(`  [${persona.name}] ✗ Error: ${msg}`);
      }
    }

    console.log("\n══════════════════════════════════════");
    console.log("TEST HARNESS COMPLETE");
    console.log(`Total: ${results.length} | Passed: ${results.filter(r => r.status === "OK").length} | Failed: ${results.filter(r => r.status !== "OK").length}`);
    console.log(`Issues: ${issues.length}`);
    issues.forEach((issue, i) => console.log(`  ${i + 1}. ${issue}`));
    console.log("══════════════════════════════════════\n");

    return new Response(
      JSON.stringify({ results, issues, summary: { total: results.length, passed: results.filter(r => r.status === "OK").length, failed: results.filter(r => r.status !== "OK").length } }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("Test harness failed:", msg);
    return new Response(JSON.stringify({ error: msg }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
