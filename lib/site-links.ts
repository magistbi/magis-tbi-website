export const officeLogo = "/magis-logo.png";

export const homeHref = "/";
export const articlesHref = "/articles";
export const eventsHref = "/events";
export const igniteGraduatesHref = "/ignite-graduates";
export const startupGraduatesSectionId = "cohorts";
export const startupGraduatesSectionHref = `${homeHref}#${startupGraduatesSectionId}`;

export const bookingUrl = "https://app.lapsula.com/book/adnu-magistbi";
export const facebookPageUrl = "https://www.facebook.com/adnu.magis.tbi";
export const linkedinPageUrl =
  "https://www.linkedin.com/company/ateneo-de-naga-university-magis-technology-business-incubator/";
export const contactEmail = "mailto:magis_tbi@gbox.adnu.edu.ph";
export const googleMapsUrl = "https://maps.app.goo.gl/oq93PHA6haDjyYer6";
export const googleMapsEmbedUrl =
  "https://www.google.com/maps?q=Ateneo+de+Naga+University,+Naga+City,+Camarines+Sur,+Philippines&output=embed";

export function getStartupHref(slug: string): string {
  return `${igniteGraduatesHref}/${encodeURIComponent(slug)}`;
}
