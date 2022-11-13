from audioop import reverse
import os
import json
from jinja2 import Environment, FileSystemLoader, PackageLoader, select_autoescape
from pytz import common_timezones

TARGET_DIR = ".."

# load templates
env = Environment(
    loader=FileSystemLoader('./templates'),
    autoescape=select_autoescape()
)

# index
index_context = None
with open('jsons/other/blog.json') as f:
    index_context = json.load(f)
    index_context["pages"] = []

# common
common_context = None
with open('jsons/other/common.json') as f:
    common_context = json.load(f)

assert index_context and common_context

# contact
contact_context = None
with open('jsons/other/contact.json') as f:
    contact_context = json.load(f)
    contact_context["subname_left"] = common_context['address']

# blog entry pages
for page in os.listdir(index_context["pages_source_dir"]):
    print(page)

    page_context = None
    with open(index_context["pages_source_dir"] + page) as f:
        page_context = json.load(f)

    assert page_context

    page_template = env.get_template(page_context["template"])

    target_filename = index_context["pages_target_dir"] + page_context["targetfile"]

    index_context["pages"].append(page_context)

    page_rendered = page_template.render(context={**common_context, **page_context}, target=target_filename)

    with open(target_filename, "w") as f:
        f.write(page_rendered)

# index
index_template = env.get_template("blog.html")

index_context["pages"].sort(key=lambda x: x.get("date", 9) + x.get("time", "9"), reverse=True)

index_rendered = index_template.render(context={**common_context, **index_context})

target_filename = "../blog/blog.html"

with open(target_filename, "w") as f:
    f.write(index_rendered)

# contact
contact_template = env.get_template("contact.html")

contact_rendered = contact_template.render(context={**common_context, **contact_context})

target_filename = "../blog/contact.html"

with open(target_filename, "w") as f:
    f.write(contact_rendered)