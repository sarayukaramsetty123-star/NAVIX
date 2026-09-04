import { Node } from '../models/Node.js';
import { Path } from '../models/Path.js';
import { isDatabaseConnected } from '../config/database.js';
import { httpError } from '../utils/asyncHandler.js';

function requireDb() { if (!isDatabaseConnected()) throw httpError(503, 'MongoDB is required for map administration'); }

export async function listNodes(req, res, next) { try { requireDb(); res.json({ success: true, data: await Node.find().lean() }); } catch (error) { next(error); } }
export async function createNode(req, res, next) { try { requireDb(); if (!req.body.name || !req.body.type) throw httpError(400, 'Node name and type are required'); res.status(201).json({ success: true, data: await Node.create({ ...req.body, _id: req.body.id }) }); } catch (error) { next(error); } }
export async function listPaths(req, res, next) { try { requireDb(); res.json({ success: true, data: await Path.find().lean() }); } catch (error) { next(error); } }
export async function createPath(req, res, next) { try { requireDb(); const { from, to, distance } = req.body; if (!from || !to || distance == null) throw httpError(400, 'from, to, and distance are required'); res.status(201).json({ success: true, data: await Path.create(req.body) }); } catch (error) { next(error); } }
