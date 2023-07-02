type InputDataPagination = {
  query: any;
  data: any[];
  lastKey?: any;
  count: number;
  limit: number;
  timesQueried: number;
  keys?: string[];
};

export type OutputDataPagination = {
  data: any[];
  lastKey?: any;
  count: number;
  limit: number;
  timesQueried: number;
};

export const queryPagination = async (
  params: InputDataPagination
): Promise<OutputDataPagination> => {
  if (params.lastKey) {
    params.query.startAt(params.lastKey);
  }
  if (params.limit) {
    params.query.limit(params.limit);
  }

  const data = await params.query.exec();
  if (data.lastKey) {
    params.keys = Object.keys(data.lastKey);
  }

  if (data.count > 0) {
    params.data = [...params.data, ...data.toJSON()];
  }

  if (data.lastKey && params.data.length < params.limit) {
    params.lastKey = data.lastKey;
    params.timesQueried++;
    return await queryPagination(params);
  } else if (!data.lastKey && params.data.length > params.limit) {
    data.lastKey = params.data[params.data.length - 1];
  }

  params.data = params.data.slice(0, params.limit);
  params.count = params.data.length;

  if (data.lastKey) {
    params.lastKey = {};
    params.lastKey = Object.assign(
      params.lastKey,
      params.keys?.reduce((result, key) => {
        if (params.data[params.data.length - 1][key]) {
          result[key] = params.data[params.data.length - 1][key];
        }
        return result;
      }, {})
    );
  } else {
    delete params.lastKey;
  }

  return {
    count: params.count,
    lastKey: params.lastKey,
    timesQueried: params.timesQueried,
    limit: params.limit,
    data: params.data,
  } as OutputDataPagination;
};
