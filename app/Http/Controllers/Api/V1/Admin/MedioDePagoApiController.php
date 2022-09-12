<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreMedioDePagoRequest;
use App\Http\Requests\UpdateMedioDePagoRequest;
use App\Http\Resources\Admin\MedioDePagoResource;
use App\Models\MedioDePago;
use Gate;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class MedioDePagoApiController extends Controller
{
    public function index()
    {
        abort_if(Gate::denies('user_management_access'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        return new MedioDePagoResource(MedioDePago::all());
    }

    public function store(StoreMedioDePagoRequest $request)
    {
        $medioDePago = MedioDePago::create($request->validated());

        return (new MedioDePagoResource($medioDePago))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }

    public function create()
    {
        abort_if(Gate::denies('user_management_access'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        return response([
            'meta' => [

            ],
        ]);
    }

    public function show(MedioDePago $medioDePago)
    {
        abort_if(Gate::denies('user_management_access'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        return new MedioDePagoResource($medioDePago);
    }

    public function update(UpdateMedioDePagoRequest $request, MedioDePago $medioDePago)
    {
        $medioDePago->update($request->validated());

        return (new MedioDePagoResource($medioDePago))
            ->response()
            ->setStatusCode(Response::HTTP_ACCEPTED);
    }

    public function edit(MedioDePago $medioDePago)
    {
        abort_if(Gate::denies('user_management_access'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        return response([
            'data' => new MedioDePagoResource($medioDePago),
            'meta' => [

            ],
        ]);
    }

    public function destroy(MedioDePago $medioDePago)
    {
        abort_if(Gate::denies('user_management_access'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        $medioDePago->delete();

        return response(null, Response::HTTP_NO_CONTENT);
    }
}
