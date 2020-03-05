import { TemplateVars } from '../types';

export default ({ path, change, percent, bytes, changed, unchanged }: TemplateVars): string => `
## 📦 \`${path}\`

**Size Change:** ${change} (${percent})
**Total Size:** ${bytes}

| Filename           | Size       | Change                      |
| ------------------ | ---------- | --------------------------- |
${changed.map(f => `| \`${f.path}\`      | ${f.bytes} | ${f.change} (${f.percent}) |`).join('\n')}

<details>
  <summary>${unchanged.length ? '<strong>View Unchanged</strong>' : '<em>There are no unchanged files</em>'}</summary>

  | Filename           | Size       | Change                      |
  | ------------------ | ---------- | --------------------------- |
  ${unchanged.map(f => `| \`${f.path}\`      | ${f.bytes} | ${f.change} (${f.percent}) |`).join('\n  ')}

</details>`;
