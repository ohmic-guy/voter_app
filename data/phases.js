export const timelineIntro = {
  title: '🗳️ Indian Election Process',
  subtitle: 'From announcement to result — every step explained',
  badge: 'Election Commission of India',
};

export const phases = [
  {
    id: 'phase-1',
    phaseLabel: 'PHASE 1',
    title: 'Election Announcement',
    icon: '📢',
    accent: '#FF9933',
    short: 'The ECI announces the election schedule and enforces the Model Code of Conduct.',
    detail:
      'The Election Commission of India (ECI) announces the election dates, number of phases, and activates the Model Code of Conduct (MCC). The MCC restricts ruling parties from using government resources for campaigning and ensures a level playing field.',
    steps: [
      'ECI meets and finalizes election schedule',
      'President/Governor issues writ of election',
      'Model Code of Conduct comes into effect immediately',
      'Election schedule published: notification, nomination, scrutiny, withdrawal, polling, and result dates announced',
      'Government schemes and announcements are restricted',
    ],
    legal: 'Articles 324–329 of the Indian Constitution; Representation of the People Act, 1951',
  },
  {
    id: 'phase-2', phaseLabel: 'PHASE 2', title: 'Voter Roll Revision', icon: '📋', accent: '#0047AB',
    short: 'Electoral rolls are updated and voters can check or add their names before elections.',
    detail: 'Before every election, the ECI publishes draft electoral rolls and allows citizens to add, modify, or delete entries. The final voter list (electoral roll) determines who is eligible to vote in each constituency.',
    steps: [
      'ECI publishes draft electoral rolls online and at booths','Citizens file Form 6 (new registration), Form 7 (deletion), or Form 8 (correction)','Booth Level Officers (BLOs) verify applications door-to-door','Final electoral roll published before election notification','Voters receive updated Voter ID card (EPIC) if newly registered',
    ],
    legal: 'Registration of Electors Rules, 1960; Section 23, Representation of the People Act, 1950',
  },
  {
    id: 'phase-3', phaseLabel: 'PHASE 3', title: 'Nomination of Candidates', icon: '📝', accent: '#9B59B6',
    short: 'Candidates file their nomination papers, affidavits, and pay security deposits.',
    detail: 'Any Indian citizen meeting the eligibility criteria can file a nomination to contest. Candidates must submit nomination papers, a self-declaration affidavit disclosing criminal, financial, and educational details, and a security deposit to the Returning Officer.',
    steps: [
      'Candidate obtains nomination form from Returning Officer','Files affidavit disclosing assets, liabilities, criminal cases','Pays security deposit: ₹25,000 for Lok Sabha / State Assembly (General); ₹12,500 for SC/ST candidates','Nomination papers scrutinized by Returning Officer','Candidate can withdraw nomination within deadline','Final list of contesting candidates published',
    ],
    legal: 'Sections 33–38, Representation of the People Act, 1951',
  },
  {
    id: 'phase-4', phaseLabel: 'PHASE 4', title: 'Election Campaign', icon: '📣', accent: '#F39C12',
    short: "Candidates and parties campaign across constituencies, subject to ECI's Model Code of Conduct.",
    detail: 'The campaign period runs from nomination withdrawal deadline to 48 hours before polling (silence period). Parties hold rallies, door-to-door canvassing, and media campaigns. The MCC prohibits use of religion/caste for votes, bribery, and misuse of government machinery.',
    steps: [
      'Parties launch manifestos and campaign strategies','Star campaigners (national leaders) travel across constituencies','ECI monitors spending: limit is ₹95 lakh (Lok Sabha), ₹40 lakh (State Assembly) per candidate','Paid political ads must display disclaimer "Published by..."','Campaign silence period begins 48 hours before polling','Exit polls banned until last phase of voting concludes',
    ],
    legal: 'Model Code of Conduct; Section 126, 126A, Representation of the People Act, 1951',
  },
  {
    id: 'phase-5', phaseLabel: 'PHASE 5', title: 'Polling Day', icon: '🗳️', accent: '#138808',
    short: 'Voters cast their votes using Electronic Voting Machines (EVMs) at their designated polling booths.',
    detail: 'On polling day, voters visit their assigned booth, verify their identity using Voter ID or approved documents, and cast their vote on an EVM. VVPAT (Voter Verified Paper Audit Trail) machines print a slip showing the voter\'s choice for 7 seconds. Voters can also choose NOTA (None of the Above).',
    steps: [
      'Polling stations open at 7:00 AM, close at 6:00 PM','Voter shows EPIC card or any of 12 approved photo ID documents','Voter\'s finger marked with indelible ink','Voter presses button on EVM against chosen candidate/party symbol','VVPAT prints and displays ballot slip for 7 seconds','EVM records vote; VVPAT slip drops into sealed compartment','Voter can press NOTA if they reject all candidates',
    ],
    legal: 'Section 62, Representation of the People Act, 1951; Conduct of Elections Rules, 1961',
  },
  {
    id: 'phase-6', phaseLabel: 'PHASE 6', title: 'Vote Counting & Results', icon: '📊', accent: '#E74C3C',
    short: 'EVMs are opened and votes counted at counting centers under ECI supervision.',
    detail: 'On counting day, EVMs from all booths are brought to designated counting centers. Votes are counted round by round, constituency by constituency. The candidate with the most votes (First Past the Post system) wins. Results are declared by Returning Officers.',
    steps: ['Counting begins at 8:00 AM on counting day','Postal ballots counted first','EVM results tallied round by round for each Assembly segment','Candidates/agents can observe each round of counting','VVPAT slips from 5 randomly selected booths per constituency verified against EVM count','Returning Officer declares result and issues Form 20','Winner receives certificate of election'],
    legal: 'Section 64–66, Representation of the People Act, 1951; Rule 59–63, Conduct of Elections Rules, 1961',
  },
  {
    id: 'phase-7', phaseLabel: 'PHASE 7', title: 'Government Formation', icon: '🏛️', accent: '#3498DB',
    short: 'The winning party or coalition forms the government and the new legislature takes oath.',
    detail: 'After results, the party or coalition with majority seats (272+ in Lok Sabha) is invited by the President to form the government. The leader is sworn in as Prime Minister. If no party has a clear majority, a hung parliament results and coalition negotiations begin.',
    steps: ['ECI notifies President/Governor of final results','Party with majority invited to form government','In hung parliament: parties negotiate coalition/alliances','President swears in Prime Minister and Council of Ministers','New Lok Sabha/Assembly session called','Speaker of the House elected by members','President\'s Address (policy speech) delivered'],
    legal: 'Articles 74, 75, 164 of the Indian Constitution',
  },
];
