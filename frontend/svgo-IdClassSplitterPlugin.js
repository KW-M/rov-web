/** splits svg id into an id and class names
Based on: https://forum.affinity.serif.com/index.php?/topic/35556-custom-css-classes-and-ids-per-group-and-paths-on-svg/&do=findComment&comment=455620

Example:
```html
    <path id="thisIsAnId.className1.className2" />
        becomes:
    <path id="thisIsAnId" class="className1 className2" />
```
*/
export default { //  use module.exports = { ...stuff... }  for commonjs
    name: 'idClassSplitter',
    fn: () => {
        return {
            element: {
                enter: (node, parentNode) => {
                    /** @type {SVGElement} */
                    const item = node;
                    if (item.attributes.id) {
                        let classes = item.attributes.id.split('.');
                        if (classes.length == 0) return;
                        let id = classes.shift();

                        // replace the id
                        if (id[0] === '#') id = id.substring(1); // remove leading '#'
                        if (id && id !== '') item.attributes.id = id;
                        else delete item.attributes.id;

                        // Add the classes
                        if (classes.length == 0) return;
                        const classNames = classes.join(" ").replace("  ", " ").trim();
                        if (classNames != "") {
                            item.attributes.class = classNames;
                        }

                    }
                }
            }
        }
    }
}
