import getCommentMarker from '../commentMarker';
import { FooterVars } from '../types';

const marker = getCommentMarker();

export default ({ affectedPackages, totalChange }: FooterVars) => `
**Total affected packages:** ${affectedPackages}
**Total change:** ${totalChange}
${marker}
`;
