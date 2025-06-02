
export const getBlogExcerpt = (index: number): string | undefined => {
  switch (index) {
    case 0:
      return "What are AI Agents? How hard would they be for us to implement? Will they take my job? All common questions answered in the following definitive A Layman's Guide to AI Agents";
    case 1:
      return "The AI that was was considered science fiction in the 2013 film \"Her\", has now become our reality. Learn how has the state-of-the-art in AI engineering has made this possible.";
    case 2:
      return "Powered_by's research estimates that AI agents represent the next $1 Trillion market opportunity. All businesses stand to benefit from this tidal shift in computing. See why in this article.";
    case 3:
      return "The sales and customer support functions of any SaaS company are deeply human-intensive. In this article, we detail how SaaS organizations can reduce the human labor strain on their sales & support functions while upholding the highest standard of quality and customer centricity.";
    case 4:
      return "Conversational AI agents sound and behave in a staggeringly human-like manner. Whether its an AI voice agent that answers your support calls, or an AI email agent that automates customer inquiries, we offer insights into the most practical areas where they can be implemented.";
    case 5:
      return "While AI agents can offer a multitude of benefits to your SMB, they can also generate concerns. In this article, we outline the common fears our customers express about adopting AI agents and how they overcame them.";
    case 6:
      return "AI agents can supercharge your small business, but should you buy a ready-made tool or build your own? This guide weighs the pros and cons to help your SMB make an informed, cost conscious decision.";
    case 7:
      return "If you are already using ChatGPT and other products from OpenAI, why would you need a specialized partner like Powered_by? In this report, we explain why SMBs chose to partner with us to develop and implement their AI agent visions.";
    case 8:
      return "What's the difference between AI agents and Robotic Process Automation (RPA)? In this guide, we provide insights on the history of RPA and how new innovations in AI agent automation is upending the game in workflow automation.";
    case 9:
      return "For SMBs, evaluating any new technology investment can be daunting. How do you build a business case for implementing AI agents? How do you justify the spend? How will it positively impact our business quickly? To help, we present: The Business Case for AI Agents.";
    case 10:
      return "From SaaS to Agentic AI: A bigger wave is cresting in the enterprise software game.";
    default:
      return undefined;
  }
};
