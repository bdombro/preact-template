/**
 * Converts a limited markdown subset to JSX
 * 
 * Is MUCH smaller than any lib out there
 */
export const md = {
	toJsx = (mdStr: string) => {
		let str = mdStr
			.replace(/^### (.*$)/gim, '<h3>$1</h3>')
			.replace(/^## (.*$)/gim, '<h2>$1</h2>')
			.replace(/^# (.*$)/gim, '<h1>$1</h1>')
			.replace(/^\> (.*$)/gim, '<blockquote>$1</blockquote>')
			.replace(/\*\*(.*)\*\*/gim, '<b>$1</b>')
			.replace(/\*(.*)\*/gim, '<i>$1</i>')
			.replace(/!\[(.*?)\]\((.*?)\)/gim, "<img alt='$1' src='$2' />")
			.replace(/\[(.*?)\]\((.*?)\)/gim, "<a href='$2'>$1</a>")
			.replace(/\n$/gim, '<br />')

		const trashgc: string[] = []

	    // Handle code blocks
	    while ((stra = /\s\`\`\`\n?([^`]+)\`\`\`/g.exec(str)) !== null) {
	      str = str.replace(stra[0], '<code>\n' + md.htmlEncode(stra[1]).replace(/\n/gm, '<br/>').replace(/\ /gm, '&nbsp;') + '</code>\n');
	    }

	    // Handle emails
	    while ((stra = /\s\`\`\`\n?([^`]+)\`\`\`/g.exec(str)) !== null) {
	      str = str.replace(stra[0], '<a href="mailto:' + stra[1] + '">' + stra[1] + '</a>');
	    }

	    while ((stra = /\[([^\]]+)\]\[([^\]]+)\]/g.exec(str)) !== null) {
	      helper1 = new RegExp('\\[' + stra[2] + '\\]: ?([^ \n]+)', "gi");
	      if ((helper = helper1.exec(str)) !== null) {
	        str = str.replace(stra[0], '<a href="' + helper[1] + '">' + stra[1] + '</a>');
	        trashgc.push(helper[0]);
	      }
	    }

	    /* horizontal line */
	    while ((stra = /^(?:([\*\-_] ?)+)\1\1$/gm.exec(str)) !== null) {
	      str = str.replace(stra[0], '<hr/>');
	    }

	    // Trash collect
	    for (i = 0; i < trashgc.length; i++) {
	      str = str.replace(trashgc[i], '');
	    }

		return str.trim()
	},

	htmlEncode: (str: string) => {
	    'use strict';
	    var div = document.createElement('div');
	    div.appendChild(document.createTextNode(str));
	    str = div.innerHTML;
	    div = undefined;
	    return str;
	}
}