#![deny(clippy::all)]

#[macro_use]
extern crate napi_derive;

use blob_uuid::to_blob;
use napi::{CallContext, Env, JsNumber, JsObject, JsString, Result};
use rs_uuid::iso::uuid_v4;
use rs_uuid::{uuid16, uuid32, uuid8};
use std::convert::TryInto;
use uuid::v1::{Context, Timestamp};
use uuid::Uuid;

#[cfg(all(
    unix,
    not(target_env = "musl"),
    not(target_arch = "aarch64"),
    not(target_arch = "arm"),
    not(debug_assertions)
))]
#[global_allocator]
static ALLOC: jemallocator::Jemalloc = jemallocator::Jemalloc;

#[cfg(all(windows, target_arch = "x86_64"))]
#[global_allocator]
static ALLOC: mimalloc::MiMalloc = mimalloc::MiMalloc;

#[js_function(0)]
fn v4(ctx: CallContext) -> Result<JsString> {
    let uuid = uuid_v4();

    ctx.env.create_string(uuid.as_str())
}

#[js_function(2)]
fn v3(ctx: CallContext) -> Result<JsString> {
    let namespace = ctx.get::<JsString>(0)?.into_utf8()?;
    let name = ctx.get::<JsString>(1)?.into_utf8()?;
    let namespace_name = namespace.as_str()?;
    let uuid;

    if namespace_name == "url" {
        uuid = Uuid::new_v3(&Uuid::NAMESPACE_URL, name.as_str()?.as_bytes())
    } else if namespace_name == "oid" {
        uuid = Uuid::new_v3(&Uuid::NAMESPACE_OID, name.as_str()?.as_bytes())
    } else if namespace_name == "dns" {
        uuid = Uuid::new_v3(&Uuid::NAMESPACE_DNS, name.as_str()?.as_bytes())
    } else if namespace_name == "x500" {
        uuid = Uuid::new_v3(&Uuid::NAMESPACE_X500, name.as_str()?.as_bytes())
    } else {
        let parsed = Uuid::parse_str(namespace_name).expect("Invalid UUID.");

        uuid = Uuid::new_v5(&parsed, name.as_str()?.as_bytes());
    }

    ctx.env.create_string(uuid.to_string().as_str())
}

#[js_function(1)]
fn v1(ctx: CallContext) -> Result<JsString> {
    let date: u32 = ctx.get::<JsNumber>(0)?.try_into()?;
    let context = Context::new(42);
    let timestamp = Timestamp::from_unix(&context, date.into(), 1234);
    let uuid = Uuid::new_v1(timestamp, &[1, 2, 3, 4, 5, 6]).expect("Could not generate v1 uuid.");

    ctx.env.create_string(uuid.to_string().as_str())
}

#[js_function(2)]
fn v5(ctx: CallContext) -> Result<JsString> {
    let namespace = ctx.get::<JsString>(0)?.into_utf8()?;
    let name = ctx.get::<JsString>(1)?.into_utf8()?;
    let namespace_name = namespace.as_str()?;
    let uuid;

    if namespace_name == "url" {
        uuid = Uuid::new_v5(&Uuid::NAMESPACE_URL, name.as_str()?.as_bytes())
    } else if namespace_name == "oid" {
        uuid = Uuid::new_v5(&Uuid::NAMESPACE_OID, name.as_str()?.as_bytes())
    } else if namespace_name == "dns" {
        uuid = Uuid::new_v5(&Uuid::NAMESPACE_DNS, name.as_str()?.as_bytes())
    } else if namespace_name == "x500" {
        uuid = Uuid::new_v5(&Uuid::NAMESPACE_X500, name.as_str()?.as_bytes())
    } else {
        let parsed = Uuid::parse_str(namespace_name).expect("Invalid UUID.");

        uuid = Uuid::new_v5(&parsed, name.as_str()?.as_bytes());
    }

    ctx.env.create_string(uuid.to_string().as_str())
}

#[js_function(1)]
fn parse(ctx: CallContext) -> Result<JsObject> {
    let uuid = ctx.get::<JsString>(0)?.into_utf8()?;
    let parsed = Uuid::parse_str(uuid.as_str()?).expect("Invalid UUID.");
    let mut obj = ctx.env.create_object()?;
    let timestamp = parsed.to_timestamp();

    if timestamp == None {
        obj.set_named_property("timestamp", ctx.env.get_null()?)?;
    } else {
        obj.set_named_property(
            "timestamp",
            ctx.env
                .create_int64(timestamp.unwrap().to_unix().0.try_into().unwrap())?,
        )?;
    }

    obj.set_named_property("isNil", ctx.env.get_boolean(Uuid::is_nil(&parsed))?)?;
    obj.set_named_property(
        "version",
        ctx.env
            .create_string(Uuid::get_version_num(&parsed).to_string().as_str())?,
    )?;

    Ok(obj)
}

#[js_function(1)]
fn blob(ctx: CallContext) -> Result<JsString> {
    let uuid = ctx.get::<JsString>(0)?.into_utf8()?;
    let parsed = Uuid::parse_str(uuid.as_str()?).expect("Invalid UUID.");
    let converted = to_blob(&parsed);

    ctx.env.create_string(converted.to_string().as_str())
}

#[js_function(0)]
fn gen_8b(ctx: CallContext) -> Result<JsString> {
    let uuid = uuid8();

    ctx.env.create_string(uuid.as_str())
}

#[js_function(0)]
fn gen_16b(ctx: CallContext) -> Result<JsString> {
    let uuid = uuid16();

    ctx.env.create_string(uuid.as_str())
}

#[js_function(0)]
fn gen_32b(ctx: CallContext) -> Result<JsString> {
    let uuid = uuid32();

    ctx.env.create_string(uuid.as_str())
}

#[module_exports]
fn init(mut exports: JsObject, env: Env) -> Result<()> {
    exports.create_named_method("v4", v4)?;
    exports.create_named_method("v3", v3)?;
    exports.create_named_method("v1", v1)?;
    exports.create_named_method("v5", v5)?;
    exports.create_named_method("parse", parse)?;
    exports.create_named_method("blob", blob)?;
    exports.create_named_method("gen8b", gen_8b)?;
    exports.create_named_method("gen16b", gen_16b)?;
    exports.create_named_method("gen32b", gen_32b)?;
    exports.set_named_property("NIL", env.create_string(Uuid::nil().to_string().as_str())?)?;

    Ok(())
}
