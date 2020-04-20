package expenses.server.rest.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class PredictionCreateDTO {

	private final Long value;

	private final Long monthId;

	private final CategoryDTO mainCategory;

}
