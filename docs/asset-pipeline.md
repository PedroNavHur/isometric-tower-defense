# Asset pipeline

## Runtime policy

Game-ready 3D assets belong under `public/models` and must use `.glb`. This prototype uses the GLBs included with Kenney's Hexagon Kit directly. The complete 1.8 MB GLB set and its required shared texture are committed so terrain and structure variants can be swapped during prototyping.

Editable source formats such as `.blend`, `.fbx`, `.obj`, and `.gltf` should remain outside public runtime directories. Keep source art separately from the optimized runtime set.

## Coordinate convention

```text
Y = up
X/Z = board plane
Forward = -Z
Piece origin = bottom center
Transforms = applied before export
Runtime format = GLB
```

Scene wrapper components may normalize a third-party model's scale, rotation, or ground offset without changing logical game coordinates.

## Kenney workflow

1. Download the official archive to a temporary location.
2. Verify the included license and pack version.
3. Inspect the provided previews and GLB files.
4. Copy the browser-ready GLB set into the runtime directory.
5. Preserve any relative shared textures required by those GLBs.
6. Record the pack and active model categories in `docs/assets.md`.
7. Test network loading, scale, orientation, materials, and shadows in the application.
8. Do not commit the archive, previews, FBX, or OBJ variants.

## Future Blender workflow

1. Import the source model into Blender.
2. Repair materials and textures.
3. Confirm orientation and origin.
4. Apply rotation and scale.
5. Inspect polygon count.
6. Export glTF 2.0 binary `.glb` with only required content.
7. Verify visual correctness in the application before optimizing.

`gltfjsx` may be considered for larger final models but is intentionally not installed or run for this prototype.
