export default function interpolate(obj, vars) {
  if (typeof obj === "string") {
    return templayed(obj)(vars);
  } else if (Array.isArray(obj)) {
    return obj.map(it => interpolate(it, vars));
  } else if (typeof obj === "object") {
    const newObj = Object.assign({}, obj);
    for (var key in obj) {
      if (typeof obj[key] === "string") {
        newObj[key] = templayed(obj[key])(vars);
      } else if (Array.isArray(obj[key]))
        newObj[key] = interpolate(obj[key], vars);
      else if (typeof obj[key] === "object")
        newObj[key] = Object.keys(obj[key]).reduce((prev, key2) => {
          return {
            ...prev,
            [key2]: interpolate(obj[key][key2], vars)
          };
        }, {});
    }
    return newObj;
  }
}

export function templayed(template, s) {
  var get = function(path, i) {
      i = 1;
      path = path.replace(/\.\.\//g, function() {
        i++;
        return "";
      });
      var js = ["vars[vars.length - ", i, "]"],
        keys = path == "." ? [] : path.split("."),
        j = 0;
      for (j; j < keys.length; j++) {
        js.push("." + keys[j]);
      }
      return js.join("");
    },
    tag = function(template) {
      return template.replace(/\{\{(!|&|\{)?\s*(.*?)\s*}}+/g, function(
        match,
        operator,
        context
      ) {
        if (operator == "!") return "";
        var i = inc++;
        var v = get(context);
        v = v + "!== undefined" + "?" + v + ':"' + match + '"';
        return [
          '"; var o',
          i,
          " = ",
          v,
          ", s",
          i,
          " = typeof(o",
          i,
          ') == "function" ? o',
          i,
          ".call(vars[vars.length - 1]) : o",
          i,
          "; s",
          i,
          " = ( s",
          i,
          " || s",
          i,
          " == 0 ? s",
          i,
          ': "") + ""; s += ',
          operator
            ? "s" + i
            : '(/[&"><]/.test(s' +
              i +
              ") ? s" +
              i +
              '.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/>/g,"&gt;").replace(/</g,"&lt;") : s' +
              i +
              ")",
          ' + "'
        ].join("");
      });
    },
    block = function(template) {
      return tag(
        template.replace(/\{\{(\^|#)(.*?)}}(.*?)\{\{\/\2}}/g, function(
          match,
          operator,
          key,
          context
        ) {
          var i = inc++;
          return [
            '"; var o',
            i,
            " = ",
            get(key),
            "; ",
            (operator == "^"
              ? [
                  "if ((o",
                  i,
                  " instanceof Array) ? !o",
                  i,
                  ".length : !o",
                  i,
                  ') { s += "',
                  block(context),
                  '"; } '
                ]
              : [
                  "if (typeof(o",
                  i,
                  ') == "boolean" && o',
                  i,
                  ') { s += "',
                  block(context),
                  '"; } else if (o',
                  i,
                  ") { for (var i",
                  i,
                  " = 0; i",
                  i,
                  " < o",
                  i,
                  ".length; i",
                  i,
                  "++) { vars.push(o",
                  i,
                  "[i",
                  i,
                  ']); s += "',
                  block(context),
                  '"; vars.pop(); }}'
                ]
            ).join(""),
            '; s += "'
          ].join("");
        })
      );
    },
    inc = 0;

  return new Function(
    "vars",
    "s",
    'vars = [vars], s = "' +
      block(template.replace(/"/g, '\\"').replace(/[\n|\r\n]/g, "\\n")) +
      '"; return s;'
  );
}
