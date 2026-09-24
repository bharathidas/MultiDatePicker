/*
 * react-multi-date-picker is CJS (require("react")). Mendix leaves those
 * requires when react is external, which breaks React Client.
 *
 * Also: Rollup may import `forwardRef as t` while CJS code expects `t` to be
 * the React namespace (`t.forwardRef(...)`). That yields
 * "t.forwardRef is not a function". Rewrite those to __mxReact.forwardRef.
 */
export default args => {
    const configs = Array.isArray(args.configDefaultConfig)
        ? args.configDefaultConfig
        : [args.configDefaultConfig];

    return configs.map(config => ({
        ...config,
        plugins: [
            ...(config.plugins || []),
            {
                name: "mendix-rewrite-external-require",
                renderChunk(code) {
                    const needsRequireFix = /require\(["']react(?:-dom)?["']\)/.test(code);
                    const needsForwardRefFix = /\bt\.forwardRef\b/.test(code);

                    if (!needsRequireFix && !needsForwardRefFix) {
                        return null;
                    }

                    let rewritten = code;

                    if (code.startsWith("define(")) {
                        if (needsRequireFix) {
                            rewritten = rewritten
                                .replace(
                                    /define\((\[.*?\]),function\(([^)]*)\)\{/,
                                    (_match, deps, params) => {
                                        const names = params.split(",").map(s => s.trim());
                                        return (
                                            `define(${deps},function(${params}){` +
                                            `var __mxReact=${names[1] || "t"};` +
                                            `var __mxReactDom=${names[2] || "r"};`
                                        );
                                    }
                                )
                                .replace(/require\(["']react["']\)/g, "__mxReact")
                                .replace(/require\(["']react-dom["']\)/g, "__mxReactDom");
                        }
                        rewritten = rewritten.replace(/\bt\.forwardRef\b/g, "__mxReact.forwardRef");
                        return { code: rewritten, map: null };
                    }

                    // ESM
                    const reactImport = code.match(
                        /import\s+(\w+)\s*,?\s*(?:\{[^}]*\})?\s*from\s*["']react["']/
                    );
                    const reactDomImport = code.match(
                        /import\s+(\w+)\s*,?\s*(?:\{[^}]*\})?\s*from\s*["']react-dom["']/
                    );

                    if (reactImport && !rewritten.includes("var __mxReact=")) {
                        const importBlock = rewritten.match(/^(?:import\s+[^;]+;[\r\n]*)+/);
                        const preamble =
                            (reactImport ? `var __mxReact=${reactImport[1]};` : "") +
                            (reactDomImport ? `var __mxReactDom=${reactDomImport[1]};` : "");
                        if (importBlock) {
                            rewritten =
                                importBlock[0] + preamble + "\n" + rewritten.slice(importBlock[0].length);
                        } else {
                            rewritten = preamble + rewritten;
                        }
                    }

                    rewritten = rewritten
                        .replace(/require\(["']react["']\)/g, "__mxReact")
                        .replace(/require\(["']react-dom["']\)/g, "__mxReactDom")
                        .replace(/\bt\.forwardRef\b/g, "__mxReact.forwardRef");

                    return { code: rewritten, map: null };
                }
            }
        ]
    }));
};
